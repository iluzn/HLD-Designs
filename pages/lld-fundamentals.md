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

### Strategy (most important)

**What:** Interchangeable algorithms behind one interface.
**When:** Pricing, eviction, scoring, assignment, routing, split calculation.
**Shape:**
```java
interface ScoringStrategy { int score(Submission s); }
class TimeBasedScoring implements ScoringStrategy { ... }
class DifficultyScoring implements ScoringStrategy { ... }
```
**Used in:** Almost every machine-coding problem has a place for Strategy.

### State

**What:** Object changes behavior based on internal state. Each state is its own class.
**When:** Orders (PLACED → CONFIRMED → SHIPPED), ATM sessions, vending machines, game phases.
**Shape:**
```java
interface OrderState {
    void next(Order ctx);
    void cancel(Order ctx);
}
class PlacedState implements OrderState { ... }
class ShippedState implements OrderState { ... }
```

### Observer

**What:** Subject notifies registered listeners on state change.
**When:** Leaderboards, item availability, notifications, scorecards.
**Shape:**
```java
interface Listener { void onEvent(Event e); }
class Leaderboard implements Listener { ... }
subject.subscribe(leaderboard);
```

### Decorator

**What:** Wrap an object to add behavior without changing its class.
**When:** Stacked pricing layers, logging wrappers, caching around a service.
**Shape:**
```java
interface Coffee { int cost(); }
class Espresso implements Coffee { int cost() { return 100; } }
class MilkDecorator implements Coffee {
    Coffee base;
    int cost() { return base.cost() + 20; }
}
```

### Composite

**What:** Treat single objects and groups uniformly via one interface.
**When:** Menu trees (category → subcategory → item), file systems, project/task/subtask.
**Shape:**
```java
interface MenuNode { int getPrice(); }
class Item implements MenuNode { ... }
class Category implements MenuNode {
    List<MenuNode> children;
    int getPrice() { return children.stream().mapToInt(MenuNode::getPrice).sum(); }
}
```

### Factory

**What:** Centralize object creation. Caller gets an interface, not a concrete type.
**When:** Creating tasks/commands by type, payment gateway adapters by provider.
**Shape:**
```java
static PaymentGateway create(String provider) {
    return switch (provider) {
        case "razorpay" -> new RazorpayAdapter();
        case "stripe"   -> new StripeAdapter();
        default -> throw new IllegalArgumentException(provider);
    };
}
```

### Adapter

**What:** Bridge between incompatible interfaces.
**When:** Wrapping external APIs (payment gateways, notification channels) behind a common internal interface.
**Shape:**
```java
interface NotificationChannel { void send(String to, String body); }
class TwilioAdapter implements NotificationChannel {
    void send(String to, String body) { twilioClient.messages().create(...); }
}
```

### Facade

**What:** One simple entry point over a complex subsystem.
**When:** Your `XxxService` class that orchestrates multiple internal classes. The Demo/main calls only the facade.
**Shape:** `Broker.publish(...)` hides `Topic`, `ConsumerGroup`, `InFlightTracker`, etc.

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
