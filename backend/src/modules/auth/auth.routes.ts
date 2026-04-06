/**
 * SRP: Define and configure all authentication-related API routes
 * 
 * WHAT:
 * - Maps HTTP endpoints to authentication controller methods
 * - Defines route-level middleware and validation
 * - Configures public vs protected route access
 * 
 * WHY:
 * - Centralizes authentication route definitions
 * - Provides clear API surface for authentication operations
 * - Enables route-level security and validation
 * 
 * HOW:
 * - Uses Express Router for route definition
 * - Applies validation middleware for request data
 * - Configures authentication guards where needed
 * - Implements rate limiting for sensitive endpoints
 * 
 * DEPENDENCIES:
 * - Express Router
 * - Authentication controller
 * - Validation middleware
 * - Rate limiting middleware
 * - Authentication guards
 * 
 * REF:
 * - auth.controller.ts
 * - auth.service.ts
 * - common/guards/auth.guard.ts
 */