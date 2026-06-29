---
permalink: /hld/ChatSystem/
layout: default
title: "Design WhatsApp / iMessage - Chat System Design Interview"
description: "System design for a real-time messaging platform like WhatsApp or iMessage - WebSockets, message delivery, read receipts, group chat, and offline handling"
---

# Designing a Chat System Like WhatsApp / iMessage

⚡ **Difficulty:** Intermediate
📋 **Prerequisites:** [Fundamentals](/concepts) - especially [Message Queues](/concepts#message-queues), [Caching](/concepts#caching), and [Real-Time Communication](/concepts#real-time-communication-websocket-vs-sse-vs-polling)

---

## TL;DR

A chat system delivers messages in real-time using WebSockets for online users and stores-then-forwards for offline users.

```mermaid
flowchart LR
    SENDER["Sender"]:::client
    WS["WebSocket Servers"]:::service
    CHAT["Chat Service"]:::service
    STORE[("Message Store<br/>Cassandra")]:::data
    K["Kafka<br/>fan-out"]:::async
    PUSH["Push Notifications<br/>FCM APNs"]:::external
    RECEIVER["Receiver"]:::client

    SENDER --> WS
    WS --> CHAT
    CHAT --> STORE
    CHAT --> K
    K --> WS
    CHAT --> PUSH
    WS --> RECEIVER

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef async fill:#AB47BC,stroke:#4A148C,color:#fff
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
    classDef external fill:#4a1942,stroke:#f472b6,color:#e2e8f0
```

**In 3 sentences:** Clients maintain a persistent WebSocket connection to the server. When a message is sent, the server persists it, looks up which server the receiver is connected to, and pushes it down their WebSocket. If the receiver is offline, the message waits in a queue and a push notification is sent.

---

## Understanding the Problem

💬 **What is a chat system?** A real-time messaging platform that lets users send text, images, and files to individuals or groups. Messages must be delivered reliably (even if the recipient is offline), ordered correctly, and displayed in real-time. Think WhatsApp, Telegram, Facebook Messenger, or Slack. The hard parts: guaranteed delivery across flaky mobile networks, real-time push without polling, group fan-out at scale, and end-to-end encryption.

## Naive First Cut

```mermaid
flowchart LR
    SENDER["Sender"]:::client
    API["Chat API"]:::service
    DB[("Messages DB<br/>one table")]:::data
    RECEIVER["Receiver<br/>polls every 5s"]:::client

    SENDER --> API
    API --> DB
    RECEIVER --> API

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

Sender POSTs message to an API, stored in a DB. Receiver polls the API every 5 seconds for new messages.

Why this breaks:
- **Polling is wasteful** - 500M users polling every 5s = 100M QPS of mostly-empty responses. Massive cost, terrible latency.
- **5-second delay feels laggy** - real-time chat needs sub-second delivery.
- **Single DB for all messages** - billions of messages/day, one table collapses.
- **No offline handling** - if receiver is offline when message arrives, when do they get it?
- **No ordering guarantee** - if two messages arrive out of order at the DB, display is wrong.
- **Group messages multiply the problem** - 256-member group = 256 deliveries per message.

## Prior Art

- **[WhatsApp Architecture (InfoQ)](https://highscalability.com/whatsapp-architecture/)** - Erlang-based, 2M connections per server, XMPP-derived protocol, store-and-forward for offline delivery.
- **[Facebook Messenger Iris](https://engineering.fb.com/2014/10/09/production-engineering/building-mobile-first-infrastructure-for-messenger/)** - ordered log storage (like Kafka) per conversation. Messages appended to a per-user ordered log. Clients sync via sequence numbers.
- **[Discord How Messages Are Stored](https://discord.com/blog/how-discord-stores-billions-of-messages)** - migrated from MongoDB to Cassandra to ScyllaDB. Partition per channel + bucket.
- **[Signal Protocol](https://signal.org/docs/)** - end-to-end encryption with double-ratchet. Pre-keys for offline delivery. The gold standard for E2E chat encryption.
- **[Slack Real-Time Messaging](https://slack.engineering/flannel-an-application-level-edge-cache-to-make-slack-scale/)** - WebSocket connections for real-time, application-level edge cache (Flannel) for fast channel hydration.

## Technology Choices

| Tier | Purpose | Primary pick | Alternatives |
|---|---|---|---|
| Real-time transport | Push messages to online clients | WebSocket (long-lived) | SSE, MQTT (IoT/mobile-optimized), gRPC streaming |
| Connection management | Track who's online on which server | Redis Pub/Sub + connection registry | Kafka, custom session store |
| Message storage | Durable, ordered message log | Cassandra (partition per conversation) | ScyllaDB, DynamoDB, TiDB |
| Message queue | Decouple sender from fan-out | Kafka (per-user topic or partition) | SQS, RabbitMQ, Pulsar |
| Offline delivery | Store messages until recipient connects | Redis sorted set per user | SQS per user, Cassandra unread table |
| Presence | Who's online | Redis with TTL per user | Dedicated presence service |
| Media storage | Images, files, voice notes | S3 / GCS with CDN | MinIO, Azure Blob |
| Push notifications | Offline users | FCM + APNs | OneSignal, SNS |
| E2E encryption | Message privacy | Signal Protocol (Double Ratchet) | Custom, Noise Protocol |

## Functional Requirements

**Core:**
1. Users can send messages (text) to another user in real-time (1:1 chat).
2. Users can create groups and send messages to all group members.
3. Messages are delivered reliably even if the recipient is offline (store-and-forward).

**Below the line:**
- Read receipts, typing indicators
- Media messages (images, video, voice)
- End-to-end encryption
- Message search, reactions, threads
- Voice/video calling

## Non-Functional Requirements

**Core:**
- **Real-time delivery** - P99 < 500ms for online-to-online message delivery.
- **Reliability** - zero message loss. Once the server acks, the message WILL be delivered eventually.
- **Ordering** - messages within a conversation appear in send order.
- **Scale** - 500M DAU, 100B messages/day (WhatsApp scale).

**Below the line:**
- Sub-100ms delivery latency
- Exactly-once delivery (at-least-once + client-side dedupe is acceptable)
- Multi-device sync (web + mobile + desktop)

## Scale Estimation (Back-of-Envelope)

- **Users:** 500M DAU, 50M concurrent connections at peak
- **Write QPS:** 100K messages/sec sustained, 10B messages/day
- **Read QPS:** 200K message fetches/sec (history sync + offline drain)
- **Storage:** ~5TB message storage/year (compressed, Cassandra)
- **Bandwidth:** ~500 Gbps aggregate WebSocket traffic at peak

## Core Entities

- **User** - identified by phone number or userId. Has online/offline status.
- **Conversation** - a 1:1 or group thread. Has a unique `conversationId` and list of participants.
- **Message** - text content with `messageId`, `senderId`, `conversationId`, `timestamp`, `status` (sent/delivered/read).
- **Connection** - a live WebSocket session mapping `userId → serverId:connectionId`.

## API / System Interface

```
WebSocket: wss://chat.example.com/ws
  → Client authenticates on connect (JWT)
  → Bidirectional: send messages, receive messages, typing, presence

REST (fallback + media):
POST /v1/messages         → send a message (fallback if WS down)
GET  /v1/conversations/:id/messages?after=<seqNo>  → sync history
POST /v1/media/upload     → upload image/file, get a mediaUrl
POST /v1/groups           → create group
```

**Wire format (over WebSocket):**
```json
{"type": "message", "to": "conv_123", "text": "hello", "clientMsgId": "uuid"}
{"type": "ack", "messageId": "msg_456", "status": "delivered"}
{"type": "typing", "conversationId": "conv_123", "userId": "u_789"}
```

Security: WebSocket authenticated via JWT on handshake. `clientMsgId` is for client-side dedupe (idempotency). Server generates the authoritative `messageId` and `timestamp`.

## High-Level Design

### 1) User sends a 1:1 message (both online)

**New components we need:**

1. **WebSocket Servers** - maintain persistent two-way connections with every online user.<br>💡 *WebSocket = a persistent connection that stays open so the server can push messages instantly without the client asking. Unlike HTTP (ask → answer → done), WebSocket keeps the line open. [Learn more →](/concepts#real-time-communication-websocket-vs-sse-vs-polling)*
2. **Chat Service** - the brain. Receives messages, persists them, and figures out where the recipient is connected.
3. **Message Store (Cassandra)** - permanent storage for all messages. Partitioned by conversation so "load chat history" is a single partition read.<br>💡 *Cassandra is a distributed wide-column database designed for heavy writes. Partitioning by conversation_id means loading a chat history is a single-partition read - O(1) regardless of total messages in the system.*
4. **Connection Registry (Redis)** - a fast lookup table mapping `userId → which WebSocket server they're on`. When a message arrives for Bob, we check Redis to find which server is holding Bob's connection.

```mermaid
flowchart LR
    SENDER["Sender"]:::client
    WS1["WebSocket Server A"]:::service
    CHAT["Chat Service"]:::service
    STORE[("Message Store<br/>Cassandra")]:::data
    ROUTE["Connection Registry<br/>Redis"]:::data
    WS2["WebSocket Server B"]:::service
    RECEIVER["Receiver"]:::client

    SENDER --> WS1
    WS1 --> CHAT
    CHAT --> STORE
    CHAT --> ROUTE
    ROUTE --> WS2
    WS2 --> RECEIVER

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

**Step-by-step flow:**

1. Sender types "Hey, are you free tonight?" and hits send → message travels over their open WebSocket connection to Server A
2. Server A forwards the message to the Chat Service
3. Chat Service persists the message to Cassandra (partition key = `conversationId`, so all messages in a chat live together) - now it's durable, even if everything crashes
4. Chat Service asks Redis: "Which server is the receiver connected to?" → answer: Server B
5. Chat Service pushes the message to Server B (via internal gRPC or pub/sub)
6. Server B pushes the message down the receiver's WebSocket → message appears on their screen instantly
7. Receiver's app sends back a `delivered` acknowledgment → this receipt flows back to the sender so they see the double-check ✓✓

**Why WebSocket instead of HTTP polling?** With polling, each user would hit our servers every 2 seconds asking "any new messages?" - for 500M users, that's 250M requests/second of mostly-empty responses. WebSocket keeps a persistent connection open so the server pushes messages the instant they arrive - zero wasted requests, sub-second delivery.

### 2) Receiver is offline - store and forward

**New components we need (in addition to the ones above):**

1. **Offline Queue (Redis sorted set)** - when the receiver isn't connected, we park message IDs here. Scored by sequence number so when they reconnect, we drain messages in perfect order.
2. **Push Service** - sends push notifications to wake up the user's phone.<br>💡 *Think of it as the "tap on the shoulder" that tells the user to open the app.*
3. **FCM / APNs** - Firebase Cloud Messaging (Android) and Apple Push Notification service (iOS). External services that deliver notifications to locked phones.<br>💡 *FCM doesn't "know" a message arrived - YOUR server tells FCM to send the push. When Bob installs the app, FCM gives his device a unique token. Your server stores this token. When Bob is offline and a message arrives, your server calls FCM's API with Bob's token + notification content. FCM maintains its own persistent connection to every Android device in the world and routes the push through that always-on channel. APNs works the same way for iOS. [Learn more about real-time communication →](/concepts#real-time-communication-websocket-vs-sse-vs-polling)*

**How does the notification show the actual message text (with E2E encryption)?**

For E2E encrypted apps like WhatsApp/Signal, FCM does NOT carry the message content (the server can't read it). Instead:

1. Server sends a **silent data message** via FCM - just a "wake up, you have a new message" signal with sender ID and message reference
2. FCM wakes up the app's background process on the device
3. The app connects to the server, pulls the encrypted message, and **decrypts it locally on the device**
4. The app constructs the notification itself ("Alice: Hey, are you free?") and hands it to the OS for display

For non-E2E apps, the server CAN send the message text directly in the FCM payload (notification message type) - simpler but less secure.

```mermaid
flowchart LR
    SENDER["Sender"]:::client
    CHAT["Chat Service"]:::service
    STORE[("Message Store")]:::data
    OFFLINE[("Offline Queue<br/>Redis sorted set")]:::data
    PUSH["Push Service"]:::service
    FCM["FCM and APNs"]:::external

    SENDER --> CHAT
    CHAT --> STORE
    CHAT --> OFFLINE
    CHAT --> PUSH
    PUSH --> FCM

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
    classDef external fill:#4a1942,stroke:#f472b6,color:#e2e8f0
```

**Step-by-step flow:**

1. Chat Service checks the Connection Registry → receiver is NOT online (no WebSocket entry found)
2. Message is still persisted to Cassandra (same as before - always store first, deliver second)
3. Message ID is added to the receiver's offline queue in Redis (sorted by sequence number for ordering)
4. Push Service sends a notification via FCM/APNs: "New message from Alice" → phone buzzes
5. Later, receiver opens the app and reconnects via WebSocket → server drains the offline queue, sending all pending messages in order
6. Receiver's app acknowledges each message → server removes them from the offline queue

**Why store-and-forward instead of just "retry later"?** Mobile networks are unreliable. A user might be offline for hours (on a flight, in a tunnel, phone dead). Store-and-forward guarantees zero message loss - once the server acknowledges receipt from the sender, that message WILL reach the recipient eventually, no matter how long it takes.

### 3) Group message fan-out

**New components we need (in addition to the ones above):**

1. **Kafka** - an event bus for group message fan-out.<br>💡 *We use Kafka here because group messages need to be delivered to N members reliably. If a fan-out worker crashes mid-delivery, Kafka retries automatically - no message gets lost. [Learn more →](/concepts#message-queues)*
2. **Fan-out Workers** - consume group message events and deliver to each member individually (online → push via WebSocket, offline → queue + push notification).

```mermaid
flowchart LR
    SENDER["Sender"]:::client
    CHAT["Chat Service"]:::service
    STORE[("Message Store")]:::data
    K["Kafka<br/>fan-out topic"]:::async
    FAN["Fan-out Workers"]:::service
    WS["WebSocket Servers"]:::service
    MEMBERS["Group Members"]:::client

    SENDER --> CHAT
    CHAT --> STORE
    CHAT --> K
    K --> FAN
    FAN --> WS
    WS --> MEMBERS

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef async fill:#AB47BC,stroke:#4A148C,color:#fff
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

**Step-by-step flow:**

1. Sender sends a message to group `conv_123` (256 members) → hits Chat Service
2. Chat Service stores ONE copy of the message (partition key = `conv_123`) - not 256 copies!
3. Publishes a fan-out event to Kafka: "deliver message M to these 256 members"
4. Fan-out workers consume the event and look up each member's connection - online members get real-time WebSocket delivery, offline members get the offline queue + push notification treatment
5. If a fan-out worker crashes, Kafka retries - at-least-once delivery is guaranteed

**Why store once, fan-out on delivery?** Writing 256 copies of the same message would waste massive storage. Instead, we store one copy and fan out references (message IDs) to each member's timeline. This also makes edits and deletes trivial - change one row, and everyone sees the update.

## Potential Deep Dives

### Deep Dive 1 - How to handle 2M WebSocket connections per server

**Problem:** A chat system with 50M concurrent users needs to maintain 50M persistent WebSocket connections. If each server handles 500K connections, that's 100 servers just for connection holding. The challenge: each connection is stateful (long-lived TCP), consumes memory, and requires efficient event handling.

**Bad - one thread per connection (Java BIO / traditional blocking I/O).**

Classic Java `ServerSocket.accept()` → spawn a thread per client. At 10K threads you hit OS limits, context-switching overhead makes the CPU thrash, and each thread stack takes ~512KB. 2M threads × 512KB = 1TB RAM. Impossible.

**Good - NIO event loop model (Netty, Node.js, Go goroutines).**

Instead of one thread per connection, use a small pool of threads (event loops) that multiplex thousands of connections using OS-level I/O selectors (`epoll` on Linux, `kqueue` on macOS).

**What Netty is:** An asynchronous, event-driven network framework for Java. It implements the Reactor pattern - a single thread monitors many sockets, and only wakes up when there's data to read/write. No blocking, no idle threads.

```
Event Loop (1 thread) monitors 100K connections via epoll
    → Connection has data? → Read it, process, respond
    → Connection idle? → Costs nothing (just a file descriptor)
```

**Real numbers:**
- Each idle WebSocket = ~10KB RAM (file descriptor + small read/write buffers)
- 2M connections × 10KB = 20GB RAM (fits in a 64GB server)
- Netty can handle 1-2M connections per JVM instance on modern hardware
- Go's goroutines achieve similar density (goroutine = ~4KB stack vs Java thread = 512KB)

**Tech used in production:**
- **WhatsApp:** Erlang/OTP (lightweight processes, similar to goroutines - famously ran 2M connections per server)
- **Discord:** Elixir/Erlang on the gateway, Rust for hot paths
- **Slack:** Java + Netty for WebSocket gateway (project "Flannel")
- **Signal:** Java + Netty
- **WeChat:** C++ custom framework

**Great - tiered architecture separating connection from logic.**

At extreme scale (100M+ connections), even Netty hits limits on a single machine. The solution: split into two layers.

```
Clients → [Edge Tier: connection handling] → [Logic Tier: message routing]
```

- **Edge tier (WebSocket terminators):** Lightweight servers that ONLY manage TCP connections, TLS termination, and heartbeats. No business logic. Can hold 2M+ connections each because they do almost nothing per connection. Built with: Envoy proxy, HAProxy, or custom Go/Rust services.
- **Logic tier (message processing):** Receives messages from edge via gRPC/internal protocol. Handles routing ("who gets this message?"), persistence, fan-out. Stateless, scales independently.

**Why separate?** You can scale connection capacity (add edge nodes) without scaling processing (expensive). During idle hours, connections exist but messages are rare - edge handles the load, logic tier is mostly sleeping.

**Connection routing problem:** When a message arrives for Bob, which edge server holds Bob's WebSocket? Answer: a Connection Registry (Redis hash: `userId → edgeServerId:connectionId`). Logic tier looks up the registry and routes to the correct edge node.

---

### Deep Dive 2 - Message ordering in distributed systems

**Problem:** Alice sends "Hello" then "How are you?" in quick succession. These hit different server instances (load balanced). Or one arrives via WebSocket, another via a retry. Bob must see them in the correct order. Out-of-order messages make conversations nonsensical.

**Why this is hard:** In a distributed system, there's no global clock. Server A's timestamp might be 50ms ahead of Server B. Network latency varies. Messages can be retried out of order.

**Bad - rely on server timestamps.**

Each server stamps the message with `System.currentTimeMillis()` on arrival. Sort by timestamp on display.

Fails because:
- Clock skew between servers (NTP syncs every few seconds, drift is 10-50ms)
- Alice's "Hello" hits Server A at T=1000, "How are you?" hits Server B whose clock reads T=999. Bob sees them reversed.
- Even on one server, if two messages arrive in the same millisecond, order is random.

**Good - per-conversation monotonic sequence number.**

Assign a strictly increasing `seqNo` per conversation. Every message in a conversation gets the next number in sequence.

**Implementation:** Redis `INCR` on key `conv_seq:{conversationId}`.

```
Alice sends "Hello"     → server does INCR conv_seq:alice_bob → gets 42
Alice sends "How are you?" → server does INCR conv_seq:alice_bob → gets 43
```

Bob's client sorts by `seqNo` regardless of arrival order. Even if msg 43 arrives before 42 (network jitter), the UI holds 43 and renders after 42 arrives.

**Why Redis INCR?** Atomic, single-threaded, sub-ms. Even at 100K messages/sec across all conversations, one Redis cluster handles it because each conversation is an independent key (no contention across conversations).

**What about gaps?** If Bob receives seqNo 42 then 44 (missed 43), client knows there's a gap and requests: "give me message 43 for this conversation." Server fetches from the message store.

**Great - sequence numbers + client vector clock + multi-device sync.**

For apps with multiple devices (phone + web + desktop), ordering gets harder. User sends from phone (seqNo 42), then from desktop (seqNo 43). Both devices need to converge.

**The approach (used by WhatsApp, Slack, Facebook Messenger):**

1. **Server is the source of truth** for sequence numbers. Server assigns seqNo on receipt - NOT the client.
2. **Each device maintains a cursor:** `lastSyncedSeqNo`. On reconnect, device says "give me everything after seqNo 38" and server sends the delta.
3. **Client embeds `lastSeenSeqNo` in outgoing messages** so the server can detect if the client missed something and proactively push missing messages.
4. **Conflict resolution for near-simultaneous sends from multiple devices:** Both get seqNos from the same atomic counter, so they're naturally ordered by who hit the server first. No conflict possible at the ordering level.

**Tech used in production:**
- **WhatsApp:** Server-assigned message IDs + per-chat ordering. Each message has a globally unique ID + per-conversation sequence.
- **Slack:** Uses a `ts` (timestamp) as the unique message ID within a channel. Server-generated, monotonically increasing per channel. Format: `1234567890.123456`.
- **Discord:** Snowflake IDs (time-based, globally unique). Messages sorted by Snowflake ID which is inherently time-ordered since timestamp is the most significant bits.

### Deep Dive 3 - Reliable delivery with at-least-once + client dedupe

**Problem:** Network is unreliable. Message might be delivered twice if the ack is lost.

**Flow:**
```
Sender → Server: message (clientMsgId: "abc")
Server → Sender: ack (messageId: "msg_1", clientMsgId: "abc")
Server → Receiver: message (messageId: "msg_1")
Receiver → Server: delivered ack (messageId: "msg_1")
```

**What if receiver's ack is lost?** Server retries delivery. Receiver sees `msg_1` twice. Client dedupes by `messageId` - if already in local DB, ignore.

**What if sender's send is retried?** Server checks `clientMsgId: "abc"` against a short-lived dedupe cache. If seen, returns the same `messageId` without re-storing.

**Result:** at-least-once from server side, exactly-once from user's perspective (client dedupe).

### Deep Dive 4 - How to sync message history across devices

**Problem:** User has phone + web + desktop. All three must show the same messages.

**Solution: pull-based sync with sequence numbers.**
- Each conversation has a `maxSeqNo`.
- Each device tracks `lastSyncedSeqNo` per conversation.
- On app open, device sends `GET /conversations/:id/messages?after=lastSyncedSeqNo`.
- Server returns the delta. Device applies locally.
- Real-time messages come via WebSocket; device increments its local seqNo on receipt.

This is the "ordered log" model (Facebook Iris). The server is the source of truth; clients are materialized views with a cursor.

### Deep Dive 5 - Group fan-out: write amplification vs read amplification

**Write amplification (push model):**
- On group message, write a copy to each member's inbox.
- 256-member group × 1000 messages/day = 256K writes/day for one group.
- **Pro:** reads are fast (each user reads their own inbox).
- **Con:** massive write cost at scale. Celebrity groups with 100K members are catastrophic.

**Read amplification (pull model):**
- Store one copy per conversation.
- On read, user's client fetches from the conversation's log.
- **Pro:** one write per message regardless of group size.
- **Con:** each read must merge multiple conversations' logs.

**Hybrid (what WhatsApp/Discord do):**
- **Small groups (≤256):** push model. Fan-out is bounded and fast.
- **Large channels (1000+):** pull model. Store in channel log, clients fetch on demand.
- Threshold is configurable per platform.

## Final Architecture

```mermaid
flowchart LR
    CLIENTS["Mobile and Web Clients"]:::client
    LB["Load Balancer<br/>sticky by userId"]:::edge
    WS["WebSocket Servers<br/>Netty edge tier"]:::service
    CHAT["Chat Service"]:::service
    REG[("Connection Registry<br/>Redis")]:::data
    STORE[("Message Store<br/>Cassandra")]:::data
    OFFLINE[("Offline Queue<br/>Redis sorted set")]:::data
    K["Kafka<br/>fan-out and events"]:::async
    FAN["Fan-out Workers"]:::service
    PUSH["Push Service"]:::service
    MEDIA[("S3 and CDN<br/>media")]:::data
    FCM["FCM and APNs"]:::external

    CLIENTS --> LB
    LB --> WS
    WS --> CHAT
    CHAT --> REG
    CHAT --> STORE
    CHAT --> OFFLINE
    CHAT --> K
    K --> FAN
    FAN --> WS
    CHAT --> PUSH
    PUSH --> FCM

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef edge fill:#1e3a5f,stroke:#60a5fa,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef async fill:#AB47BC,stroke:#4A148C,color:#fff
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
    classDef external fill:#4a1942,stroke:#f472b6,color:#e2e8f0
```

## Summary

| Decision | Choice | Why |
|---|---|---|
| Transport | WebSocket | Real-time bidirectional, sub-second delivery |
| Message store | Cassandra | Partition per conversation, append-only, handles billions |
| Connection registry | Redis | Sub-ms lookup of "which server has user X" |
| Offline delivery | Redis sorted set + push notification | Ordered drain on reconnect |
| Group fan-out | Kafka → workers | Async, retryable, doesn't block sender |
| Ordering | Per-conversation sequence number | Simple, no clock dependency |
| Delivery guarantee | At-least-once + client dedupe | Zero message loss, no duplicates visible to user |
| Multi-device | Pull sync with seqNo cursor | Ordered log model (Facebook Iris) |


---

## Key Technologies Mentioned

| Term | What it is |
|---|---|
| **WebSocket** | A persistent two-way connection between client and server. Unlike HTTP (request → response → done), WebSocket stays open so the server can push messages to the client anytime. |
| **Cassandra** | A distributed NoSQL database optimized for fast writes. Stores data across many machines. Perfect for append-only message logs. |
| **Kafka** | A distributed event streaming platform. Producers write events, consumers read them. Used here to decouple message sending from delivery fan-out. |
| **Redis** | In-memory key-value store (< 1ms reads). Used here for connection registry (which user is on which server) and offline message queues. |
| **FCM / APNs** | Firebase Cloud Messaging (Android) and Apple Push Notification service (iOS). How you send push notifications to phones when the app is closed. |
| **Sequence Number** | A monotonically increasing integer per conversation. Guarantees message ordering regardless of clock differences between servers. |
| **Store-and-Forward** | Pattern where the server stores a message durably first, then delivers it when the recipient is available. Ensures zero message loss. |
| **Fan-out** | Delivering one message to multiple recipients (group chat). "Fan-out on write" = copy to each inbox. "Fan-out on read" = store once, each client fetches. |

---

## What's Expected at Each Level

> This section helps you calibrate your depth. You don't need to cover everything - just know what's expected for your level.

### Mid-level

Design basic 1:1 messaging with a server relaying messages. Propose WebSocket for real-time delivery. Understand offline message storage and why polling is wasteful. With prompting, discuss how to handle group messages by fanning out to multiple recipients.

### Senior

Propose Cassandra for message storage (partition by conversation). Explain connection-level routing - how does a message find the right WebSocket server? Discuss read receipts, message ordering guarantees (per-conversation sequence numbers), and offline delivery queues. Articulate why eventual consistency is acceptable for message delivery.

### Staff+

Address end-to-end encryption key exchange (Signal protocol double-ratchet), multi-device sync with ordered-log cursors, and message fan-out for large groups (1000+ members) using the hybrid push/pull model. Discuss graceful degradation when the chat service is overloaded (backpressure on WebSocket connections). Cover message retention policies and GDPR right-to-deletion across replicated stores.

---
## 🎯 Key Takeaways

- **WebSocket** for real-time delivery - persistent connection, server pushes
- **Cassandra** for message storage - partitioned by conversation for fast reads
- **Store-and-forward** for offline users - deliver when they reconnect
- **Connection registry** in Redis routes messages to the right WebSocket server

---
## Related Designs
- [Notification System](/hld/NotificationSystem) - similar multi-channel delivery + WebSocket patterns
- [Twitter Feed](/hld/TwitterFeed) - fan-out and real-time updates
- [Stock Broker](/hld/StockBroker) - Kafka event streaming + exactly-once semantics
