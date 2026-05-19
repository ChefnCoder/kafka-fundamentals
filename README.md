# kafka-fundamentals

A hands-on Kafka learning repo — covers core concepts and a working producer/consumer demo built with Node.js and Docker.

No fluff, no theory dumps. Just the stuff that actually helps you understand Kafka by running it yourself.

---

## What's inside

```
kafka-demo/
├── client.js       # base kafka connection (like db.js for mongo)
├── admin.js        # creates topics
├── producer.js     # sends messages via terminal input
├── consumer.js     # reads messages, supports consumer groups
└── docker-compose.yml
```

---

## Concepts covered

- Why Kafka exists and what problem it solves
- Brokers, Topics, Partitions, Offsets
- Producers and Consumers
- Consumer Groups → work-queue vs pub/sub pattern
- Partition rebalancing (live, when consumers join/leave)

---

## Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) + Docker Compose

---

## Getting started

**1. Clone the repo**
```bash
git clone https://github.com/your-username/kafka-fundamentals.git
cd kafka-fundamentals/kafka-demo
```

**2. Start Kafka (Docker)**
```bash
docker-compose up -d
```

Verify it's running:
```bash
docker ps
# you should see kafkademo with status "Up"
```

**3. Install dependencies**
```bash
npm install
```

**4. Create the topic**
```bash
node admin.js
# Topic created: rider-updates
```

---

## Running the demo

You'll need **3 terminals** open inside `kafka-demo/`.

**Terminal 1 — Start a consumer:**
```bash
node consumer.js group-1
```

**Terminal 2 — Start the producer:**
```bash
node producer.js
```

Type a message in this format:
```
RiderA north
RiderB south
```

Watch Terminal 1 receive the message instantly.

---

## Testing consumer groups

**Work-queue (same group, split load):**

Open 3 consumer terminals with the same group:
```bash
node consumer.js group-1   # terminal 1
node consumer.js group-1   # terminal 2
node consumer.js group-1   # terminal 3
```

With 2 partitions and 3 consumers → one consumer will be idle. Messages get split between the other two.

**Pub/Sub (different groups, each gets everything):**

```bash
node consumer.js group-1   # terminal 1
node consumer.js group-2   # terminal 2
```

Send a message from the producer — both terminals receive it independently.

---

## Stack

- **Runtime:** Node.js
- **Kafka client:** [kafkajs](https://kafka.js.org/)
- **Broker:** Apache Kafka (via Docker, KRaft mode — no ZooKeeper)

---

## Notes

- This uses **KRaft mode** (modern Kafka, no ZooKeeper dependency)
- Single broker setup — fine for local learning, not for production
- The `TimeoutNegativeWarning` from kafkajs on startup is a known cosmetic bug — ignore it
