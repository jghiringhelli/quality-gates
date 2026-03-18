#!/usr/bin/env node
// @ts-check
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative, dirname } from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const GATES_DIR = join(ROOT, "gates");
const INDEX_PATH = join(ROOT, "index.json");

const includeQuarantine = process.argv.includes("--include-quarantine");

/**
 * Recursively collect all .yaml files under a directory.
 * @param {string} dir
 * @returns {string[]}
 */
function collectYamlFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      if (!includeQuarantine && entry === "quarantine") continue;
      results.push(...collectYamlFiles(fullPath));
    } else if (entry.endsWith(".yaml") || entry.endsWith(".yml")) {
      results.push(fullPath);
    }
  }
  return results;
}

const yamlFiles = collectYamlFiles(GATES_DIR);
const gates = [];
const tagSet = new Set();

for (const filePath of yamlFiles) {
  const raw = readFileSync(filePath, "utf-8");
  const gate = yaml.load(raw);
  if (!gate || typeof gate !== "object") {
    console.warn(`Skipping invalid YAML: ${filePath}`);
    continue;
  }
  gate._path = relative(ROOT, filePath).replace(/\\/g, "/");
  gates.push(gate);
  if (Array.isArray(gate.tags)) {
    for (const tag of gate.tags) tagSet.add(tag);
  }
}

const index = {
  generatedAt: new Date().toISOString(),
  version: "1",
  gateCount: gates.length,
  tags: [...tagSet].sort(),
  gates,
};

writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + "\n");
console.log(`index.json written: ${gates.length} gates, tags: ${[...tagSet].join(", ")}`);
