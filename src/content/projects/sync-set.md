---
title: SyncSet
summary: A real-time collaborative setlist planner for musicians.
category: web
stack:
  - TypeScript
  - React
  - Express
  - Socket.io
  - Prisma
  - PostgreSQL
  - Docker Compose
  - Effect
highlights:
  - Real-time synchronization between clients, with optimistic UI updates.
  - REST API backed by PostgreSQL, containerized with Docker Compose.
  - Typed functional error handling with the Effect library.
period: "2026"
repo: https://gitlab.com/papakonstantinou/sync-set
order: 20
---

## Overview

SyncSet lets the members of a band plan a setlist together, with every change appearing for
everyone as it happens.

## Architecture

1. **Frontend**: a React application with optimistic UI updates, kept in sync between clients
   through Socket.io.
2. **Backend**: a REST API built with Express and Prisma on top of PostgreSQL.
3. **Deployment**: the whole stack is containerized with Docker Compose.

## Key decisions

- **Effect for error handling**: the Effect library gives typed, functional error handling and
  predictable state management, so failure cases are visible in the types.
