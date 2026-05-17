#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");

const SNIPPETS_DIR = path.join(os.homedir(), ".snippetx");
const SNIPPETS_FILE = path.join(SNIPPETS_DIR, "snippets.json");

function ensureDir() {
  if (!fs.existsSync(SNIPPETS_DIR)) fs.mkdirSync(SNIPPETS_DIR, { recursive: true });
  if (!fs.existsSync(SNIPPETS_FILE)) fs.writeFileSync(SNIPPETS_FILE, "[]");
}

function load() {
  ensureDir();
  return JSON.parse(fs.readFileSync(SNIPPETS_FILE, "utf-8"));
}

function save(snippets) {
  fs.writeFileSync(SNIPPETS_FILE, JSON.stringify(snippets, null, 2));
}

function add(name, lang, content) {
  const snippets = load();
  snippets.push({ id: crypto.randomUUID().slice(0, 8), name, lang, content, created: new Date().toISOString().slice(0, 10) });
  save(snippets);
  console.log(`  ✅  Saved: "${name}" (${lang})`);
}

function list(filter) {
  const snippets = load();
  const filtered = filter ? snippets.filter(s => s.name.includes(filter) || (s.lang && s.lang.includes(filter))) : snippets;
  if (filtered.length === 0) {
    console.log("\n  📭  No snippets found.\n");
    return;
  }
  console.log(`\n  📋  ${filtered.length} snippet${filtered.length > 1 ? "s" : ""}\n`);
  for (const s of filtered) {
    console.log(`  🔹 ${s.id}  ${s.name}`);
    console.log(`     lang: ${s.lang || "text"}  │  ${s.created}  │  ${s.content.length} chars\n`);
  }
}

function show(id) {
  const snippets = load();
  const s = snippets.find(s => s.id === id);
  if (!s) { console.log(`\n  ❌  Snippet not found: ${id}\n`); return; }
  console.log(`\n  📄  ${s.name}  (${s.lang || "text"})\n`);
  console.log("  " + "-".repeat(50));
  console.log(s.content);
  console.log("  " + "-".repeat(50) + "\n");
}

function remove(id) {
  const snippets = load();
  const idx = snippets.findIndex(s => s.id === id);
  if (idx === -1) { console.log(`\n  ❌  Not found\n`); return; }
  const removed = snippets.splice(idx, 1)[0];
  save(snippets);
  console.log(`  🗑️   Deleted: "${removed.name}"`);
}

function search(term) {
  const snippets = load();
  const results = snippets.filter(s => s.content.toLowerCase().includes(term.toLowerCase()) || s.name.toLowerCase().includes(term.toLowerCase()));
  console.log(`\n  🔍  "${term}" → ${results.length} match${results.length !== 1 ? "es" : ""}\n`);
  for (const s of results) {
    const idx = s.content.toLowerCase().indexOf(term.toLowerCase());
    const ctx = s.content.substring(Math.max(0, idx - 30), Math.min(s.content.length, idx + term.length + 30));
    console.log(`  🔹 ${s.id}  ${s.name}`);
    console.log(`     ...${ctx}...\n`);
  }
}

function copy(id) {
  const snippets = load();
  const s = snippets.find(s => s.id === id);
  if (!s) { console.log(`\n  ❌  Not found\n`); return; }
  process.stdout.write(s.content);
}

function main() {
  const cmd = process.argv[2];
  const args = process.argv.slice(3);

  switch (cmd) {
    case "add": {
      const name = args[0];
      const lang = args[1] || "text";
      // Read from stdin
      let content = "";
      process.stdin.setEncoding("utf-8");
      process.stdin.on("data", d => content += d);
      process.stdin.on("end", () => {
        if (!content.trim() || !name) {
          console.log("\n  Usage: snippetx add <name> [lang] < content\n");
          console.log("  Example: echo 'console.log(1)' | snippetx add hello js\n");
        } else {
          add(name, lang, content.trim());
        }
      });
      if (!process.stdin.isTTY) process.stdin.resume();
      else {
        if (name) {
          // Take rest of command line as content
          const content2 = args.slice(1).join(" ");
          if (content2) add(name, lang, content2);
          else console.log("\n  Usage: snippetx add <name> [lang] < content\n");
        } else {
          console.log("\n  Usage: snippetx add <name> [lang] < content\n");
        }
      }
      return;
    }
    case "list":
    case "ls":
      list(args[0]);
      break;
    case "show":
      show(args[0]);
      break;
    case "rm":
    case "delete":
      remove(args[0]);
      break;
    case "search":
    case "find":
      search(args.join(" "));
      break;
    case "copy":
    case "cp":
      copy(args[0]);
      break;
    default:
      console.log("\n  📦  SNIPPETX — Terminal Code Snippet Manager\n");
      console.log("  Commands:");
      console.log("    add  <name> [lang]     Save snippet (pipe content in)");
      console.log("    list [filter]          List all snippets");
      console.log("    show <id>              View a snippet");
      console.log("    search <term>          Search all snippets");
      console.log("    rm <id>                Delete a snippet");
      console.log("    copy <id>              Output snippet to stdout\n");
      console.log("  Examples:");
      console.log("    echo 'app.get(\"/\")' | snippetx add route js");
      console.log("    snippetx list js");
      console.log("    snippetx search express");
      console.log("    snippetx copy a1b2c3d4 | pbcopy\n");
  }
}

main();
