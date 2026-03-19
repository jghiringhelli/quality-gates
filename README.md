# genspec-dev/quality-gates

The canonical public registry of quality gates for the [ForgeCraft](https://github.com/jghiringhelli/forgecraft-mcp) methodology.

## What is a quality gate?

A quality gate is a **binary, executable check** that must pass before code can proceed to the next lifecycle phase. Gates are:

- **Deterministic**: same inputs → same pass/fail outcome every time
- **Evidence-based**: every gate in this registry is backed by a real bug it would have caught
- **Composable**: gates combine into a quality profile for a project

## Registry Structure

```
gates/
  universal/             ← applies to any tech stack
  environment-hygiene/   ← dev environment consistency gates
  code-quality/          ← structural code quality gates (duplicates, orphans)
  fintech/               ← financial simulation, DeFi, trading systems
  quarantine/            ← proposed gates pending review
index.json               ← generated, machine-readable catalog of all approved gates
```

## Current Gates

| ID | Domain / Category | Phase | Hook | Tags |
|----|-------------------|-------|------|------|
| `owasp-l1-static` | security | development | pre-commit | UNIVERSAL |
| `mutation-testing` | test-quality | pre-release | pre-release | UNIVERSAL |
| `dependency-audit` | security | development | pre-commit | UNIVERSAL |
| `pnl-decomposition` | simulation-integrity | development | post-run | FINTECH, SIMULATION |
| `vol-unit-confusion` | financial-invariants | development | pre-commit | FINTECH, SIMULATION |
| `vscode-extension-deduplication` | environment-hygiene | development | pre-commit | UNIVERSAL |
| `package-manager-check-before-install` | environment-hygiene | development | pre-commit | UNIVERSAL |
| `docker-container-reuse` | environment-hygiene | development | pre-commit | UNIVERSAL |
| `codeseeker-semantic-search-before-grep` | environment-hygiene | development | pre-commit | UNIVERSAL |
| `codeseeker-duplicate-detection` | code-quality | pre-release | close-cycle | UNIVERSAL |
| `codeseeker-orphan-detection` | code-quality | pre-release | close-cycle | UNIVERSAL |

## Contributing a Gate

The fastest way to contribute is via ForgeCraft MCP:

```
contribute-gate
```

Or directly via the GitHub issue template: [New Gate Proposal](.github/ISSUE_TEMPLATE/quality-gate-proposal.md)

See [GATE_SCHEMA.md](GATE_SCHEMA.md) for the full schema and contribution process.

### Contribution modes

- **`attributed`**: earn 1 month ForgeCraft Pro per approved gate (founding: 3 months)
- **`anonymous`**: no attribution, no credit — just the gate

## Using the Registry

The `index.json` is regenerated on every push to `main`. Consume it directly:

```
https://raw.githubusercontent.com/genspec-dev/quality-gates/main/index.json
```

Or via the ForgeCraft server:

```
GET https://forgecraft.genspec.dev/gates
```

## License

Gate definitions are published under [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/).
