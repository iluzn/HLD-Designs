---
layout: default
title: "Google Interview Prep — System Design, DSA & Machine Coding"
description: "Curated system design and DSA problems asked at Google. Key-Value Store, Google Docs, YouTube, Rate Limiter, LRU Cache, Word Ladder."
permalink: /companies/google
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What system design questions are asked at Google?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google commonly asks: Google Docs (collaborative editing), YouTube (video streaming), Key-Value Store, Rate Limiter, URL Shortener, and Notification System for system design rounds."
      }
    },
    {
      "@type": "Question",
      "name": "What is Google's SWE interview process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google's SWE loop includes: 2-3 coding rounds (DSA-heavy, medium-hard LeetCode), 1 System Design round (L4+), 1 Googleyness and Leadership round. A hiring committee reviews independently."
      }
    }
  ]
}
</script>

# Google Interview Prep

Google's SWE loop for L4+ includes 1 system design round alongside 2-3 coding rounds and a behavioral round. System design at Google emphasizes scalability, correctness, and your ability to break ambiguous problems into concrete components. They value simplicity — overengineering is penalized. Expect follow-ups on failure modes, data consistency, and cost.

---

## HLD Problems Asked at Google

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 1 | Key-Value Store | Beginner | [Read →](/hld/KeyValueStore) |
| 2 | Google Docs (Collaborative Editing) | Advanced | [Read →](/hld/GoogleDocs) |
| 3 | YouTube / Netflix (Video Streaming) | Advanced | [Read →](/hld/Netflix) |
| 4 | Rate Limiter | Beginner | [Read →](/hld/RateLimiter) |
| 5 | URL Shortener | Beginner | [Read →](/hld/URLShortner) |
| 6 | Notification System | Intermediate | [Read →](/hld/NotificationSystem) |

---

## DSA Problems Frequently Asked at Google

| # | Problem | Pattern | Link |
|---|---------|---------|------|
| 1 | LRU Cache | HashMap + Doubly Linked List | [LeetCode →](https://leetcode.com/problems/lru-cache/) |
| 2 | Word Ladder | BFS | [LeetCode →](https://leetcode.com/problems/word-ladder/) |
| 3 | Median of Two Sorted Arrays | Binary Search | [LeetCode →](https://leetcode.com/problems/median-of-two-sorted-arrays/) |
| 4 | Serialize and Deserialize Binary Tree | Tree + BFS/DFS | [LeetCode →](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) |
| 5 | Longest Increasing Subsequence | DP + Binary Search | [LeetCode →](https://leetcode.com/problems/longest-increasing-subsequence/) |
| 6 | Alien Dictionary | Topological Sort | [LeetCode →](https://leetcode.com/problems/alien-dictionary/) |
| 7 | Minimum Window Substring | Sliding Window | [LeetCode →](https://leetcode.com/problems/minimum-window-substring/) |
| 8 | Number of Islands | BFS/DFS Grid | [LeetCode →](https://leetcode.com/problems/number-of-islands/) |
| 9 | Design HashMap | Design | [LeetCode →](https://leetcode.com/problems/design-hashmap/) |
| 10 | Text Justification | Greedy | [LeetCode →](https://leetcode.com/problems/text-justification/) |

---

## Tips for Google Interviews

1. **Coding bar is high.** Google's DSA rounds are harder than most companies — expect medium-hard to hard problems with optimal solutions required. Brute force won't pass.
2. **Simplicity wins in design.** Google penalizes overengineering. If you can solve it with one service and a database, don't add Kafka and 5 microservices. Justify every component.
3. **Think about cost and efficiency.** Google runs at massive scale internally — interviewers appreciate candidates who think about compute cost, storage efficiency, and operational overhead.
4. **The hiring committee matters.** Your interviewer writes feedback, but a separate committee decides. Be consistent across all rounds — one great round doesn't compensate for a bad one.

---

## Other Company Prep

- [Amazon Interview Prep →](/companies/amazon)
- [Microsoft Interview Prep →](/companies/microsoft)
- [Flipkart Interview Prep →](/companies/flipkart)
- [Back to Interview Guide →](/system-design-interview-guide)
