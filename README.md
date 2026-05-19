# 📋 snippetx

> CLI snippet manager — tag, search, and reuse code from your terminal.

[![npm](https://img.shields.io/npm/v/@wuchunjie/snippetx)](https://www.npmjs.com/package/@wuchunjie/snippetx)
[![npm downloads](https://img.shields.io/npm/dm/@wuchunjie/snippetx)](https://www.npmjs.com/package/@wuchunjie/snippetx)
[![license](https://img.shields.io/npm/l/@wuchunjie/snippetx)](https://github.com/wuchunjie00/snippetx/blob/main/LICENSE)

## Quick Start

```bash
npm i -g @wuchunjie/snippetx
```

## Features

- 💾 **Save snippets** from files, clipboard, or stdin
- 🔍 **Fuzzy search** — find anything in < 3 seconds
- 🏷️ **Tag system** — organize by language, framework, purpose
- 📋 **Copy to clipboard** — one command to reuse

## Usage

```bash
# Save from file
snippetx add ./useful-code.ts --tags "typescript,utility"

# Search
snippetx search "regex email"

# Get + copy
snippetx get debug-log --copy

# List by tag
snippetx list --tag typescript
```

## Popular Snippets

```bash
snippetx add - <<'EOF' --name "debug-log" --tags "javascript"
console.log('debug:', JSON.stringify(obj, null, 2))
EOF

snippetx add - <<'EOF' --name "curl-auth" --tags "bash,api"
curl -H "Authorization: Bearer $TOKEN" $URL
EOF
```

## Why snippetx?

I had snippets everywhere — Desktop folders, Notion, 47 browser bookmarks. Spent 20 minutes finding a regex I knew I'd saved. snippetx puts everything in one CLI.

---

## 🛠️ More Free CLI Tools

| Tool | Description | Install |
|------|-------------|---------|
| [scaffoldx](https://github.com/wuchunjie00/scaffoldx) | Project scaffolding — 12 templates | `npm i -g scaffoldx-cli` |
| [dotguard](https://github.com/wuchunjie00/dotguard) | Secret detection & scanning | `npm i -g @wuchunjie/dotguard` |
| [gitpulse](https://github.com/wuchunjie00/gitpulse) | Git analytics & hotspots | `npm i -g @wuchunjie/gitpulse` |
| [snippetx](https://github.com/wuchunjie00/snippetx) | CLI snippet manager | `npm i -g @wuchunjie/snippetx` |

**One-liner:** `npm i -g scaffoldx-cli @wuchunjie/dotguard @wuchunjie/gitpulse @wuchunjie/snippetx`

☕ [Ko-fi](https://ko-fi.com/wuchunjie) | 📝 [Dev.to](https://dev.to/ke_jia_24bb2f9f84f14f728a) | 💬 [Discussions](https://github.com/wuchunjie00/scaffoldx/discussions)
