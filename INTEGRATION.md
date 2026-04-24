# CodeSync — Frontend ↔ Backend Integration Guide

## Service Port Map

| Service          | Port  | Notes                                      |
|-----------------|-------|--------------------------------------------|
| service-registry | 8761  | Eureka — start this FIRST                  |
| auth-service     | 8080  | JWT auth, OAuth2, admin                    |
| api-gateway      | 8081  | All REST traffic from frontend goes here   |
| project-service  | 8082  | Project CRUD                               |
| editor-service   | 8083  | File CRUD, content                         |
| collab-service   | 8084  | WebSocket (SockJS /collab) + REST sessions |
| version-service  | 8085  | Snapshots, branches, diffs                 |
| execution-service| 8086  | Code execution                             |
| **Frontend**     | **3000** | Vite dev server                         |

## Integration Changes Applied

### 1. `vite.config.js` — Proxy Added
All network calls now go through the Vite dev proxy:
- `/api/**` → `http://localhost:8081` (API Gateway)
- `/oauth2/**` → `http://localhost:8081` (OAuth flows via gateway)
- `/login/oauth2/**` → `http://localhost:8081`
- `/collab/**` → `http://localhost:8084` (collab-service SockJS, WS-enabled)

### 2. `src/services/api.js`
`API_BASE` changed from `http://localhost:8081` → `''` (relative).
The Vite proxy transparently forwards all `/api/*` requests to the gateway.

### 3. `src/pages/collab/CollabEditorPage.jsx`
`COLLAB_WS_BASE` corrected: was `localhost:8083` (editor-service ❌) → now uses
relative path `''` so SockJS connects to `/collab` via the Vite proxy → collab-service:8084.

### 4. `src/pages/auth/LoginPage.jsx`
OAuth buttons now use relative paths (`/oauth2/authorization/github` etc.)
so they flow through the Vite proxy to the API Gateway, which routes them to auth-service.

## Startup Order

```bash
# 1. Start Eureka
cd service-registry && ./mvnw spring-boot:run

# 2. Start all backend services (in any order, after Eureka)
cd auth-service     && ./mvnw spring-boot:run
cd project-service  && ./mvnw spring-boot:run
cd editor-service   && ./mvnw spring-boot:run
cd collab-service   && ./mvnw spring-boot:run
cd versionservice   && ./mvnw spring-boot:run
cd executionservice && ./mvnw spring-boot:run

# 3. Start API Gateway
cd api-gateway && ./mvnw spring-boot:run

# 4. Start Frontend
cd <this directory>
npm install   # if node_modules not present
npm run dev   # serves on http://localhost:3000
```

## Database Setup
Each service needs its own MySQL database. Check each service's `.env` and 
`application.properties` for the database name and credentials.

| Service         | Default DB Name   |
|----------------|-------------------|
| auth-service    | auth_db (or similar) |
| project-service | project_db        |
| editor-service  | editor_db         |
| collab-service  | collab_session    |
| version-service | version_db        |
| execution-service | execution_db    |

Copy each service's `.env.example` → `.env` and fill in `MYSQLPASS` and `JWTSCRET`.

## CORS
The API Gateway is already configured to allow `http://localhost:3000` with credentials.
The collab-service WebSocket allows all origins via `setAllowedOriginPatterns("*")`.
