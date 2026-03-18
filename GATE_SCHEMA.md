# Gate Schema Reference

This document defines the full YAML schema for quality gates in the `genspec-dev/quality-gates` registry.

---

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique kebab-case identifier. Used as filename. Must be globally unique across all categories. |
| `title` | `string` | Human-readable title. Format: `"<What> — <Why>"` |
| `description` | `string` | One paragraph: what does this gate check and why does it matter? |
| `category` | `string` | One of: `security`, `test-quality`, `simulation-integrity`, `financial-invariants`, `observability`, `data-integrity` |
| `gsProperty` | `string` | Which GS property this gate defends or verifies. One of: `defended`, `verifiable`, `auditable` |
| `phase` | `string` | Lifecycle phase. One of: `development`, `pre-release`, `rc`, `deployment`, `continuous` |
| `hook` | `string` | Where the gate runs. One of: `pre-commit`, `pre-push`, `pre-release`, `post-run`, `scheduled`, `on-deploy` |
| `check` | `string` | Executable step-by-step description of what to run. Must be deterministic and unambiguous. |
| `passCriterion` | `string` | Binary pass/fail statement. No "review required" allowed as a criterion. |
| `evidence` | `string` | Description of a real bug this gate would have caught. Required. "It seems useful" is not evidence. |
| `status` | `string` | One of: `approved`, `quarantine`, `deprecated` |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `tags` | `string[]` | Audience tags. Valid values: `UNIVERSAL`, `FINTECH`, `SIMULATION`, `API`, `CLI`, `LIBRARY` |
| `generalizable` | `boolean` | Whether this gate applies across tech stacks without modification. Default: `false` |
| `owasp_asvs_level` | `integer` | OWASP ASVS level (1–3) if the gate maps to ASVS. |
| `approvedAt` | `string` | ISO 8601 date when the gate was approved. Set automatically on graduation. |
| `contributor` | `string` | GitHub username of the contributor. Omit or set to `"anonymous"` for anonymous contributions. |
| `deprecatedAt` | `string` | ISO 8601 date when the gate was deprecated. |
| `deprecationReason` | `string` | Why the gate was deprecated and what to use instead. |
| `supersededBy` | `string` | Gate ID that replaces this gate. |

---

## Contribution Process

```
Contributor                   Registry                       Maintainer
    |                             |                               |
    |-- POST /contribute/gate --> |                               |
    |   (ForgeCraft MCP or HTTP)  |                               |
    |                             |-- Creates GitHub issue -----> |
    |                             |   label: gate-proposal        |
    |                             |   label: status:pending-review|
    |<-- 202 Accepted ----------- |                               |
    |    issueUrl                 |                               |
    |                             |                    <-- reviews & comments
    |                             |                               |
    |                             |<-- label: approved ---------- |
    |                             |                               |
    |                             |-- graduate-gate.yml runs      |
    |                             |   moves quarantine/ -> category/
    |                             |   opens PR                    |
    |                             |                    <-- merges PR
    |                             |                               |
    |                             |-- build-index.yml runs        |
    |                             |   regenerates index.json      |
    |                             |                               |
```

### Contribution Modes

Three modes are supported when submitting a gate:

#### `anonymous`
- No attribution in the gate file or the GitHub issue.
- No Pro credit earned.
- Gate is credited to `"anonymous"` in the registry.
- Use this if you don't want your GitHub handle associated with the contribution.

#### `attributed`
- GitHub handle included in the issue and in the gate's `contributor` field.
- Earns **1 month of ForgeCraft Pro** per approved gate (founding period: 3 months).
- Project type (e.g. "fintech simulation") may be optionally included — no project name required.

#### `none` (or absent)
- Rejected at the API boundary with HTTP 400.
- Mode must be explicitly chosen by the contributor.

### Pro Credit Policy

- Pro credit is earned when a gate transitions from `quarantine` to an approved category directory.
- Credit is applied to the GitHub account provided at contribution time.
- One gate = one month Pro (founding period through 2026-06-30: three months).
- Credits are non-transferable and non-refundable.
- Anonymous contributions do not earn credits, even if the contributor later identifies themselves.
- Multiple attributions for the same gate (amended issues) use the **first** attribution on record.

---

## Complete Example

```yaml
id: owasp-l1-static
title: "OWASP ASVS Level 1 — Static Security Analysis at Commit Time"
description: >
  Run static security checks on every commit to catch the most common
  vulnerability classes before they reach code review.
category: security
gsProperty: defended
phase: development
hook: pre-commit
owasp_asvs_level: 1
check: >
  Run a static security analyzer appropriate for the project's language.
  Checks must cover: (1) hardcoded secrets and credentials, (2) SQL/command
  injection patterns via string concatenation, (3) eval() with dynamic input,
  (4) dependency CVEs.
passCriterion: "Zero HIGH/CRITICAL findings from static analyzer. All pre-commit hooks exit 0."
tags: [UNIVERSAL]
generalizable: true
evidence: >
  Static analysis at commit time catches ~70% of OWASP Top 10 issues before
  they reach code review.
status: approved
approvedAt: "2026-03-01"
contributor: "jghiringhelli"
```
