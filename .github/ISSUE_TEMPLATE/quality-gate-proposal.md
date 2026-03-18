---
name: Quality Gate Proposal
about: Propose a new quality gate for the genspec-dev registry
title: "[Gate Proposal] <gate-id>"
labels: gate-proposal, status:pending-review
assignees: ""
---

## Gate Proposal

**Contributor**: <!-- @your-github-handle or "anonymous" -->
**Project type**: <!-- e.g. "fintech simulation", "web API", "CLI tool" — no project name needed -->

---

### Gate Definition

**ID**: `<!-- e.g. owasp-l2-dynamic -->`
**Title**: <!-- Full human-readable title -->
**Category**: <!-- security | test-quality | simulation-integrity | financial-invariants | other -->
**GS Property**: <!-- defended | verifiable | auditable -->
**Phase**: <!-- development | pre-release | rc | deployment | continuous -->
**Hook**: <!-- pre-commit | pre-release | post-run | scheduled -->
**Tags**: <!-- UNIVERSAL | FINTECH | SIMULATION | API | CLI -->

### Description
<!-- One paragraph: what does this gate check and why does it matter? -->

### Check
```
<!-- Step-by-step: what does a tool or human do to evaluate this gate?
     Must be executable without interpretation. -->
```

### Pass Criterion
<!-- Binary statement: what does "passing" look like?
     Example: "Zero HIGH/CRITICAL findings. All hooks exit 0." -->

### Evidence
> <!-- REQUIRED: Describe a real bug this gate would have caught.
>      "It seems useful" is not evidence. Name the failure mode,
>      the symptom, and how the gate would have surfaced it. -->

---

*By submitting this proposal, you agree that the gate definition may be published under the CC-BY-4.0 license in the genspec-dev/quality-gates registry.*
