---
permalink: /lld-fundamentals/
layout: default
title: "LLD Fundamentals - SOLID, Design Patterns, Machine Coding Approach"
description: "Core concepts for Low-Level Design interviews: SOLID principles, design patterns, when to use what, class design approach, and concurrency fundamentals."
---

# LLD / Machine Coding Fundamentals

> 💡 **Language note:** Examples use Java-like syntax for readability. The patterns (Strategy, State, Observer, etc.) apply identically in Python, C++, Go, or any OOP language. Individual problem solutions will be available in multiple languages.

Everything you need before tackling machine-coding problems. These concepts are what interviewers grade on - not clever algorithms, but how well you organize code under time pressure.

---

## What is a Machine Coding Round?

90-120 minutes. You get a one-page problem statement. You ship working, demoable, extensible code. Then a senior SDE walks through your code in a 30-min discussion round and may add new requirements on the fly.

**What's graded (in order of importance):**
1. Does it work end-to-end? (Demo class runs)
2. Is it modular? (Multiple classes, each doing one thing)
3. Is it extensible? (Adding a new variant = one new class, no edits elsewhere)
4. Does it handle edge cases? (Invalid inputs, state violations)
5. Is it thread-safe? (When shared mutable state exists)

---

## SOLID Principles

The five principles interviewers most often probe. Know what each one means and be ready to spot a violation in code.

### S - Single Responsibility

> A class should have only one reason to change.

**Violation:**
```java
class OrderService {
    void placeOrder(Order o) { ... }
    void sendEmail(Order o) { ... }   // ← why is email here?
    String generateInvoicePDF(Order o) { ... }  // ← and PDF?
}
```

**Fix:** Split into `OrderService`, `EmailService`, `InvoiceService`. Each changes for exactly one business reason.

### O - Open/Closed

> Open for extension, closed for modification.

**Violation:** Adding a new pricing strategy means editing the `calculatePrice` method with another `else if`.

**Fix:** Extract a `PricingStrategy` interface. New strategy = new class. Existing code doesn't change.

```java
interface PricingStrategy { long calculate(Order o); }
class FlatPricing implements PricingStrategy { ... }
class WeekendSurgePricing implements PricingStrategy { ... }
// Adding DiscountPricing? Just implement the interface.
```

### L - Liskov Substitution

> Subtypes must be usable wherever their base type is expected, without breaking behavior.

**Classic violation:** `Square extends Rectangle`. If `setWidth` changes only width but the base contract says width and height are independent, the subtype breaks the substitution.

**Rule of thumb:** If your override narrows behavior, adds preconditions, or throws where the base doesn't - it violates LSP.

### I - Interface Segregation

> Many small interfaces > one fat interface.

**Violation:**
```java
interface Worker {
    void code();
    void test();
    void design();
    void manage();  // ← not all workers manage
}
```

**Fix:** Split into `Coder`, `Tester`, `Designer`, `Manager`. Each class implements only what it actually does.

### D - Dependency Inversion

> Depend on abstractions, not concretions. Inject implementations.

**Violation:**
```java
class PaymentService {
    private RazorpayClient client = new RazorpayClient();  // ← hardcoded
}
```

**Fix:**
```java
class PaymentService {
    private final PaymentGateway gateway;  // interface
    PaymentService(PaymentGateway gw) { this.gateway = gw; }
}
```

Now you can inject `RazorpayGateway`, `StripeGateway`, or a `MockGateway` for tests - without touching `PaymentService`.

---

## Design Patterns - The 8 You Actually Need

In ~90% of machine-coding problems, one or more of these will fit. Don't shoehorn - use what the problem naturally calls for.

### 1. Strategy (most important)

**Problem:** You have multiple ways to do the same thing (pricing, sorting, splitting expenses), and the logic varies. Without Strategy, you get a growing `if/else` chain that violates Open/Closed.

**Solution:** Define an interface for the varying behavior. Each variant is a separate class implementing that interface. The service holds a reference to the interface and delegates.

