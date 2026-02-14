## Summary

Briefly describe what this PR changes or adds.

---

## Checklist (must complete before merge)

- [ ] Work is on a short-lived branch
- [ ] PR opened early (not only at completion)
- [ ] At least 1 teammate review requested
- [ ] CI checks pass
- [ ] Docker runs successfully:
  - `cp .env.example .env`
  - `docker compose up --build`
- [ ] Lint and format pass:
  - `npm run lint`
  - `npm run format`
- [ ] README or docs updated if behavior/setup changed
- [ ] No secrets (.env, API keys, credentials) committed