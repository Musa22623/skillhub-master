// SRP: Application entry point & main process orchestrator.
// WHAT: Initializes the Fastify server instance, registers all global plugins (e.g., CORS, helmet for security, @fastify/rate-limit), applies global hooks (e.g., for authentication), iterates through all module route definitions to register them, and starts the server to listen on the configured port.
// WHY: Provides a single, unified starting point for launching the backend application, making the server setup process predictable and easy to manage in a containerized environment like Northflank.
// HOW: It imports the root application module/plugins, creates a Fastify instance, configures it using settings from the `config` module, and calls `app.listen()`.
// DEPENDENCIES: `fastify`, `config/index.ts`, all `*.routes.ts` files.
// REF: Decision to use Fastify for its performance benefits.