```java
// The interface (the "strategy")
interface PricingStrategy {
    long calculateFee(Vehicle vehicle, int hoursParked);
}

// Variant 1
class HourlyPricing implements PricingStrategy {
    private final Map<VehicleType, Long> rates;

    HourlyPricing(Map<VehicleType, Long> rates) { this.rates = rates; }

    public long calculateFee(Vehicle vehicle, int hoursParked) {
        return rates.get(vehicle.getType()) * hoursParked;
    }
}

// Variant 2
class FlatPricing implements PricingStrategy {
    private final long flatRate;

    FlatPricing(long flatRate) { this.flatRate = flatRate; }

    public long calculateFee(Vehicle vehicle, int hoursParked) {
        return flatRate;  // same regardless of time
    }
}

// Variant 3 (added later without modifying existing code)
class WeekendSurgePricing implements PricingStrategy {
    private final PricingStrategy base;
    private final double multiplier;

    public long calculateFee(Vehicle vehicle, int hoursParked) {
        long baseFee = base.calculateFee(vehicle, hoursParked);
        return isWeekend() ? (long)(baseFee * multiplier) : baseFee;
    }
}
```

**How it's used:**
```java
class ParkingLot {
    private PricingStrategy pricing;  // injected via constructor

    ParkingLot(PricingStrategy pricing) { this.pricing = pricing; }

    long checkout(Ticket ticket) {
        int hours = calculateHours(ticket);
        return pricing.calculateFee(ticket.getVehicle(), hours);
    }
}
```

**When to reach for it:** Whenever the problem says "support multiple types of X" - pricing, scoring, assignment, eviction, split calculation, routing, matching.

**Used in:** [Parking Lot](/lld/ParkingLot), [Splitwise](/lld/Splitwise), [Music Player](/lld/MusicPlayer), [Multilevel Cache](/lld/MultilevelCache)

---

### 2. State

**Problem:** An object behaves differently depending on what state it's in. A vending machine accepts coins when idle, dispenses when paid, and rejects input when out of stock. Without State pattern, you get `if (state == IDLE) ... else if (state == PAID) ...` everywhere.

**Solution:** Each state is its own class implementing a common interface. The context object delegates all behavior to its current state. State transitions = swapping the state object.

```java
// The state interface
interface VendingState {
    void insertCoin(VendingMachine ctx, int amount);
    void selectItem(VendingMachine ctx, String item);
    void dispense(VendingMachine ctx);
}

// State 1: waiting for coin
class IdleState implements VendingState {
    public void insertCoin(VendingMachine ctx, int amount) {
        ctx.setBalance(amount);
        ctx.setState(new HasMoneyState());
        System.out.println("Accepted " + amount + " cents");
    }
    public void selectItem(VendingMachine ctx, String item) {
        System.out.println("Insert coin first");
    }
    public void dispense(VendingMachine ctx) {
        System.out.println("Insert coin first");
    }
}

// State 2: has money, waiting for selection
class HasMoneyState implements VendingState {
    public void insertCoin(VendingMachine ctx, int amount) {
        ctx.setBalance(ctx.getBalance() + amount);
    }
    public void selectItem(VendingMachine ctx, String item) {
        if (ctx.getBalance() >= ctx.getPrice(item)) {
            ctx.setSelectedItem(item);
            ctx.setState(new DispensingState());
            ctx.dispense();
        } else {
            System.out.println("Not enough money");
        }
    }
    public void dispense(VendingMachine ctx) {
        System.out.println("Select an item first");
    }
}

// State 3: dispensing
class DispensingState implements VendingState {
    public void insertCoin(VendingMachine ctx, int amount) {
        System.out.println("Please wait, dispensing");
    }
    public void selectItem(VendingMachine ctx, String item) {
        System.out.println("Please wait, dispensing");
    }
    public void dispense(VendingMachine ctx) {
        System.out.println("Dispensing " + ctx.getSelectedItem());
        ctx.setBalance(ctx.getBalance() - ctx.getPrice(ctx.getSelectedItem()));
        ctx.setState(new IdleState());
    }
}

// The context
class VendingMachine {
    private VendingState state = new IdleState();
    private int balance;
    private String selectedItem;

    void setState(VendingState s) { this.state = s; }
    void insertCoin(int amount) { state.insertCoin(this, amount); }
    void selectItem(String item) { state.selectItem(this, item); }
    void dispense() { state.dispense(this); }
}
```

