---
permalink: /search/
layout: none
title: "Search — SystemCraft"
description: "Search system design articles on SystemCraft"
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search — SystemCraft</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #0a0a0f; color: #e2e8f0; min-height: 100vh; }
        .container { max-width: 700px; margin: 0 auto; padding: 3rem 1.5rem; }
        h1 { font-size: 1.8rem; margin-bottom: 1.5rem; color: #fff; }
        h1 span { color: #6366f1; }
        #search-input {
            width: 100%; padding: 0.9rem 1.2rem; font-size: 1rem;
            background: #12121a; border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px; color: #e2e8f0; outline: none;
        }
        #search-input:focus { border-color: #6366f1; }
        #search-input::placeholder { color: #64748b; }
        #results { margin-top: 1.5rem; }
        .result { padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .result a { color: #fff; text-decoration: none; font-weight: 600; font-size: 1.05rem; }
        .result a:hover { color: #6366f1; }
        .result p { color: #94a3b8; font-size: 0.88rem; margin-top: 0.3rem; }
        .no-results { color: #64748b; margin-top: 1rem; }
        .back { display: inline-block; margin-bottom: 1.5rem; color: #6366f1; text-decoration: none; font-size: 0.9rem; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back">&larr; Home</a>
        <h1>Search <span>SystemCraft</span></h1>
        <input type="text" id="search-input" placeholder="Search designs... (e.g., token bucket, Kafka, WebSocket)" autofocus>
        <div id="results"></div>
    </div>
    <script>
        var searchData = [];
        fetch('/search.json').then(r => r.json()).then(function(data) { searchData = data; });

        document.getElementById('search-input').addEventListener('input', function(e) {
            var query = e.target.value.toLowerCase().trim();
            var results = document.getElementById('results');
            if (query.length < 2) { results.innerHTML = ''; return; }

            var matches = searchData.filter(function(item) {
                return (item.title && item.title.toLowerCase().includes(query)) ||
                       (item.description && item.description.toLowerCase().includes(query)) ||
                       (item.content && item.content.toLowerCase().includes(query));
            });

            if (matches.length === 0) {
                results.innerHTML = '<p class="no-results">No results found for "' + query + '"</p>';
                return;
            }

            results.innerHTML = matches.map(function(item) {
                var snippet = '';
                if (item.content) {
                    var idx = item.content.toLowerCase().indexOf(query);
                    if (idx > -1) {
                        var start = Math.max(0, idx - 40);
                        var end = Math.min(item.content.length, idx + query.length + 80);
                        snippet = '...' + item.content.substring(start, end) + '...';
                    }
                }
                return '<div class="result"><a href="' + item.url + '">' + item.title + '</a>' +
                       (item.description ? '<p>' + item.description + '</p>' : '') +
                       (snippet ? '<p>' + snippet + '</p>' : '') + '</div>';
            }).join('');
        });
    </script>
</body>
</html>
