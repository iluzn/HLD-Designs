const fs = require('fs');
const path = require('path');

const HLD_DIR = path.join(__dirname, 'content/hld');
const SKIP_FILES = ['URLShortner.md'];

// Well-known tech that's OK to keep in labels
const WELL_KNOWN = ['Redis', 'Kafka', 'Postgres', 'PostgreSQL', 'Elasticsearch', 'S3', 'DynamoDB', 'WebSocket', 'CDN', 'MongoDB', 'Cassandra'];

// Uncommon vendors to remove
const UNCOMMON_VENDORS = [
  'Kong', 'Apigee', 'Cloudflare', 'CloudFront', 'Fastly', 'ElastiCache',
  'Kubernetes', 'Fargate', 'ScyllaDB', 'Spanner', 'CockroachDB', 'Upstash',
  'Valkey', 'Kinesis', 'Flink', 'ClickHouse', 'Pinot', 'Druid', 'Timestream',
  'Vitess', 'Confluent', 'Nomad', 'Pulsar', 'ksqlDB', 'Materialize',
  'GCS', 'Azure Blob', 'Solr', 'OpenSearch', 'Cadence'
];

function cleanNodeLabel(label) {
  let cleaned = label;
  
  // Exact pattern replacements (ordered - most specific first)
  const rewrites = [
    [/API Gateway<br\/>Kong Apigee or AWS/gi, 'API Gateway'],
    [/API Gateway<br\/>\s*Kong or Envoy/gi, 'API Gateway'],
    [/API Gateway<br\/>\s*Kong/gi, 'API Gateway'],
    [/CDN [Ee]dge<br\/>Cloudflare CloudFront Fastly/gi, 'CDN Edge'],
    [/CDN [Ee]dge<br\/>Cloudflare CloudFront or Fastly/gi, 'CDN Edge'],
    [/CDN<br\/>Cloudflare or CloudFront/gi, 'CDN'],
    [/CDN<br\/>CloudFront/gi, 'CDN'],
    [/Redis [Cc]ache<br\/>ElastiCache or self[ -]?hosted/gi, 'Redis Cache'],
    [/Redis<br\/>ElastiCache or self[ -]?hosted/gi, 'Redis'],
    [/Redis [Cc]ache<br\/>ElastiCache/gi, 'Redis Cache'],
    [/Global KV<br\/>DynamoDB Cassandra or Spanner/gi, 'Database'],
    [/Global KV<br\/>DynamoDB or Cassandra/gi, 'Database'],
    [/KV Store<br\/>DynamoDB or Cassandra/gi, 'Database'],
    [/Event [Bb]us<br\/>Kafka or Kinesis/gi, 'Kafka'],
    [/Event [Bb]us<br\/>Kafka/gi, 'Kafka'],
    [/Kafka<br\/>MSK or Confluent/gi, 'Kafka'],
    [/Kafka<br\/>MSK/gi, 'Kafka'],
    [/Stream [Pp]rocessor<br\/>Flink or Kafka Streams/gi, 'Stream Processor'],
    [/Stream [Pp]rocessor<br\/>Flink/gi, 'Stream Processor'],
    [/Object [Ss]tor(age|e)<br\/>S3 or GCS/gi, 'Object Storage'],
    [/Blob [Ss]tore<br\/>S3 or GCS/gi, 'Object Storage'],
    [/S3<br\/>or GCS/gi, 'S3'],
    [/Serving [Ss]tore<br\/>ClickHouse or Pinot/gi, 'Analytics Store'],
    [/Analytics [Ss]tore<br\/>ClickHouse or Pinot/gi, 'Analytics Store'],
    [/Analytics<br\/>ClickHouse or Pinot/gi, 'Analytics Store'],
    [/OLAP<br\/>ClickHouse or Pinot/gi, 'Analytics Store'],
    [/OLAP [Ss]tore<br\/>ClickHouse/gi, 'Analytics Store'],
    [/Write [Ss]ervice<br\/>Kubernetes or Fargate/gi, 'Write Service'],
    [/Service<br\/>Kubernetes or Fargate/gi, 'Service'],
    [/Search<br\/>Elasticsearch or Solr/gi, 'Elasticsearch'],
    [/Elasticsearch<br\/>or OpenSearch/gi, 'Elasticsearch'],
    [/Temporal<br\/>or Cadence/gi, 'Temporal'],
    [/Workflow<br\/>Temporal or Cadence/gi, 'Workflow Engine'],
    [/Queue<br\/>SQS or RabbitMQ/gi, 'Message Queue'],
    [/Message Queue<br\/>SQS or RabbitMQ/gi, 'Message Queue'],
    [/MQ<br\/>RabbitMQ or SQS/gi, 'Message Queue'],
  ];
  
  for (const [regex, replacement] of rewrites) {
    cleaned = cleaned.replace(regex, replacement);
  }
  
  // Handle standalone uncommon vendor names used as the entire label
  // e.g., ClickHouse -> Analytics Store, Flink Aggregator -> Stream Aggregator
  const standaloneRewrites = [
    [/^ClickHouse$/i, 'Analytics Store'],
    [/^Flink Aggregator$/i, 'Stream Aggregator'],
    [/^Flink$/i, 'Stream Processor'],
    [/^Kinesis$/i, 'Event Stream'],
    [/^Spanner$/i, 'Database'],
    [/^CockroachDB$/i, 'Database'],
    [/^ScyllaDB$/i, 'Database'],
    [/^Vitess$/i, 'Database'],
  ];
  
  for (const [regex, replacement] of standaloneRewrites) {
    cleaned = cleaned.replace(regex, replacement);
  }
  
  // Handle "SomeName Vitess" -> "SomeName"  
  cleaned = cleaned.replace(/\s+Vitess\b/gi, '');
  
  // Handle "ClickHouse<br/>something" -> "Analytics Store<br/>something"
  cleaned = cleaned.replace(/^ClickHouse(<br\/>)/i, 'Analytics Store$1');
  
  // Handle "Flink<br/>something" -> "Stream Processor<br/>something"  
  cleaned = cleaned.replace(/^Flink(<br\/>)/i, 'Stream Processor$1');
  
  // Generic cleanup: if label has <br/> with "or" + vendor names that aren't well-known
  const brMatch = cleaned.match(/^(.+?)<br\/>(.+)$/i);
  if (brMatch) {
    const role = brMatch[1].trim();
    const vendorPart = brMatch[2].trim();
    
    const hasOr = /\bor\b/i.test(vendorPart);
    const hasSlash = vendorPart.includes('/');
    
    if (hasOr || hasSlash) {
      // Check if all words after <br/> are vendor names
      const words = vendorPart.split(/[\s,]+/).filter(w => w.length > 1 && w !== 'or' && w !== 'and');
      const hasUncommon = words.some(w => UNCOMMON_VENDORS.some(v => v.toLowerCase() === w.toLowerCase()));
      
      if (hasUncommon) {
        // Check if one well-known name exists - keep it
        const wellKnownFound = words.find(w => WELL_KNOWN.some(wk => wk.toLowerCase() === w.toLowerCase()));
        if (wellKnownFound) {
          cleaned = `${role}<br/>${wellKnownFound}`;
        } else {
          cleaned = role;
        }
      }
    }
  }
  
  // Final cleanup
  cleaned = cleaned.replace(/<br\/>\s*$/i, '').trim();
  cleaned = cleaned.replace(/\s{2,}/g, ' ');
  
  return cleaned;
}

