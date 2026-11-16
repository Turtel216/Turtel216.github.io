---
title: WikiGuard
summary: A streaming system that scores every human edit to English Wikipedia articles for revert risk within seconds, then grades itself against the community's reverts. It is read-only and never edits Wikipedia.
category: data
stack:
  - Scala
  - Spark Structured Streaming
  - Apache Kafka
  - Apache Iceberg
  - Protobuf
  - Kubernetes (k3s)
  - Prometheus
  - Grafana
  - Python
highlights:
  - Stateless ingestor that resumes after the last record it wrote and reports any stretch of events it could not recover.
  - Streaming query that copies raw Kafka events into an Iceberg table, taking each batch only once after a crash.
  - Development and tests replay recorded events and never contact Wikimedia.
period: "2026"
status: Early development
order: 2
---

## Problem

WikiGuard is meant to score each human edit to English Wikipedia articles for the risk of being
reverted, within seconds of the edit, and then to check its own scores against what the
community actually reverted.

## Status

This project is at an early stage. The ingestor and the query that copies raw events into the
lake exist but are not deployed, and nothing connects to Wikimedia yet. The enrichment, feature,
model training and evaluation parts are laid out in the repository but are still to come.

## A note on scale

English Wikipedia gets about 2 edits per second, so the live stream alone does not need a
cluster. Spark is here for three other jobs:

- backfilling and training on months of history,
- replaying the stream at hundreds of times live speed,
- stateful per-user and per-page processing, written the way a larger deployment would write it.

## Architecture

What exists so far:

1. **Ingestor**: copies events from one stream connection into the raw Kafka topics. It keeps no
   state of its own. On every connect it reads the last record it wrote and resumes right after
   it. If that record is older than what upstream still keeps, the lost stretch is published to
   a gaps topic before anything else is stored.
2. **Lake sink**: a Spark Structured Streaming query that copies the raw Kafka topics into the
   Iceberg table `bronze.events_raw`, one row per event, partitioned by the day of the event, so
   the events outlive the seven days Kafka keeps them. A batch is committed about once a minute.
   After a crash the unfinished batch is run again and the table takes it only once.
3. **Fixture recorder**: saves the newest raw events from Kafka as a replayable recording, so
   recording needs no second stream connection.
4. **Monitoring**: Prometheus collects metrics from every pod that names a `metrics` port, and
   Grafana shows a pipeline health dashboard defined as a JSON file in Git.

The repository is a Scala sbt multi-project for the JVM side (ingestor, enricher, streaming and
batch jobs, pure feature functions) and a Python package for datasets, training and evaluation.
Kafka contracts are defined in Protobuf, deployment is Kustomize with Flux, and batch workflows
are Argo templates.

## Key decisions

- **Fixtures instead of live traffic**: development and tests replay recordings. The live source
  refuses to start until a contact address is filled in for the User-Agent, and pods in the
  application namespace cannot reach anything outside the cluster.
- **Raw events are kept untouched**: the event body is stored as received, next to its stream
  position and the place in Kafka it was read from. Topic, partition and offset identify a row
  if a checkpoint ever has to be thrown away.
- **Schema changes are files**: Iceberg tables are defined in DDL files that a Spark job runs in
  order. Every statement must be safe to run again, and tables are never changed by hand.
- **Grafana is a read-only viewer**: its data source and dashboards come from Git, nobody can
  log in, and it keeps nothing across restarts.

## Data quality and operations

Unit tests cover the Scala and Python code, and integration tests run against Kafka, SeaweedFS
and PostgreSQL containers. A local dev cluster (k3s in Docker) runs Kafka, object storage,
PostgreSQL, the ingestor and the dashboards on fixture data with one command.
