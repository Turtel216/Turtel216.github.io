---
title: Greek Tech Job Market Tracker
summary: A self-hosted data pipeline that collects Greek tech job postings every day, cleans and deduplicates them, and publishes a dashboard of skills in demand, remote share, salaries and how long postings stay open.
category: data
stack:
  - Python
  - Apache Airflow
  - dbt
  - PostgreSQL
  - Metabase
  - Garage (S3)
  - Docker Compose
  - GitHub Actions
highlights:
  - Daily Airflow run that extracts, loads, transforms and tests. If a test fails, the marts are left alone and the dashboard keeps the last good day.
  - Raw payloads are stored unchanged, so a parser fix is replayed over saved data without hitting the site again.
  - Postings from several sources are merged into jobs with deterministic deduplication.
status: Built, not yet deployed
repo: https://github.com/Turtel216/greek-job-market-tracker
order: 1
---

## Problem

There is no simple way to see the Greek tech job market as a whole. Job boards show one posting
at a time, in two languages, with salaries quoted per month, per year over 14 payments, net or
gross, or not at all. The same job often shows up on more than one site.

I wanted a few honest numbers that a student or a junior engineer can use, and I wanted to build
it the way a real data platform is built: scheduled, tested, monitored and rebuildable from raw
data.

The dashboard answers six questions:

1. Which skills appear most often, month to month?
2. How many new postings are there per week, by role family?
3. What share of jobs are remote, hybrid or on-site, by city?
4. How does demand split by seniority?
5. What are the salary ranges by role and seniority?
6. How long do postings stay open?

Only aggregates are published. The dashboard never shows a single posting's text, company or link.

## Architecture

Airflow runs the pipeline once a day at 06:00 Athens time.

1. **Extract**: one task per source fetches the listing pages and the details of new or changed
   postings, and saves every response as is in an S3-compatible object store (Garage).
   Unchanged postings are not fetched again.
2. **Load**: a parser per source turns the saved payloads into typed rows, removes emails, phone
   numbers and contact names, and appends them to `raw.raw_postings` in Postgres. Raw rows are
   never updated.
3. **Transform**: dbt builds the warehouse layer by layer. Staging normalizes text and classifies
   each posting (city, work mode, seniority, role family, salary). Intermediate works out when
   postings open and close, extracts skills and merges duplicate postings into jobs. The marts
   are the tables the dashboard reads.
4. **Test and publish**: every layer runs its tests before the next one builds. If anything
   fails, the marts are not touched.
5. **Report**: failures and retries alert to Discord, with email as a fallback. A summary of new,
   open and closed postings goes out after each run, and a watchdog alerts if the run has not
   succeeded by 10:00.
6. **Maintain**: a nightly DAG deletes raw payloads older than 30 days and backs up the warehouse
   and Metabase databases.

| Layer | Tool |
| --- | --- |
| Ingestion | Python 3.12, requests, BeautifulSoup, Pydantic, structlog |
| Orchestration | Apache Airflow 3 (LocalExecutor) |
| Raw storage | Garage, an S3-compatible object store |
| Warehouse | PostgreSQL 17 with `pg_trgm` and `unaccent` |
| Transformation and tests | dbt Core with dbt-postgres |
| Dashboards | Metabase, defined as JSON and SQL files |
| Deployment | Docker Compose |
| Tooling | uv, ruff, mypy, sqlfluff, pre-commit, gitleaks, GitHub Actions |

Every piece is open source and self-hosted, and each has an obvious managed equivalent. The code
only talks to storage through the S3 API, so moving it would be a configuration change.

## Data sources

| Source | How it is read |
| --- | --- |
| Greenhouse job boards | Public Job Board JSON API, for a curated list of companies |
| Workable careers pages | The documented public account endpoint, for a curated list of companies |
| kariera.gr | HTML pages, using the schema.org JSON-LD embedded in each posting |
| skywalker.gr | The site's RSS feed only, so descriptions are cut short and there is no salary |

## Key decisions

- **Scraping politely**: all HTTP goes through one client that sends an identifying User-Agent,
  waits at least 3 seconds between requests to a host, respects robots.txt and `Retry-After`,
  and stops a source for the day on a 401, 403, CAPTCHA or login wall instead of trying to get
  around it. A source is only enabled after I have read its terms. One Greek job board was
  dropped at that step because its terms ban bots.
- **Raw data is immutable and replayable**: payloads are kept for 30 days and parsed rows
  forever. When a site changes its HTML and a parser breaks, I fix the parser, bump its version
  and run a reparse DAG over the stored payloads. Everything after `raw.raw_postings` can be
  rebuilt with `dbt build --full-refresh`.
- **Python fetches, dbt decides**: Python only fetches and parses. Every business rule lives in
  dbt, and the dictionaries and keyword rules behind them are CSV seeds. Teaching the pipeline a
  new city spelling or a new skill means adding a row and a test, not changing code.
- **Greek text is handled on purpose**: text is lowercased, stripped of accents and has the
  final sigma folded before anything is matched. City names are matched in Greek and Latin
  spellings, Attica suburbs map to Athens, and annual salaries are divided by 14 because that is
  how Greek pay is usually split.
- **Deterministic deduplication**: postings from the same company with matching titles, close
  first-seen dates and compatible city and seniority are paired, and pairs are joined into
  clusters. Each cluster's id is the key of its earliest posting, so a full refresh always
  produces the same ids.
- **A broken scraper should not lie**: a posting only closes after it is missing from two
  successful runs of its source, and failed runs do not count. A volume test fails the build
  when a source suddenly returns less than half its usual number of rows.
- **Dashboards are code**: both Metabase dashboards are JSON and SQL files applied through the
  Metabase API. CI runs every dashboard query against freshly built marts, so a mart change that
  would break a chart fails the build.
- **Least privilege**: the loader, dbt and Metabase each use their own Postgres role, limited to
  the schemas they need.

## Data quality and operations

Tests run offline, against saved pages and a made-up sample of postings, so the suite never
touches a real website.

- Parser tests compare each adapter's output on saved pages with the expected JSON.
- Unit tests cover the HTTP client (rate limits, retries, robots.txt, block detection), PII
  scrubbing and the loader, which is also tested against a real Postgres.
- dbt unit tests check normalization, salary parsing, classification, skill patterns, lifecycle
  and deduplication with Greek and English examples. Data tests check keys, relationships,
  accepted values, volume and the mart contracts.
- DAG tests check the task graphs, alerts and schedules.

GitHub Actions runs lint, a secrets scan, the Python tests with an 85% coverage floor, the
database tests and the full dbt build on every pull request.

## Status

The pipeline, the warehouse and both dashboards are built and tested locally. Still to do:

- Deploy to a server behind HTTPS and publish the dashboard.
- Run the first restore test of the nightly backups.
- Run unattended for four weeks, which is my definition of done for the first version.
- Score deduplication on hand-labeled real postings. It currently reaches the 95% precision
  target on a made-up sample only.
