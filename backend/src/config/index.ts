// SRP: Centralized, type-safe configuration loader.
// WHAT: Uses `dotenv` to load environment variables from a `.env` file and `zod` to validate them into a strongly-typed configuration object. It exposes secrets for databases, external APIs (LW, PayPal, Resend), and application settings.
// WHY: Prevents hard-coding secrets, enforces required configurations at startup, and makes the application portable across different environments.
// DEPENDENCIES: `dotenv`, `zod`.