**When to reach for it:** Entity has 3+ states with different behaviors per state. Order lifecycle, game turns, connection states, approval workflows.

**Used in:** [Snake & Ladder](/lld/SnakeLadder) (game phases)

---

### 3. Observer

**Problem:** When something changes, multiple other objects need to know. Without Observer, you hardcode notifications: `leaderboard.update(); logger.log(); analytics.track();` - adding a new listener means modifying the publisher.

**Solution:** The subject maintains a list of listeners. On state change, it notifies all registered listeners. Adding/removing listeners requires zero changes to the publisher.

```java
// The listener interface
interface GameEventListener {
    void onScoreUpdate(String playerId, int newScore);
    void onGameEnd(String winnerId);
}

// Listener 1
class Leaderboard implements GameEventListener {
    private final TreeMap<Integer, List<String>> rankings = new TreeMap<>(Comparator.reverseOrder());

    public void onScoreUpdate(String playerId, int newScore) {
        // Update rankings
        rankings.computeIfAbsent(newScore, k -> new ArrayList<>()).add(playerId);
        System.out.println("Leaderboard updated: " + playerId + " → " + newScore);
    }
    public void onGameEnd(String winnerId) {
        System.out.println("Final standings computed");
    }
}

// Listener 2
class NotificationService implements GameEventListener {
    public void onScoreUpdate(String playerId, int newScore) {
        // Send push notification
        System.out.println("Notified " + playerId + " of new score");
    }
    public void onGameEnd(String winnerId) {
        System.out.println("Sent congratulations to " + winnerId);
    }
}

// The subject (publisher)
class GameEngine {
    private final List<GameEventListener> listeners = new ArrayList<>();

    void subscribe(GameEventListener l) { listeners.add(l); }
    void unsubscribe(GameEventListener l) { listeners.remove(l); }

    void updateScore(String playerId, int score) {
        // ... game logic ...
        listeners.forEach(l -> l.onScoreUpdate(playerId, score));
    }

    void endGame(String winnerId) {
        // ... finalize ...
        listeners.forEach(l -> l.onGameEnd(winnerId));
    }
}
```

**Usage:**
```java
GameEngine engine = new GameEngine();
engine.subscribe(new Leaderboard());
engine.subscribe(new NotificationService());
// Adding analytics later? Just: engine.subscribe(new AnalyticsTracker());
// No changes to GameEngine.
```

**When to reach for it:** "When X happens, notify Y and Z." Leaderboards, availability alerts, event logging, notifications.

**Used in:** [Music Player](/lld/MusicPlayer), [Snake & Ladder](/lld/SnakeLadder), [Splitwise](/lld/Splitwise)

---

### 4. Decorator

**Problem:** You want to add behavior to an object dynamically, in layers. Subclassing for every combination explodes: `EspressoWithMilk`, `EspressoWithMilkAndSugar`, `EspressoWithSugarAndWhip`... 2^N combinations.

**Solution:** Wrap the original object in a decorator that implements the same interface. Decorators can be stacked.

```java
// Base interface
interface DataSource {
    void writeData(String data);
    String readData();
}

// Core implementation
class FileDataSource implements DataSource {
    private final String filename;
    FileDataSource(String filename) { this.filename = filename; }
    public void writeData(String data) { /* write to file */ }
    public String readData() { /* read from file */ return "raw data"; }
}

// Decorator 1: adds encryption
class EncryptionDecorator implements DataSource {
    private final DataSource wrapped;
    EncryptionDecorator(DataSource source) { this.wrapped = source; }

    public void writeData(String data) {
        String encrypted = encrypt(data);
        wrapped.writeData(encrypted);
    }
    public String readData() {
        return decrypt(wrapped.readData());
    }
}

// Decorator 2: adds compression
class CompressionDecorator implements DataSource {
    private final DataSource wrapped;
    CompressionDecorator(DataSource source) { this.wrapped = source; }

    public void writeData(String data) {
        String compressed = compress(data);
        wrapped.writeData(compressed);
    }
    public String readData() {
        return decompress(wrapped.readData());
    }
}
```

