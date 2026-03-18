# Quarantine

Gates in this directory have been proposed via the contribution process but have not yet been reviewed and approved.

## Process

1. A gate proposal is submitted via `POST /contribute/gate` (ForgeCraft) or by opening an issue using the `quality-gate-proposal` template.
2. The `graduate-gate.yml` workflow creates a YAML stub in `gates/quarantine/` automatically.
3. Maintainers review the gate definition, verify the evidence, and test the check criterion.
4. When approved, the issue is labeled `approved`, which triggers `graduate-gate.yml` to:
   - Move the file from `gates/quarantine/` to the appropriate category directory
   - Update `status: approved` and set `approvedAt`
   - Open a PR for final review

## Quality Criteria for Graduation

- **Evidence**: Must describe a real bug this gate would have caught. "It seems useful" is not evidence.
- **Pass criterion**: Must be binary and deterministic. No "review required" as the criterion.
- **Check**: Must be executable — a human or tool can follow it without interpretation.
- **Generalizable** (for UNIVERSAL gates): Must apply across tech stacks without code changes.

## Current Quarantine Count

_Updated automatically by build-index.js_
