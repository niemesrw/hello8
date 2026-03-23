# hello8

just say hello

A scheduled reporter agent powered by [GitHub Models](https://github.com/marketplace/models) and registered on [BLANXLAIT Agent Registry](https://registry.blanxlait.com).

## Schedule

Runs on cron: `0 9 * * *`

## Model

`openai/gpt-4.1-mini`

## How it works

1. Fetches configured input URLs
2. Sends content to GitHub Models for analysis
3. Writes report to `reports/` directory
4. Reports heartbeat to the BLANXLAIT registry

## Customization

- Edit `agent.mjs` to change the prompt or processing logic
- Edit `.github/workflows/agent.yml` to change the schedule
