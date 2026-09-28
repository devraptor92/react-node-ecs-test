# React + Node + Docker ECS Test

A minimal React frontend and Node.js backend designed to simulate
a production-style container setup before deploying to AWS ECS.

## Architecture

Browser
    |
    | http://localhost:3000
    v
Frontend container
    |
    | Nginx /api/* proxy
    v
Backend container
    |
    | Docker network
    v
Node.js / Express

## Prerequisites

Install Docker Desktop for Mac.

Verify:

    docker --version
    docker compose version

## Start the application

From this directory:

    docker compose up --build

Then open:

    http://localhost:3000

Click:

    Call Node Backend

You should see:

    Hello from the Node.js backend!

## Test the backend directly

Run:

    curl http://localhost:8080/health

Expected:

    {"status":"ok","service":"backend"}

Test the API:

    curl http://localhost:8080/api/hello

## Test the frontend-to-backend proxy

Run:

    curl http://localhost:3000/api/hello

This request goes:

    localhost:3000
        |
        v
    Nginx
        |
        v
    backend:8080
        |
        v
    Node.js

## Test Docker internal networking

Open a shell in the frontend container:

    docker compose exec frontend sh

Then run:

    wget -qO- http://backend:8080/health

You should see:

    {"status":"ok","service":"backend"}

Exit the container:

    exit

## See running containers

    docker compose ps

## View logs

All logs:

    docker compose logs

Frontend logs:

    docker compose logs frontend

Backend logs:

    docker compose logs backend

Follow backend logs:

    docker compose logs -f backend

## Stop everything

    docker compose down

## Rebuild from scratch

    docker compose down

    docker compose build --no-cache

    docker compose up

## Project structure

    react-node-ecs-test/
    |
    +-- docker-compose.yml
    |
    +-- frontend/
    |   +-- Dockerfile
    |   +-- nginx.conf
    |   +-- package.json
    |   +-- index.html
    |   +-- src/
    |       +-- App.jsx
    |       +-- main.jsx
    |       +-- index.css
    |
    +-- backend/
        +-- Dockerfile
        +-- package.json
        +-- server.js

## Important Docker concepts demonstrated

1. Separate frontend and backend containers.
2. Docker Compose networking.
3. Container-to-container DNS.
4. Health checks.
5. Nginx reverse proxy.
6. React production build.
7. Node.js listening on 0.0.0.0.
8. Frontend API requests using /api rather than localhost.
9. Multi-stage Docker builds.

## AWS ECS

The next step is to build these two images and push them to
Amazon ECR.

The eventual architecture can look like:

    Internet
        |
        v
    Application Load Balancer
        |
        +-------------------+
        |                   |
        v                   v
    Frontend ECS        Backend ECS
       Service             Service
        |                   |
        v                   v
    Frontend image      Backend image
        |                   |
        +------ Amazon ECR-+

The local Docker setup is intentionally structured so that the
frontend and backend remain separate images when moving to ECS.