**Usage - stack decorators:**
```java
// Plain file
DataSource source = new FileDataSource("data.txt");

// File with compression
source = new CompressionDecorator(source);

// File with compression AND encryption
source = new EncryptionDecorator(source);

// Now writeData() → encrypt → compress → write to file
source.writeData("sensitive data");
```

**When to reach for it:** Layered enhancements - caching + logging + metrics around a service, tiered pricing, IO wrappers.

---

### 5. Composite

**Problem:** You have a tree structure where individual items and groups should be treated the same way. A folder contains files and other folders. A menu has items and sub-menus. You want `getPrice()` to work on both a single item and an entire category.

**Solution:** One interface. Leaf nodes implement it directly. Composite nodes hold children and delegate.

```java
// Common interface
interface FileSystemNode {
    String getName();
    long getSize();
    void display(String indent);
}

// Leaf: a file
class File implements FileSystemNode {
    private final String name;
    private final long size;

    File(String name, long size) { this.name = name; this.size = size; }
    public String getName() { return name; }
    public long getSize() { return size; }
    public void display(String indent) {
        System.out.println(indent + name + " (" + size + " bytes)");
    }
}

// Composite: a directory
class Directory implements FileSystemNode {
    private final String name;
    private final List<FileSystemNode> children = new ArrayList<>();

    Directory(String name) { this.name = name; }
    void add(FileSystemNode node) { children.add(node); }

    public String getName() { return name; }
    public long getSize() {
        return children.stream().mapToLong(FileSystemNode::getSize).sum();
    }
    public void display(String indent) {
        System.out.println(indent + name + "/");
        children.forEach(c -> c.display(indent + "  "));
    }
}
```

**Usage:**
```java
Directory root = new Directory("src");
root.add(new File("Main.java", 2048));
Directory models = new Directory("models");
models.add(new File("User.java", 1024));
models.add(new File("Order.java", 1536));
root.add(models);

root.display("");     // prints entire tree
root.getSize();       // 4608 (sums all files recursively)
```

**When to reach for it:** Tree/hierarchy structures - menus, org charts, task/subtask, category/product.

---

### 6. Factory

**Problem:** The calling code shouldn't know which concrete class to instantiate. If you scatter `new RazorpayGateway()` everywhere, switching to Stripe means editing 50 files.

**Solution:** A factory method that returns the interface type. The decision of which concrete class to create is centralized in one place.

```java
// Interface
interface NotificationChannel {
    void send(String to, String message);
}

// Implementations
class EmailChannel implements NotificationChannel {
    public void send(String to, String message) {
        System.out.println("Email to " + to + ": " + message);
    }
}
class SMSChannel implements NotificationChannel {
    public void send(String to, String message) {
        System.out.println("SMS to " + to + ": " + message);
    }
}
class PushChannel implements NotificationChannel {
    public void send(String to, String message) {
        System.out.println("Push to " + to + ": " + message);
    }
}

// Factory
class NotificationFactory {
    static NotificationChannel create(ChannelType type) {
        return switch (type) {
            case EMAIL -> new EmailChannel();
            case SMS   -> new SMSChannel();
            case PUSH  -> new PushChannel();
        };
    }
}

// Usage (caller doesn't know concrete class):
NotificationChannel channel = NotificationFactory.create(user.getPreferredChannel());
channel.send(user.getContact(), "Your order shipped!");
```

**When to reach for it:** Object creation based on a type/config/input. Payment gateways, notification channels, vehicle creation, task handlers.

---

### 7. Adapter

**Problem:** You have an existing class/API with one interface, but your code expects a different interface. You can't modify the external code (third-party library, legacy system).