// Check if a diagram section is "Naive First Cut"
function isNaiveDiagram(contextBefore) {
  const text = contextBefore.slice(-20).join('\n').toLowerCase();
  return text.includes('naive first cut') || text.includes('naive first-cut') || text.includes('30-second whiteboard');
}

function isFlowchart(block) {
  return /flowchart\s+(LR|TD|TB|RL|BT)/i.test(block);
}

// Generate short descriptive label based on source and target node labels
function generateLabel(srcLabel, tgtLabel, srcId, tgtId, counter) {
  const src = (srcLabel || srcId).toLowerCase();
  const tgt = (tgtLabel || tgtId).toLowerCase();
  
  // Helper to check if a string contains any of the patterns
  const has = (s, ...pats) => pats.some(p => s.includes(p));
  
  // ---- Source is Client/User/App ----
  if (has(src, 'client', 'user', 'player', 'browser', 'app', 'mobile', 'rider', 'driver', 'sender', 'viewer', 'customer', 'merchant', 'buyer', 'seller', 'author', 'member')) {
    if (has(tgt, 'gateway', 'gw', 'edge', 'cdn', 'lb', 'load balancer', 'waf')) return `${counter}. Send request`;
    if (has(tgt, 'websocket', 'ws')) return `${counter}. Connect`;
    if (has(tgt, 'api', 'service')) return `${counter}. API call`;
    if (has(tgt, 'cache', 'redis')) return `${counter}. Read cache`;
    return `${counter}. Send request`;
  }
  
  // ---- Source is Edge/CDN/LB/Gateway ----
  if (has(src, 'edge', 'cdn', 'waf', 'lb', 'load balancer')) {
    if (has(tgt, 'gateway', 'gw')) return `${counter}. Forward`;
    if (has(tgt, 'service', 'api', 'backend')) return `${counter}. Route request`;
    if (has(tgt, 'origin', 'storage', 's3')) return `${counter}. Fetch origin`;
    if (has(tgt, 'client', 'user', 'player', 'rider', 'viewer')) return `${counter}. Return response`;
    return `${counter}. Forward`;
  }
  
  if (has(src, 'gateway', 'gw')) {
    if (has(tgt, 'service', 'api', 'backend', 'rate', 'rl', 'auth')) return `${counter}. Route request`;
    if (has(tgt, 'client', 'user')) return `${counter}. Return response`;
    if (has(tgt, 'redis', 'cache')) return `${counter}. Check limit`;
    return `${counter}. Forward`;
  }
  
  // ---- Source is a Service/API/Worker ----
  if (has(src, 'service', 'api', 'server', 'worker', 'processor', 'handler', 'orchestrat', 'coordinator', 'resolver', 'scheduler', 'ingest', 'aggregat', 'dispatcher', 'router', 'manager', 'controller', 'engine')) {
    if (has(tgt, 'redis', 'cache', 'memcache')) {
      if (has(src, 'write', 'ingest', 'update')) return `${counter}. Write cache`;
      return `${counter}. Check cache`;
    }
    if (has(tgt, 'db', 'database', 'postgres', 'mysql', 'dynamo', 'mongo', 'store', 'ledger', 'catalog', 'cassandra')) {
      if (has(src, 'read', 'query', 'fetch')) return `${counter}. Read DB`;
      if (has(src, 'write', 'ingest', 'persist')) return `${counter}. Write DB`;
      return `${counter}. Query DB`;
    }
    if (has(tgt, 'kafka', 'queue', 'event', 'stream', 'mq', 'rabbit', 'sqs', 'bus', 'topic')) return `${counter}. Emit event`;
    if (has(tgt, 's3', 'blob', 'object', 'storage', 'bucket', 'media')) return `${counter}. Store file`;
    if (has(tgt, 'elastic', 'search', 'solr', 'index')) return `${counter}. Update index`;
    if (has(tgt, 'notification', 'push', 'email', 'sms', 'fcm', 'apns')) return `${counter}. Send notification`;
    if (has(tgt, 'websocket', 'ws', 'sse', 'push')) return `${counter}. Push update`;
    if (has(tgt, 'client', 'user', 'player', 'rider', 'viewer', 'sender', 'receiver', 'member', 'subscriber')) return `${counter}. Return response`;
    if (has(tgt, 'service', 'api', 'worker', 'processor', 'handler')) return `${counter}. Call service`;
    if (has(tgt, 'analytics', 'metrics', 'olap', 'warehouse', 'dwh')) return `${counter}. Write metrics`;
    if (has(tgt, 'external', 'bank', 'provider', 'vendor', 'partner', 'third', 'payment', 'gateway')) return `${counter}. Call external`;
    if (has(tgt, 'geo', 'location', 'map')) return `${counter}. Query location`;
    if (has(tgt, 'ml', 'model', 'inference', 'rank', 'recommend')) return `${counter}. Get prediction`;
    return `${counter}. Process`;
  }
  
  // ---- Source is Kafka/Queue/Event Bus ----
  if (has(src, 'kafka', 'queue', 'event', 'stream', 'mq', 'rabbit', 'sqs', 'bus', 'topic')) {
    if (has(tgt, 'consumer', 'worker', 'processor', 'aggregat', 'service', 'handler', 'fan', 'subscriber', 'notif', 'engine')) return `${counter}. Consume event`;
    if (has(tgt, 'flink', 'spark', 'stream proc')) return `${counter}. Stream events`;
    if (has(tgt, 'db', 'store', 'warehouse', 'analytics', 's3', 'lake')) return `${counter}. Sink data`;
    if (has(tgt, 'websocket', 'ws')) return `${counter}. Fan out`;
    return `${counter}. Consume event`;
  }
  
  // ---- Source is Redis/Cache ----
  if (has(src, 'redis', 'cache')) {
    if (has(tgt, 'service', 'api', 'client', 'worker')) return `${counter}. Return cached`;
    if (has(tgt, 'kafka', 'queue', 'stream', 'event')) return `${counter}. Publish change`;
    return `${counter}. Return data`;
  }
  
  // ---- Source is DB/Store ----
  if (has(src, 'db', 'database', 'postgres', 'dynamo', 'mongo', 'store', 'cassandra', 'ledger')) {
    if (has(tgt, 'cdc', 'change', 'debezium')) return `${counter}. CDC stream`;
    if (has(tgt, 'kafka', 'queue', 'stream', 'event')) return `${counter}. Change events`;
    if (has(tgt, 'service', 'api', 'worker')) return `${counter}. Return data`;
    return `${counter}. Return data`;
  }
  
  // ---- Source is CDC/Debezium ----
  if (has(src, 'cdc', 'debezium', 'change')) {
    if (has(tgt, 'kafka', 'queue', 'stream', 'event')) return `${counter}. Stream changes`;
    if (has(tgt, 'elastic', 'search', 'index')) return `${counter}. Sync index`;
    if (has(tgt, 'cache', 'redis')) return `${counter}. Invalidate cache`;
    return `${counter}. Propagate change`;
  }
  
  // ---- Source is WebSocket/Push ----
  if (has(src, 'websocket', 'ws', 'push', 'sse')) {
    if (has(tgt, 'client', 'user', 'player', 'rider', 'viewer', 'member', 'receiver', 'subscriber')) return `${counter}. Push update`;
    return `${counter}. Deliver`;
  }
  
  // ---- Source is Notification ----
  if (has(src, 'notification', 'push', 'email', 'sms', 'alert')) {
    if (has(tgt, 'client', 'user', 'device', 'mobile', 'player')) return `${counter}. Deliver`;
    if (has(tgt, 'fcm', 'apns', 'provider')) return `${counter}. Send push`;
    return `${counter}. Notify`;
  }
  
  // ---- Source is Scheduler/Cron/Timer ----
  if (has(src, 'scheduler', 'cron', 'timer', 'trigger')) {
    if (has(tgt, 'worker', 'queue', 'job', 'service', 'executor')) return `${counter}. Trigger job`;
    return `${counter}. Schedule`;
  }
  
  // ---- Source is Analytics/OLAP ----
  if (has(src, 'analytics', 'olap', 'warehouse', 'dwh', 'metrics')) {
    return `${counter}. Query analytics`;
  }
  
  // ---- Source is S3/Object Storage ----
  if (has(src, 's3', 'blob', 'object stor', 'media', 'bucket')) {
    if (has(tgt, 'cdn', 'edge')) return `${counter}. Serve content`;
    if (has(tgt, 'service', 'worker', 'processor')) return `${counter}. Read file`;
    return `${counter}. Serve content`;
  }
  
  // ---- Source is External/Bank/Provider ----
  if (has(src, 'external', 'bank', 'provider', 'vendor', 'partner', 'third')) {
    if (has(tgt, 'service', 'api', 'webhook', 'gateway')) return `${counter}. Webhook callback`;
    return `${counter}. Respond`;
  }
  
  // ---- Source is Search/Elasticsearch ----
  if (has(src, 'elastic', 'search', 'index')) {
    return `${counter}. Return results`;
  }
  
  // ---- Source is ML/Model ----
  if (has(src, 'ml', 'model', 'inference', 'rank', 'recommend')) {
    return `${counter}. Return prediction`;
  }
  
  // ---- Source is a Flink/Stream Aggregator ----
  if (has(src, 'flink', 'aggregat', 'stream proc')) {
    if (has(tgt, 'db', 'store', 'redis', 'cache', 'analytics', 's3')) return `${counter}. Write results`;
    if (has(tgt, 'kafka', 'topic', 'stream')) return `${counter}. Emit result`;
    return `${counter}. Aggregate`;
  }
  
  // ---- Source is Rate Limiter ----
  if (has(src, 'rate', 'limiter', 'rl')) {
    if (has(tgt, 'redis', 'cache')) return `${counter}. Check quota`;
    if (has(tgt, 'analytics', 'kafka', 'log')) return `${counter}. Log event`;
    return `${counter}. Check limit`;
  }
  
  // ---- Fallback based on target ----
  if (has(tgt, 'redis', 'cache')) return `${counter}. Update cache`;
  if (has(tgt, 'kafka', 'queue', 'event', 'mq')) return `${counter}. Emit event`;
  if (has(tgt, 'db', 'database', 'store', 'postgres', 'dynamo')) return `${counter}. Persist data`;
  if (has(tgt, 'service', 'api')) return `${counter}. Call service`;
  if (has(tgt, 'client', 'user', 'player')) return `${counter}. Return response`;
  
  return `${counter}. Process`;
}

