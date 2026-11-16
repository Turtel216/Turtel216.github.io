---
# PROJECT TEMPLATE
# Copy this file, rename it (the file name becomes the URL: my-project.md -> /projects/my-project)
# and fill in the fields. Files starting with an underscore are ignored by the site.

title: Project Name
summary: One or two sentences on what the project does and why it exists. This is shown on the card.

# data | web | compiler
#   data, web -> shown in the main Projects section and gets its own page
#   compiler  -> shown in the compact Compiler engineering section, linking to the repository
category: data

stack:
  - Python
  - SQL

# Two to four concrete outcomes. Prefer numbers you can defend in an interview.
highlights:
  - Processes N records per day with an end-to-end latency of N minutes.
  - Reduced the cost or runtime of something by N percent.

period: "2026"
role: Sole author

# Optional. Shown as a label on the card, for example "Early development".
status: In development

# Optional links. Delete the lines you do not need.
repo: https://github.com/Turtel216/project-name
demo: https://example.com

# Set to true for closed-source work (shows a note instead of a repository link).
proprietary: false

# Lower numbers are listed first.
order: 10

# Set to true to keep the project out of the built site while you work on it.
draft: false
---

## Problem

What needed solving, and for whom. Describe the situation before the project existed: the data
sources involved, their volume and shape, and what made the problem hard.

## Architecture

How the system is put together. Walk through the path the data takes.

1. **Ingestion**: where the data comes from and how it arrives.
2. **Processing**: how it is validated, transformed and modelled.
3. **Serving**: where it ends up and who consumes it.

An architecture diagram works well here. Put the image in `public/projects/` and reference it
as `![Architecture diagram](/projects/my-project-architecture.png)`.

## Key decisions

The trade-offs you made and why. This is the section interviewers read most closely.

- **Decision one**: what you chose, what you rejected, and the reasoning.
- **Decision two**: the same.

## Data quality and operations

How you know the data is correct and the pipeline is healthy: tests, contracts, monitoring,
alerting, backfills and failure recovery.

## Results

What changed because the project exists. Tie this back to the problem statement.

## What I would do differently

Optional, but a short honest retrospective reads well.