**Solution:** A wrapper class that translates between the two interfaces.

```java
// External library (can't modify)
class StripeSDK {
    ChargeResult charge(String cardToken, int amountCents, String currency) {
        // Stripe-specific logic
        return new ChargeResult(true, "ch_abc123");
    }
}

// Your internal interface
interface PaymentGateway {
    PaymentResult processPayment(PaymentRequest request);
}

// Adapter: bridges Stripe's interface to yours
class StripeAdapter implements PaymentGateway {
    private final StripeSDK stripe = new StripeSDK();

    public PaymentResult processPayment(PaymentRequest request) {
        ChargeResult result = stripe.charge(
            request.getCardToken(),
            (int)(request.getAmount() * 100),  // convert to cents
            request.getCurrency()
        );
        return new PaymentResult(
            result.isSuccess(),
            result.getChargeId(),
            request.getAmount()
        );
    }
}

// Tomorrow you add Razorpay? Just create RazorpayAdapter.
// PaymentService doesn't change.
class RazorpayAdapter implements PaymentGateway {
    public PaymentResult processPayment(PaymentRequest request) {
        // translate to Razorpay API format
    }
}
```

**When to reach for it:** Wrapping external APIs (payment, SMS, email providers) behind a common internal interface. Also useful for legacy code integration.

---

### 8. Facade

**Problem:** Your subsystem has many internal classes (Topic, ConsumerGroup, InFlightTracker, OffsetManager). Callers shouldn't know about or interact with all of them directly.

**Solution:** One class that exposes simple high-level methods and orchestrates the internal objects.

```java
// Complex internals (many classes, many interactions)
class TopicManager { /* manages topics and partitions */ }
class ConsumerGroupManager { /* manages consumer groups */ }
class MessageStore { /* stores messages */ }
class OffsetTracker { /* tracks consumer positions */ }
class RetryManager { /* handles failed messages */ }

// Facade: one simple API for external callers
class MessageBroker {
    private final TopicManager topics;
    private final ConsumerGroupManager groups;
    private final MessageStore store;
    private final OffsetTracker offsets;
    private final RetryManager retries;

    MessageBroker() {
        this.topics = new TopicManager();
        this.groups = new ConsumerGroupManager();
        this.store = new MessageStore();
        this.offsets = new OffsetTracker();
        this.retries = new RetryManager();
    }

    // Simple methods hiding all the complexity
    void createTopic(String name, int partitions) {
        topics.create(name, partitions);
        offsets.initializeForTopic(name);
    }

    void publish(String topic, String message) {
        int partition = topics.assignPartition(topic, message);
        store.append(topic, partition, message);
        groups.notifyConsumers(topic, partition);
    }

    String consume(String topic, String groupId) {
        int offset = offsets.getNext(topic, groupId);
        String msg = store.read(topic, offset);
        offsets.commit(topic, groupId, offset + 1);
        return msg;
    }
}
```

**Usage (caller sees only the facade):**
```java
MessageBroker broker = new MessageBroker();
broker.createTopic("orders", 3);
broker.publish("orders", "order-123 placed");
String msg = broker.consume("orders", "billing-group");
```

**When to reach for it:** Your Demo/Main class should interact with ONE facade, not 5+ internal classes. The facade IS your service layer.

**Used in:** Every machine coding problem has a facade - `ParkingLotService`, `MusicPlayerService`, `SplitWiseService`. It's the entry point.

---

### Quick Reference: Which Pattern for What?

| If the problem says... | Reach for |
|------------------------|-----------|
| "Support multiple types of X" (pricing, scoring, routing) | **Strategy** |
| "Entity goes through states" (order, ticket, game) | **State** |
| "Notify others when something changes" | **Observer** |
| "Layer behaviors on top of each other" | **Decorator** |
| "Tree structure - items and groups treated same" | **Composite** |
| "Create objects by type/config" | **Factory** |
| "Wrap external API behind our interface" | **Adapter** |
| "One entry point for a complex subsystem" | **Facade** |

