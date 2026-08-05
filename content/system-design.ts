export type SystemDesignItem = {
  title: string;
  meaning: string;
  techniques: string[];
  components?: string[];
};

export type SystemDesignSection = {
  title: string;
  description: string;
  items: SystemDesignItem[];
};

export type SystemDesignModule = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  sections: SystemDesignSection[];
};

export const systemDesignCurriculum: SystemDesignModule[] = [
  {
    slug: "quality-attributes",
    title: "Quality Attributes",
    eyebrow: "Module 01 · What a good system must achieve",
    intro: "Start every design by naming the qualities that matter. A quality attribute states the goal, a technique explains how to reach it, and a component implements that technique.",
    sections: [
      {
        title: "Speed",
        description: "Make individual requests fast, sustain useful work, and use infrastructure efficiently.",
        items: [
          { title: "Latency", meaning: "How long one request takes from start to finish.", techniques: ["Caching", "Reduce network calls", "Database indexing", "Query optimization", "Asynchronous processing", "Compression"], components: ["Redis or Memcached", "CDN", "Database indexes", "Connection pool", "Message queue"] },
          { title: "Throughput", meaning: "How much work the system completes per second.", techniques: ["Parallel processing", "Horizontal scaling", "Batching", "Load balancing", "Non-blocking processing"], components: ["Load balancer", "Worker pool", "Message broker", "Service instances"] },
          { title: "Resource utilization", meaning: "How efficiently CPU, memory, connections, and network capacity are used.", techniques: ["Connection pooling", "Thread pooling", "Memory optimization", "Request batching", "Autoscaling"], components: ["Kubernetes", "Container runtime", "Profiler", "CPU and memory monitoring"] },
        ],
      },
      {
        title: "Growth",
        description: "Handle more users, traffic, and data without a redesign.",
        items: [
          { title: "Scalability", meaning: "Ability to serve increasing load.", techniques: ["Vertical and horizontal scaling", "Sharding", "Read replicas", "Partitioning", "Caching", "Stateless services"], components: ["Load balancer", "Service instances", "Database shards", "Read replicas", "API gateway"] },
          { title: "Elasticity", meaning: "Ability to increase or decrease resources as demand changes.", techniques: ["Automatic scale-out", "Automatic scale-in", "Scheduled scaling", "Metric-based scaling", "Queue-based scaling"], components: ["Kubernetes autoscaler", "AWS Auto Scaling", "Serverless functions", "Cloud monitoring"] },
        ],
      },
      {
        title: "Continuity",
        description: "Continue serving users and recover cleanly when dependencies or infrastructure fail.",
        items: [
          { title: "Availability", meaning: "The system remains accessible when users need it.", techniques: ["Redundancy", "Replication", "Health checks", "Automatic failover", "Multi-zone deployment"], components: ["Load balancer", "Multiple instances", "Primary-replica database", "DNS failover"] },
          { title: "Reliability", meaning: "The system repeatedly produces the correct result.", techniques: ["Retries", "Idempotency", "Validation", "Transactions", "Dead-letter handling"], components: ["Retry mechanism", "Idempotency store", "Transaction manager", "DLQ"] },
          { title: "Fault tolerance and resilience", meaning: "The system isolates failures, falls back safely, and recovers quickly.", techniques: ["Bulkheads", "Circuit breakers", "Timeouts", "Backoff", "Rate limiting", "Graceful degradation"], components: ["Service mesh", "Fallback service", "Independent worker pools", "Queue", "Rate limiter"] },
          { title: "Recoverability", meaning: "Restore data and service after a serious incident.", techniques: ["Backup and restore", "Point-in-time recovery", "Disaster recovery", "Recovery drills"], components: ["Snapshots", "Secondary region", "Replication service", "Backup storage"] },
        ],
      },
      {
        title: "Data Correctness",
        description: "Keep data valid, current enough for the product, and durable through failure.",
        items: [
          { title: "Consistency", meaning: "Users receive the correct expected version of data.", techniques: ["Transactions", "Distributed locking", "Consensus", "Quorum reads and writes", "Versioning", "Eventual consistency"], components: ["Relational database", "Distributed lock manager", "Consensus system", "Event stream"] },
          { title: "Integrity", meaning: "Data remains valid, complete, and uncorrupted.", techniques: ["Input and schema validation", "Constraints", "Referential integrity", "Checksums", "Deduplication"], components: ["Database constraints", "Schema registry", "Validation service", "Data-quality pipeline"] },
          { title: "Durability", meaning: "Saved data survives failures.", techniques: ["Replication", "Write-ahead logging", "Persistent storage", "Snapshots", "Backups"], components: ["Durable database", "Object storage", "Transaction log", "Replicated storage"] },
        ],
      },
      {
        title: "Protection",
        description: "Prevent unauthorized access, protect sensitive data, and meet obligations.",
        items: [
          { title: "Security", meaning: "Prevent unauthorized access and attacks.", techniques: ["Authentication", "Authorization", "Encryption", "Network isolation", "Input sanitization", "Secret management"], components: ["Identity provider", "API gateway", "WAF", "KMS", "Secret manager"] },
          { title: "Privacy", meaning: "Protect sensitive user information.", techniques: ["Masking", "Tokenization", "Anonymization", "Least privilege", "Data minimization", "Retention policies"], components: ["Access-control system", "Tokenization service", "Policy engine", "Data catalog"] },
          { title: "Compliance", meaning: "Follow legal, contractual, and organizational rules.", techniques: ["Audit logging", "Classification", "Retention enforcement", "Access reviews", "Reporting"], components: ["Audit-log store", "Governance platform", "Compliance dashboard", "DLP system"] },
        ],
      },
      {
        title: "Operations and Change",
        description: "Make the system easy to evolve, observe, test, deploy, and afford.",
        items: [
          { title: "Maintainability and extensibility", meaning: "Change the system safely as requirements grow.", techniques: ["Modular design", "Separation of concerns", "Clean interfaces", "Plugin architecture", "Loose coupling", "Event-driven design"], components: ["Source control", "Documentation platform", "API layer", "Event broker", "Configuration service"] },
          { title: "Testability", meaning: "Verify behaviour with fast, dependable feedback.", techniques: ["Dependency injection", "Mocking", "Automated testing", "Contract testing", "Test-data isolation"], components: ["Unit-test framework", "Mock server", "Test database", "CI pipeline"] },
          { title: "Observability", meaning: "Understand internal behaviour from logs, metrics, and traces.", techniques: ["Structured logging", "Metrics", "Distributed tracing", "Alerting", "Health checks", "Correlation IDs"], components: ["Log aggregation", "Prometheus or Datadog", "Tracing system", "Alert manager"] },
          { title: "Deployability and cost", meaning: "Release safely while meeting requirements without waste.", techniques: ["CI/CD", "Canary and blue-green releases", "Feature flags", "Rightsizing", "Autoscaling", "Storage tiering"], components: ["Deployment controller", "Container registry", "Kubernetes", "Cost dashboard", "Serverless platform"] },
        ],
      },
    ],
  },
  {
    slug: "calculations-and-measurements",
    title: "Calculations & Measurements",
    eyebrow: "Module 02 · Estimation and SRE foundations",
    intro: "Use a few repeatable calculations to size traffic, storage, compute, queues, and reliability targets before choosing architecture.",
    sections: [
      {
        title: "Traffic and Capacity",
        description: "Turn users and requests into a peak load your services can handle.",
        items: [
          { title: "Traffic", meaning: "Average RPS = requests per day ÷ 86,400. Peak RPS = average RPS × peak factor.", techniques: ["Split total RPS into reads and writes", "Estimate concurrent requests as RPS × average response time", "Apply an explicit peak factor"] },
          { title: "Server capacity", meaning: "Required servers = peak RPS ÷ RPS handled by one server.", techniques: ["Add a safety buffer for failure and spikes", "Measure CPU and memory utilization", "Convert completed operations ÷ time into throughput"] },
        ],
      },
      {
        title: "Storage, Memory, and Network",
        description: "Size data and movement costs before selecting databases and infrastructure.",
        items: [
          { title: "Storage", meaning: "Daily storage = records per day × average record size; retention storage = daily storage × retention days.", techniques: ["Multiply raw storage by replication factor", "Include index and metadata overhead", "Plan backup copies and database growth"] },
          { title: "Memory and cache", meaning: "Request memory = concurrent requests × memory per request; cache memory = objects × average object size.", techniques: ["Include application, OS, and safety-buffer memory", "Track cache hit and miss ratios", "Calculate database RPS after cache misses"] },
          { title: "Bandwidth", meaning: "Bandwidth = RPS × average payload size; bits per second = bytes per second × 8.", techniques: ["Size ingress from writes", "Size egress from reads", "Convert per-second transfer into daily transfer"] },
        ],
      },
      {
        title: "Latency and Reliability",
        description: "Measure user experience and the risk of downtime.",
        items: [
          { title: "Latency", meaning: "End-to-end latency combines network, application, database, external API, and queue time.", techniques: ["Sum sequential calls", "Use the slowest branch for parallel calls", "Track average, P95, and P99 latency"] },
          { title: "Availability and reliability", meaning: "Availability = uptime ÷ total time. Also reason with MTBF, MTTR, error rate, and success rate.", techniques: ["Calculate downtime allowed by the availability target", "Compare sequential dependencies with redundant components", "Define and monitor SLI, SLO, SLA, and error budget"] },
          { title: "Correctness and recovery", meaning: "Measure stale reads, replication lag, data-loss rate, RPO, and RTO.", techniques: ["Set backup interval at or below RPO", "Verify recovery time is within RTO", "Track consistency windows and conflict rate"] },
        ],
      },
      {
        title: "Databases, Queues, and Limits",
        description: "Size high-contention components with simple operational formulas.",
        items: [
          { title: "Database", meaning: "Required write/read throughput comes from peak request RPS × writes/reads per request.", techniques: ["Estimate read replicas from total read RPS ÷ replica capacity", "Estimate shards from data or traffic ÷ capacity per shard", "Track connection utilization"] },
          { title: "Queues", meaning: "Queue growth = producer rate − consumer rate; drain time = backlog ÷ drain rate.", techniques: ["Size consumer count from producer rate ÷ one consumer capacity", "Track queue waiting time", "Use backlog as a scaling signal"] },
          { title: "Rate limiting", meaning: "Allowed RPS per user = request limit ÷ window seconds.", techniques: ["Calculate total possible traffic from active users", "Track rejected request rate", "Derive token refill rate for token buckets"] },
        ],
      },
    ],
  },
  {
    slug: "system-design-patterns",
    title: "System Design Patterns",
    eyebrow: "Module 03 · Reusable architectural solutions",
    intro: "Map the problem to a pattern, then name the components that implement it. Patterns make design decisions explainable and reusable.",
    sections: [
      { title: "Scalability and Performance", description: "Distribute traffic, data, and expensive work.", items: [
        { title: "Scalability patterns", meaning: "Increase capacity or spread data and traffic across independent units.", techniques: ["Horizontal and vertical scaling", "Load balancing", "Stateless services", "Sharding", "Partitioning", "Read replicas", "Autoscaling"], components: ["NGINX or ALB", "Service instances", "Database shards", "Kubernetes HPA"] },
        { title: "Performance patterns", meaning: "Avoid unnecessary work on the request path.", techniques: ["Caching", "Cache-aside", "Write-through and write-behind", "CDN", "Batching", "Connection pooling", "Asynchronous processing"], components: ["Redis", "Memcached", "CDN", "Queue", "Worker"] },
      ] },
      { title: "Resilience and Data Consistency", description: "Contain failures and preserve the integrity of important changes.", items: [
        { title: "Reliability patterns", meaning: "Handle temporary failure without cascading problems.", techniques: ["Retry", "Exponential backoff", "Timeout", "Circuit breaker", "Bulkhead", "Fallback", "Graceful degradation", "Failover"], components: ["Resilience4j", "Service mesh", "Fallback cache", "Health probes"] },
        { title: "Consistency patterns", meaning: "Coordinate concurrent or distributed changes at the right cost.", techniques: ["Transactions", "Two-phase commit", "Saga", "Eventual consistency", "Optimistic and pessimistic locking", "Quorum", "Consensus", "Idempotency"], components: ["Relational DB", "Transaction coordinator", "Event broker", "Raft or Paxos", "Idempotency store"] },
      ] },
      { title: "Events and Communication", description: "Decouple services and choose how they exchange work.", items: [
        { title: "Messaging patterns", meaning: "Move work and events independently of synchronous request timing.", techniques: ["Message queue", "Publish-subscribe", "Event-driven architecture", "Event sourcing", "CQRS", "DLQ", "Competing consumers", "Outbox", "Consumer idempotency"], components: ["Kafka", "RabbitMQ", "SQS", "SNS", "Worker pool"] },
        { title: "Service communication", meaning: "Route, discover, and coordinate service-to-service calls.", techniques: ["API gateway", "Backend for frontend", "Service discovery", "Service mesh", "Proxy", "Sidecar", "Aggregator", "Request-response", "Fire-and-forget"], components: ["Kong", "Envoy", "Consul", "Kubernetes DNS", "Istio"] },
      ] },
      { title: "Release, Security, and Operations", description: "Ship safely, protect access, and understand production behaviour.", items: [
        { title: "Deployment patterns", meaning: "Release changes with controlled risk.", techniques: ["Rolling", "Blue-green", "Canary", "Feature flags", "Shadow deployment", "Immutable infrastructure", "Strangler pattern"], components: ["Kubernetes Deployment", "Argo Rollouts", "Terraform", "LaunchDarkly"] },
        { title: "Security patterns", meaning: "Verify identity and protect traffic, data, and credentials.", techniques: ["Authentication", "Authorization", "Token security", "Least privilege", "Zero trust", "Secrets management", "Encryption", "Rate limiting", "WAF"], components: ["OAuth or OIDC", "JWT", "IAM", "Vault", "KMS", "API gateway"] },
        { title: "Observability patterns", meaning: "Make an incident explainable from system evidence.", techniques: ["Centralized logging", "Metrics", "Distributed tracing", "Correlation ID", "Health monitoring", "Alerting", "Audit logging"], components: ["ELK", "Prometheus", "OpenTelemetry", "Jaeger", "PagerDuty"] },
        { title: "Architecture styles", meaning: "Choose a top-level structure that matches complexity and change rate.", techniques: ["Layered architecture", "Monolith", "Modular monolith", "Microservices", "Event-driven", "Serverless", "Hexagonal", "Clean architecture", "Pipe-and-filter", "Peer-to-peer"] },
      ] },
    ],
  },
  {
    slug: "interview-questions",
    title: "Interview Questions",
    eyebrow: "Module 04 · Practice by pattern and domain",
    intro: "Use a deliberate progression: learn the recurring patterns first, then apply them through domains and progressively harder system designs.",
    sections: [
      { title: "Recommended Starting Sequence", description: "A progression from common interview foundations to distributed systems.", items: [
        { title: "Beginner", meaning: "Build the vocabulary with small, focused systems.", techniques: ["URL shortener", "Rate limiter", "Notification service", "File-storage service"] },
        { title: "Intermediate", meaning: "Combine multiple components and trade-offs.", techniques: ["Chat application", "News feed", "Ticket booking", "Job scheduler"] },
        { title: "Advanced and expert", meaning: "Reason about correctness, distribution, and operational scale.", techniques: ["Payment system", "Kafka", "Distributed database", "Uber", "YouTube", "Workflow engine"] },
      ] },
      { title: "High-Traffic and Communication", description: "Practice systems that emphasize scale, fan-out, and real-time delivery.", items: [
        { title: "Scalability systems", meaning: "Use caching, sharding, and asynchronous processing under large demand.", techniques: ["URL shortener", "Twitter/X", "Instagram", "YouTube", "TikTok", "News feed", "Search engine", "E-commerce platform", "Ticket booking"] },
        { title: "Messaging systems", meaning: "Deliver messages correctly under disconnections and changing membership.", techniques: ["WhatsApp", "Slack", "Email service", "Notification service", "Push notifications", "Group messaging", "Video conferencing"] },
      ] },
      { title: "Storage, Data, and Events", description: "Practice durable data systems and the pipelines that feed them.", items: [
        { title: "Storage and caching", meaning: "Store files or hot data reliably and economically.", techniques: ["Google Drive", "Dropbox", "Distributed file system", "Photo storage", "Backup system", "Distributed cache", "Redis-like system", "CDN"] },
        { title: "Databases and streaming", meaning: "Balance consistency, availability, and event volume.", techniques: ["Distributed database", "Key-value store", "Time-series database", "Ledger", "Payment system", "Kafka", "Event bus", "Clickstream", "Analytics pipeline", "Fraud detection"] },
      ] },
      { title: "Domain Practice", description: "Use business context to choose patterns rather than memorizing components.", items: [
        { title: "Booking and financial systems", meaning: "Test locking, reservation expiry, idempotency, and reconciliation.", techniques: ["BookMyShow", "Airline and hotel booking", "Appointment scheduling", "Payment gateway", "Digital wallet", "Banking ledger", "Stock trading"] },
        { title: "Location and delivery", meaning: "Test real-time state, geospatial indexing, dispatch, and pricing.", techniques: ["Uber", "Ola", "Google Maps", "Food delivery", "Nearby places", "Delivery tracking"] },
        { title: "Search, recommendations, and monitoring", meaning: "Test indexes, ranking, aggregation, and observability pipelines.", techniques: ["Autocomplete", "Product search", "Recommendation system", "Trending topics", "Logging system", "Metrics platform", "Distributed tracing", "Alerting"] },
      ] },
    ],
  },
];
