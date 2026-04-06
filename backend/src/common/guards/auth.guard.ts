// SRP: Middleware to protect routes by verifying a JSON Web Token (JWT).
// WHAT: A Fastify hook that intercepts requests, extracts the JWT from the header, validates it, and attaches the decoded user payload to the request. Throws a 401 Unauthorized error if invalid.
// WHY: It is the primary mechanism for securing endpoints that require user authentication.
// DEPENDENCIES: `@fastify/jwt`.