---

## Inheritance vs Composition

**Rule: Prefer composition over inheritance. Almost always.**

**Inheritance** = "is-a" relationship. Use when there's a genuine type hierarchy (Shape → Circle, Square).

**Composition** = "has-a" relationship. Use when an object uses another object's behavior.

```java
// BAD: Inheritance for code reuse
class EmailNotifier extends Logger {  // EmailNotifier IS-A Logger? No.
    void notify(String msg) {
        log(msg);  // inheriting log() just for reuse
        sendEmail(msg);
    }
}

// GOOD: Composition
class EmailNotifier {
    private final Logger logger;  // HAS-A logger
    EmailNotifier(Logger logger) { this.logger = logger; }
    void notify(String msg) {
        logger.log(msg);
        sendEmail(msg);
    }
}
```

**When inheritance is OK:**
- True type hierarchy (Vehicle → Car, Bike)
- Template Method pattern (abstract base with hooks)
- Framework requires it (Android Activity, Spring Controller)

**When composition wins:**
- Code reuse (don't inherit just to get a method)
- Multiple behaviors needed (Java has no multiple inheritance)
- Runtime flexibility (swap strategies at runtime)

> Interview tip: If you use inheritance and can't justify "X IS-A Y" in plain English, switch to composition. Interviewers specifically probe this.

---

## Builder Pattern

**What:** Construct complex objects step-by-step. Avoids constructors with 10+ parameters.

**When:** Entity creation with many optional fields (User, Order, Config, Query).

```java
class User {
    private final String name;
    private final String email;
    private final String phone;      // optional
    private final String address;    // optional
    private final UserType type;     // optional

    private User(Builder b) {
        this.name = b.name;
        this.email = b.email;
        this.phone = b.phone;
        this.address = b.address;
        this.type = b.type;
    }

    static class Builder {
        private final String name;   // required
        private final String email;  // required
        private String phone;
        private String address;
        private UserType type = UserType.REGULAR;

        Builder(String name, String email) {
            this.name = name;
            this.email = email;
        }
        Builder phone(String p) { this.phone = p; return this; }
        Builder address(String a) { this.address = a; return this; }
        Builder type(UserType t) { this.type = t; return this; }
        User build() { return new User(this); }
    }
}

// Usage:
User user = new User.Builder("Alice", "alice@mail.com")
    .phone("+91-9876543210")
    .type(UserType.PREMIUM)
    .build();
```

**Why not just a constructor?** When you have 8 parameters, half optional, a constructor becomes unreadable: `new User("Alice", "alice@mail.com", null, null, null, UserType.PREMIUM, null, null)`. Builder makes it self-documenting.

---

## Singleton - When It's OK vs Anti-Pattern

**What:** Exactly one instance of a class, globally accessible.

**When it's OK:**
- Configuration holder (read-only after init)
- Connection pool manager
- Logger (stateless utility)

**When it's an anti-pattern:**
- Anything with mutable state shared across threads (use DI instead)
- Testing becomes hard (can't mock a singleton easily)
- Hidden coupling (classes depend on a global instead of declared dependencies)

```java
// Thread-safe singleton (enum-based - simplest)
enum AppConfig {
    INSTANCE;
    private final Properties props = loadFromFile();
    public String get(String key) { return props.getProperty(key); }
}

// Usage:
String dbUrl = AppConfig.INSTANCE.get("db.url");
```

> Interview tip: If asked "should we use Singleton here?" - say "I'd prefer dependency injection. Singleton makes testing harder and hides dependencies. But for truly global read-only config, it's fine."

---

## Exception Handling - Custom Hierarchy

Don't throw generic `RuntimeException`. Create a small exception hierarchy:

```java
// Base exception for your domain
class AppException extends RuntimeException {
    private final ErrorCode code;
    AppException(ErrorCode code, String msg) {
        super(msg);
        this.code = code;
    }
}

// Specific exceptions
class EntityNotFoundException extends AppException {
    EntityNotFoundException(String entity, String id) {
        super(ErrorCode.NOT_FOUND, entity + " not found: " + id);
    }
}

class InvalidStateException extends AppException {
    InvalidStateException(String msg) {
        super(ErrorCode.INVALID_STATE, msg);
    }
}

class CapacityFullException extends AppException {
    CapacityFullException(String resource) {
        super(ErrorCode.CAPACITY_FULL, resource + " is at capacity");
    }
}
```

**Why:** The demo class can catch specific exceptions and print meaningful output. The discussion round, the interviewer asks "what happens if the lot is full?" - your code already handles it clearly.

**Rule:** Catch at the boundary (service layer), not inside business logic. Let exceptions bubble up.

---

## When NOT to Use a Pattern (Over-Engineering)

Using patterns where they don't fit is worse than not using them at all. Interviewers penalize unnecessary complexity.

| Pattern | Don't use when... |
|---------|------------------|
| Strategy | Only ONE variant exists and you're told no more will be added |
| Observer | Only one listener and it's hardcoded (just call it directly) |
| Factory | Only one type exists (just `new` it) |
| Decorator | Two layers max and they won't grow (just add the logic inline) |
| State | Only 2-3 states with trivial transitions (an enum + switch is fine) |
| Singleton | Anything with mutable state (use DI) |

**The test:** If removing the pattern and using a simpler approach (direct call, if/else, plain constructor) makes the code shorter AND equally readable - don't use the pattern.

> Interview wisdom: "I considered Strategy here but since there's only one pricing type and the problem doesn't mention extensibility, I'll keep it simple and extract later if needed." - This shows MORE design maturity than forcing a pattern.

---

## UML Basics - What Interviewers Expect

You don't need formal UML. But in the discussion round, you might be asked to draw relationships:

```
Solid arrow (→) = "depends on" / "uses"
Hollow arrow (△) = "extends" / "implements"
Diamond (◇) = "has-a" (composition)
Dashed arrow (-->) = "creates" / "factory"
```

**Example for Parking Lot:**

```
ParkingLot ◇── List<Floor>
Floor ◇── List<Slot>
Slot → Vehicle (parked vehicle reference)
ParkingLot → PricingStrategy (interface)
   △── HourlyPricing
   △── FlatPricing
ParkingLot → AssignmentStrategy (interface)
   △── NearestSlotAssignment
   △── RandomAssignment
```

**In practice:** Just draw boxes with arrows showing "who owns whom" and "who talks to whom." That's sufficient for machine coding rounds.

---

## Class Design - The 5-Minute Sketch

Before coding, spend 5 minutes sketching this on paper:

```
1. Entities (nouns in the problem)
   - What data does each hold?
   - What behavior does each own?

2. Services / Managers (verbs in the problem)
   - What operations exist?
   - Who orchestrates the flow?

3. Strategies (what varies?)
   - Pricing? Eviction? Assignment? Scoring? Routing?
   - → interface + N implementations

4. Enums (fixed categories)
   - Status? Type? Priority? → always an enum, never a String

5. Relationships
   - Who owns whom? (composition)
   - Who uses whom? (dependency, injected via constructor)
```

This sketch becomes your file structure. Then code the skeleton (class shells with method signatures), compile it, and fill in the bodies.

---

## Concurrency - When It Matters

Machine-coding problems touch concurrency when they have **shared mutable state**:
- Cache entries (multiple readers/writers)
- Booking/reservation slots (two users racing)
- Queues (producers + consumers)
- Ledgers (balance updates)

### Three levels of solution

| Level | Tool | When |
|---|---|---|
| **Simple** | `synchronized` | Default. One lock per service/facade. |
| **Better** | `ReentrantLock` | Need `tryLock`, timeout, or multiple conditions. |
| **Advanced** | `ConcurrentHashMap` + `AtomicXxx` | Lock-free reads, high-throughput counters. |

### The 90-minute approach

Use a single `ReentrantLock` on the facade class. Mention the trade-off in discussion:

> "Single lock keeps things correct and simple. For higher throughput I'd use per-entity locks acquired in a consistent order, or ConcurrentHashMap with atomic `computeIfAbsent` operations."

That's the right answer at the SDE2 bar.

### Never do this

```java
// BAD: no synchronization on shared mutable state
private Map<String, Integer> balances = new HashMap<>();
void transfer(String from, String to, int amount) {
    balances.put(from, balances.get(from) - amount);  // ← race
    balances.put(to,   balances.get(to)   + amount);  // ← race
}
```

---

## Money Handling

**Rule: money is `long` in the smallest unit (cents/paise). Never `double`.**

```java
// BAD
double price = 19.99;
double total = price * 3;  // 59.97000000000001

// GOOD
long priceInPaise = 1999;
long total = priceInPaise * 3;  // 5997 (exact)
```

Display: `total / 100.0` only at the view layer, never in business logic.

This alone has been cited as a rejection reason at PhonePe in multiple interview reports.

---

## State Machine - Explicit Transitions

Many problems have an entity with a lifecycle (Order, Issue, Booking). Always validate transitions explicitly:

```java
private void validateTransition(Status from, Status to) {
    boolean ok = switch (from) {
        case OPEN        -> to == Status.IN_PROGRESS;
        case IN_PROGRESS -> to == Status.RESOLVED || to == Status.CANCELLED;
        case RESOLVED    -> to == Status.CLOSED;
        case CLOSED, CANCELLED -> false;
    };
    if (!ok) throw new IllegalStateException(from + " → " + to + " not allowed");
}
```

This prevents invalid state changes and earns points for edge-case handling.

---

## The Demo Class - Non-Negotiable

Every machine-coding submission MUST include a `Demo.java` / `Main.java` that:

1. Creates test data (entities, users, etc.)
2. Exercises the happy path end-to-end
3. Exercises at least one edge case (invalid input, capacity full, etc.)
4. Prints meaningful output proving behavior
5. Has at least 3-5 assertion-style checks

```java
public class Demo {
    public static void main(String[] args) {
        var system = new IssueResolutionSystem();
        system.createIssue(...);
        system.addAgent(...);
        system.assignIssue("I1");
        System.out.println("Issue I1 assigned: " + system.getIssue("I1"));

        // Edge case: assign when no capable agent exists
        system.assignIssue("I2");
        require(system.getIssue("I2").getAssignedAgent() == null, "no capable agent");
    }

    static void require(boolean ok, String name) {
        if (!ok) throw new AssertionError(name);
        System.out.println("  pass: " + name);
    }
}
```

---

## Common Rejection Reasons (from interview reports)

| # | Mistake | Fix |
|---|---|---|
| 1 | No Demo class | Always include one. Always run it before submitting. |
| 2 | One giant class | Split into entities + service + strategy. |
| 3 | `double` for money | Use `long` in paise/cents. |
| 4 | No edge-case handling | Validate nulls, empty inputs, state transitions. |
| 5 | Hardcoded `if/else` for variants | Extract a Strategy interface. |
| 6 | Magic strings | Use enums for status, type, category. |
| 7 | No thread-safety on shared state | Single `ReentrantLock` on the facade. |
| 8 | Couldn't extend in discussion | If your answer is "edit this class" → you failed O/C. |

---

## How to Approach a Machine Coding Round

| Minute | What |
|---|---|
| 0-10 | Read problem, ask questions, write assumptions, sketch entities on paper |
| 10-20 | Skeleton: class shells with method signatures. Compile to check structure. |
| 20-55 | Core logic: happy path end-to-end with one strategy variant. |
| 55-70 | Second variant (proves Strategy works) + edge cases. |
| 70-80 | Demo class with prints + 5 asserts. Run it. |
| 80-90 | Buffer for bugs. Clean up imports. Add a comment for anything you'd do with more time. |

**If you hit 60 min and don't have a working happy path: stop adding features and finish what you have.** A working incomplete solution beats a broken complete one.

---

*Ready to practice? Head to the [LLD problem list](/lld) and start with the most-reported problems.*
