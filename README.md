
# MiniURL

A production-oriented URL shortener built with Node.js, PostgreSQL, Redis, and Docker featuring caching, analytics, logging, and rate limiting.


## Tech Stack

**Client:** Not managed yet

**Server:** Node, Express, Docker

**Database:** PostgreSQL, Redis

**Logging:** Pino logger

**Documentation:** Swagger

## Features

- Shorten long URLs
- URL redirection
- Click analytics
- Rate limiting (Token Bucket Algorithm)
- Structured logging with Pino
- Dockerized setup
- RESTful API architecture
- Swagger API documentation

## Architecture Flow

Client → Express API → Redis Cache → PostgreSQL

- Redis is used for caching frequently accessed URLs.
- PostgreSQL stores persistent URL mappings.
- Rate limiting protects the API from abuse.
- Pino handles structured logging.
## API Endpoints



| Method | Endpoint     | Description                |
| :-------- | :------- | :------------------------- |
| `POST` | `/api/v0/shorten` | **Required**. Your url that is needed to be shortend |
`GET` |`/api/v0/:shortcode` | Redirect to original


#### Swagger Docs
`/api/v0/api-docs`



## Installation

### Clone Repository

```bash
  git clone https://github.com/parthibCodes/miniurl.git
```
### Install Dependencies

`npm install`

### Run Development Server

`npm run dev`

### Setup Environment Variables

Create a `.env` file:

PORT=

DATABASE_URL=

REDIS_URL=

### Docker Setup

`docker-compose up --build `
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| Variable       | Description            |
|----------------|------------------------|
| PORT           | Server port            |
| DATABASE_URL   | PostgreSQL connection  |
| REDIS_URL      | Redis connection       |

## Logging

Structured logging implemented using Pino:
- Error logs
- Cache logs
- Redirect logs
- Database logs
- Request tracing with unique request IDs
## Rate Limiting

Implemented Token Bucket Algorithm to:
- Prevent abuse
- Protect API endpoints
- Improve system stability
## Future Improvements

- Distributed rate limiting
- User dashboard
- QR code generation
- Expiration-based URLs
- Kubernetes deployment
- CI/CD pipeline
## Screenshots

<img width="1872" height="958" alt="Screenshot 2026-05-13 210247" src="https://github.com/user-attachments/assets/433bf809-5dd2-4160-b732-8a74c6da94ed" />
<img width="1901" height="1018" alt="image" src="https://github.com/user-attachments/assets/81b3f249-ba89-41d9-84da-d5a520096cc9" />
