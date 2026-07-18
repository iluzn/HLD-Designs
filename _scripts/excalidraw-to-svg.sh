#!/bin/bash
# Converts all .excalidraw files in assets/diagrams/ to .svg using Kroki API
# Usage: ./_scripts/excalidraw-to-svg.sh [specific-file.excalidraw]

set -e

DIAGRAMS_DIR="assets/diagrams"
KROKI_URL="https://kroki.io/excalidraw/svg"

convert_file() {
  local input="$1"
  local output="${input%.excalidraw}.svg"
  
  echo "Converting: $input → $output"
  
  # Wrap the excalidraw JSON in Kroki's expected format
  local diagram_source
  diagram_source=$(cat "$input" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")
  
  curl -s -X POST "$KROKI_URL" \
    -H "Content-Type: application/json" \
    -d "{\"diagram_source\": $diagram_source}" \
    -o "$output"
  
  # Verify output is valid SVG
  if head -1 "$output" | grep -q "^<svg"; then
    echo "  ✓ Success: $output ($(wc -c < "$output" | tr -d ' ') bytes)"
  else
    echo "  ✗ Failed: $(head -1 "$output")"
    rm -f "$output"
    return 1
  fi
}

if [ -n "$1" ]; then
  convert_file "$1"
else
  find "$DIAGRAMS_DIR" -name "*.excalidraw" | while read -r file; do
    convert_file "$file"
  done
fi

echo ""
echo "Done. SVGs are ready for embedding."