// Process a single file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  let result = [];
  let i = 0;
  
  while (i < lines.length) {
    if (lines[i].trim() === '```mermaid') {
      // Collect mermaid block
      const blockLines = [lines[i]];
      i++;
      while (i < lines.length && lines[i].trim() !== '```') {
        blockLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        blockLines.push(lines[i]);
        i++;
      }
      
      const blockContent = blockLines.join('\n');
      
      // Only process flowcharts
      if (!isFlowchart(blockContent)) {
        result.push(...blockLines);
        continue;
      }
      
      // Check if naive
      const contextBefore = result.slice(-20);
      const isNaive = isNaiveDiagram(contextBefore);
      
      // Process
      const processed = processFlowchart(blockLines, isNaive);
      result.push(...processed);
    } else {
      result.push(lines[i]);
      i++;
    }
  }
  
  return result.join('\n');
}

function processFlowchart(blockLines, isNaive) {
  // First pass: extract node labels
  const nodes = {}; // id -> cleaned label
  
  // Clean node labels
  const cleaned = blockLines.map(line => {
    // Match various node definition patterns
    let match;
    
    // ID["Label"]:::class
    match = line.match(/^(\s*\w+)\["([^"]*)"\](:::.*)?$/);
    if (match) {
      const id = match[1].trim();
      const label = match[2];
      const cls = match[3] || '';
      const cleanedLabel = cleanNodeLabel(label);
      nodes[id] = cleanedLabel;
      return `${match[1]}["${cleanedLabel}"]${cls}`;
    }
    
    // ID[("Label")]:::class  (cylinder)
    match = line.match(/^(\s*\w+)\[\("([^"]*)"\)\](:::.*)?$/);
    if (match) {
      const id = match[1].trim();
      const label = match[2];
      const cls = match[3] || '';
      const cleanedLabel = cleanNodeLabel(label);
      nodes[id] = cleanedLabel;
      return `${match[1]}[("${cleanedLabel}")]${cls}`;
    }
    
    // ID(["Label"]):::class  (stadium)
    match = line.match(/^(\s*\w+)\(\["([^"]*)"\]\)(:::.*)?$/);
    if (match) {
      const id = match[1].trim();
      const label = match[2];
      const cls = match[3] || '';
      const cleanedLabel = cleanNodeLabel(label);
      nodes[id] = cleanedLabel;
      return `${match[1]}(["${cleanedLabel}"])${cls}`;
    }
    
    // ID{"Label"}:::class  (diamond)
    match = line.match(/^(\s*\w+)\{"([^"]*)"\}(:::.*)?$/);
    if (match) {
      const id = match[1].trim();
      const label = match[2];
      const cls = match[3] || '';
      const cleanedLabel = cleanNodeLabel(label);
      nodes[id] = cleanedLabel;
      return `${match[1]}{"${cleanedLabel}"}${cls}`;
    }
    
    // Also catch node defs that are on same line as something else (less common)
    // Just extract labels for reference
    const inlineNodeDef = line.match(/(\w+)\["([^"]*)"\]/g);
    if (inlineNodeDef) {
      for (const nd of inlineNodeDef) {
        const m = nd.match(/(\w+)\["([^"]*)"\]/);
        if (m) {
          nodes[m[1]] = cleanNodeLabel(m[2]);
        }
      }
    }
    const inlineCylinder = line.match(/(\w+)\[\("([^"]*)"\)\]/g);
    if (inlineCylinder) {
      for (const nd of inlineCylinder) {
        const m = nd.match(/(\w+)\[\("([^"]*)"\)\]/);
        if (m) {
          nodes[m[1]] = cleanNodeLabel(m[2]);
        }
      }
    }
    
    return line;
  });
  
  // If naive, just return with cleaned node labels (no edge labels)
  if (isNaive) return cleaned;
  
  // Second pass: add numbered labels to edges
  let counter = 1;
  const result = cleaned.map(line => {
    // Skip non-edge lines
    if (line.trim().startsWith('```') ||
        /^\s*flowchart\s/i.test(line) ||
        line.trim().startsWith('classDef') ||
        line.trim().startsWith('class ') ||
        line.trim() === 'end' ||
        line.trim().startsWith('%%') ||
        line.trim().startsWith('subgraph') ||
        line.trim() === '') {
      return line;
    }
    
    // Check for node definition lines (no arrow)
    if (!line.includes('-->') && !line.includes('-.->') && !line.includes('==>') && !line.includes('--->')) {
      return line;
    }
    
    // Edge with existing label: ID -->|"label"| ID
    const labeledEdge = line.match(/^(\s*)(\w+)\s*(-->|---->|----->|-\.->|-.->|==>)\|"([^"]*)"\|\s*(\w+)(.*)$/);
    if (labeledEdge) {
      const [, indent, src, arrow, existingLabel, tgt, rest] = labeledEdge;
      // If already numbered, keep it and advance counter
      if (/^\d+\./.test(existingLabel)) {
        const num = parseInt(existingLabel.match(/^(\d+)\./)[1]);
        if (num >= counter) counter = num + 1;
        return line;
      }
      // Has a label but no number - add number prefix
      if (existingLabel.trim()) {
        const newLabel = `${counter}. ${existingLabel.trim().charAt(0).toUpperCase() + existingLabel.trim().slice(1)}`;
        counter++;
        return `${indent}${src} ${arrow}|"${newLabel}"| ${tgt}${rest}`;
      }
      // Empty label - generate one
      const label = generateLabel(nodes[src] || src, nodes[tgt] || tgt, src, tgt, counter);
      counter++;
      return `${indent}${src} ${arrow}|"${label}"| ${tgt}${rest}`;
    }
    
    // Edge without label: ID --> ID
    const unlabeledEdge = line.match(/^(\s*)(\w+)\s*(-->|---->|----->|-\.->|-.->|==>)\s*(\w+)(.*)$/);
    if (unlabeledEdge && !line.includes('|"')) {
      const [, indent, src, arrow, tgt, rest] = unlabeledEdge;
      const label = generateLabel(nodes[src] || src, nodes[tgt] || tgt, src, tgt, counter);
      counter++;
      return `${indent}${src} -->|"${label}"| ${tgt}${rest}`;
    }
    
    return line;
  });
  
  return result;
}

// Main
const files = fs.readdirSync(HLD_DIR)
  .filter(f => f.endsWith('.md') && !SKIP_FILES.includes(f));

console.log(`Processing ${files.length} files...`);

let totalEdges = 0;
for (const file of files) {
  const filePath = path.join(HLD_DIR, file);
  try {
    const before = fs.readFileSync(filePath, 'utf-8');
    const result = processFile(filePath);
    fs.writeFileSync(filePath, result, 'utf-8');
    
    // Count edges added
    const edgesAdded = (result.match(/\|"\d+\./g) || []).length;
    totalEdges += edgesAdded;
    console.log(`✓ ${file} (${edgesAdded} labeled edges)`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

console.log(`\nDone! Total labeled edges: ${totalEdges}`);
