---
layout: default
title: "API Design in System Design - REST, GraphQL, gRPC"
description: "Complete guide to API design in system design interviews. REST principles, GraphQL vs REST, gRPC for internal services, versioning, pagination, idempotency keys."
permalink: /concepts/api-design/
---

# API Design - Complete Deep Dive

> **Prerequisites:** [HTTP Basics](/concepts#http), [Caching](/concepts/caching/)
> **Used in:** Every single system design (all 20 designs on this site)

---

## What is API Design?

API design is defining the contract between clients and servers — what endpoints exist, what data goes in, what comes out, and how errors are communicated.

**Real-world analogy:** A restaurant menu is an API. It lists what you can order (endpoints), what choices you have (parameters), what you'll receive (response), and rules (no substitutions = validation). The kitchen (server) doesn't care how you found the restaurant — it only responds to valid orders from the menu.

```
Client                          Server
  │                               │
  │  POST /orders                 │
  │  { "item": "pizza",          │
  │    "size": "large" }          │
  │ ─────────────────────────────▶│
  │                               │  Validate
  │                               │  Process
  │  201 Created                  │
  │  { "orderId": "abc123",      │
  │    "status": "confirmed" }    │
  │◀───────────────────────────── │
```

---

## REST (Representational State Transfer)

The most common API style. Uses HTTP methods + resource-based URLs.

### REST Principles

| Principle | Meaning | Example |
|---|---|---|
| Resources | Everything is a noun | `/users`, `/orders`, `/products` |
| HTTP Methods | Verbs = actions | GET, POST, PUT, DELETE, PATCH |
| Stateless | Each request is self-contained | Token in every request header |
| Uniform Interface | Predictable URL patterns | `GET /users/123/orders` |

### HTTP Methods

```
GET    /users          → List all users (read)
GET    /users/123      → Get user 123 (read)
POST   /users          → Create a new user (create)
PUT    /users/123      → Replace user 123 entirely (full update)
PATCH  /users/123      → Partially update user 123 (partial update)
DELETE /users/123      → Delete user 123 (delete)
```

### REST Response Codes

| Code | Meaning | When |
|---|---|---|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation failed |
| 401 | Unauthorized | Missing/invalid auth |
| 403 | Forbidden | Valid auth but no permission |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate or state conflict |
| 429 | Too Many Requests | Rate limited |
| 500 | Internal Server Error | Server bug |

---

## GraphQL

A query language for APIs. Client specifies exactly what data it needs.

```
# REST: multiple round trips
GET /users/123          → { id, name, email, avatar, ... }
GET /users/123/posts    → [{ id, title, body, ... }, ...]
GET /users/123/friends  → [{ id, name, ... }, ...]

# GraphQL: one request, exact data
POST /graphql
{
  user(id: 123) {
    name
    email
    posts(limit: 5) { title }
    friends { name }
  }
}
→ Returns exactly what you asked for, nothing more
```

---

## gRPC (Google Remote Procedure Call)

Binary protocol using Protocol Buffers. Fast, strongly typed, designed for service-to-service communication.

```protobuf
// user.proto - defines the contract
service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (stream User);
}

message GetUserRequest {
  string user_id = 1;
}

message User {
  string id = 1;
  string name = 2;
  string email = 3;
}
```

---

## Comparison Table

| Feature | REST | GraphQL | gRPC |
|---|---|---|---|
| Protocol | HTTP/1.1 or HTTP/2 | HTTP (typically POST) | HTTP/2 |
| Format | JSON | JSON | Protocol Buffers (binary) |
| Schema | OpenAPI (optional) | Strongly typed (SDL) | Strongly typed (.proto) |
| Over-fetching | Common | No (client picks fields) | No (typed messages) |
| Under-fetching | Common (need multiple calls) | No (nested queries) | Need separate RPCs |
| Streaming | No (use WebSockets) | Subscriptions | Native bidirectional streaming |
| Caching | Easy (HTTP caching, CDN) | Hard (all POSTs) | Hard |
| Browser support | Native | Native | Needs grpc-web proxy |
| Best for | Public APIs, CRUD | Mobile apps, complex UIs | Internal microservices |
| Learning curve | Low | Medium | High |

---

## Pagination

Three common patterns:

### 1. Offset-Based (simplest)

```
GET /posts?page=3&limit=20
→ Skip 40 items, return next 20

Response:
{
  "data": [...],
  "pagination": {
    "page": 3,
    "limit": 20,
    "total": 1500,
    "totalPages": 75
  }
}
```

**Problem:** Slow for large offsets (DB must scan and skip). Items can shift if new data is inserted.

### 2. Cursor-Based (recommended for feeds)

```
GET /posts?cursor=eyJpZCI6MTAwfQ&limit=20
→ Get 20 items after cursor position

Response:
{
  "data": [...],
  "pagination": {
    "nextCursor": "eyJpZCI6MTIwfQ",
    "hasMore": true
  }
}
```

**Cursor** = encoded pointer (usually base64 of last item's ID or timestamp). Stable even if new items are added.

### 3. Keyset-Based (most performant)

```
GET /posts?after_id=100&limit=20
→ WHERE id > 100 ORDER BY id LIMIT 20
```

Uses indexed column directly. O(1) regardless of offset.

| Pattern | Pros | Cons | Best For |
|---|---|---|---|
| Offset | Simple, supports "jump to page N" | Slow at large offsets, unstable | Admin panels, small datasets |
| Cursor | Stable, consistent performance | Can't jump to page N | Infinite scroll, feeds |
| Keyset | Fastest, uses index directly | Can't jump, needs sortable key | High-volume data, timelines |

---

## Idempotency Keys

Ensures that retrying a request doesn't cause duplicate side effects.

```
Without idempotency:
  Client: POST /payments { amount: 100 } → timeout, no response
  Client: POST /payments { amount: 100 } → retry
  Result: User charged $200 (double charge!)

With idempotency key:
  Client: POST /payments
          Idempotency-Key: "abc-123-def"
          { amount: 100 } → timeout
  Client: POST /payments
          Idempotency-Key: "abc-123-def"
          { amount: 100 } → retry
  Server: "I already processed abc-123-def, returning cached result"
  Result: User charged $100 (correct!)
```

```
Implementation:
┌────────────────────────────────────────────────────┐
│ 1. Client sends request with Idempotency-Key header│
│ 2. Server checks Redis/DB: key exists?             │
│    - YES → return stored response                  │
│    - NO  → process request, store result with key  │
│ 3. Key expires after 24h (configurable)            │
└────────────────────────────────────────────────────┘
```

---

## API Versioning

### URL Path Versioning (most common)

```
GET /v1/users/123
GET /v2/users/123
```

### Header Versioning

```
GET /users/123
Accept: application/vnd.api+json; version=2
```

### Query Parameter Versioning

```
GET /users/123?version=2
```

| Approach | Pros | Cons |
|---|---|---|
| URL path (`/v1/`) | Obvious, cacheable, easy to route | URL pollution |
| Header | Clean URLs | Hidden, hard to test in browser |
| Query param | Easy to add | Caching complications |

**In interviews, use URL path versioning.** It's simplest and most widely adopted.

---

## API Design Best Practices for Interviews

```
1. Use nouns, not verbs:
   ✓ GET /users/123/orders
   ✗ GET /getUserOrders?id=123

2. Plural resource names:
   ✓ /users, /orders, /products
   ✗ /user, /order, /product

3. Nest for relationships (max 2 levels):
   ✓ /users/123/orders
   ✓ /orders/456/items
   ✗ /users/123/orders/456/items/789/reviews

4. Use query params for filtering:
   GET /orders?status=pending&created_after=2024-01-01

5. Return meaningful errors:
   {
     "error": {
       "code": "INSUFFICIENT_BALANCE",
       "message": "Account balance is $50, transfer requires $100",
       "field": "amount"
     }
   }

6. Always include request IDs for debugging:
   X-Request-Id: req_abc123def456
```

---

## When to Use Which

| Scenario | Choice | Why |
|---|---|---|
| Public-facing API | REST | Simple, cacheable, well-understood |
| Mobile app with complex views | GraphQL | Reduce round trips, fetch exactly needed data |
| Microservice-to-microservice | gRPC | Fast, typed, streaming support |
| Real-time updates | WebSocket + REST | REST for CRUD, WS for push |
| File uploads | REST (multipart) | Well-supported, simple |
| Internal tooling | REST or gRPC | Depends on team expertise |

---

## Real-World Examples

| Company | Approach |
|---|---|
| **Stripe** | REST with exceptional documentation. Idempotency keys on all POSTs. Versioning via date headers. |
| **GitHub** | REST v3 + GraphQL v4. Moved to GraphQL for complex nested data (repos, issues, PRs, comments). |
| **Netflix** | GraphQL (Federated) for BFF (Backend for Frontend). gRPC between internal microservices. |
| **Google** | gRPC for all internal services. Public APIs are REST with gRPC transcoding. |
| **Shopify** | GraphQL for partners/merchants. Reduced API calls by 50% vs REST. |

---

## Common Interview Questions

**Q: "How would you design the API for this system?"**
A: Start with core resources (nouns). Map each functional requirement to an endpoint. Use REST with JSON. Define request/response shapes. Add auth (JWT in Authorization header). Add pagination for list endpoints. Add idempotency keys for mutations.

**Q: "REST or GraphQL for this design?"**
A: REST for public APIs, simpler caching, and when clients have predictable data needs. GraphQL when clients are diverse (web, mobile, TV) and need different data shapes from the same backend. For interviews, REST is usually sufficient unless the interviewer specifically brings up GraphQL.

**Q: "How do you handle breaking changes?"**
A: Version the API (URL path: /v1/, /v2/). Never remove fields in an existing version — only add. Deprecate old versions with a sunset header and timeline. Run old + new versions simultaneously during migration.

**Q: "How do you secure your API?"**
A: Authentication (JWT or API keys in Authorization header). Authorization (RBAC or ABAC). Rate limiting (per user/IP). Input validation (reject malformed requests). HTTPS only. Never expose internal IDs if they reveal information.

**Q: "How do you make APIs idempotent?"**
A: GET/PUT/DELETE are naturally idempotent. For POST (creates), use client-generated idempotency keys stored in Redis with the response. If the same key is seen again, return the stored response without re-processing.

---

[← Back to Fundamentals](/concepts) | [Next: WebSockets →](/concepts/websockets/)
