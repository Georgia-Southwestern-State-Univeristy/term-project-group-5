The following required checklist items are our team's definition of done:
* Work is on a short-lived branch
* PR is opened early (not at the end)
* At least 1 teammate review
* CI checks pass
* Docker runs successfully:
  * cp .env.example .env
  * docker compose up --build
* Lint and format pass:
  * npm run lint
  * npm run format
* Code follows team standards
* Any new behavior has at least starter-level tests OR a written test plan note
* Any updates to main have been merged into new code for seamless remote merging
* No secrets (.env, API keys, credentials) committed
* README or docs updated if behavior changes
