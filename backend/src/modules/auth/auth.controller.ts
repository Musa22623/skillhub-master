/**
 * SRP: Handle HTTP requests and responses for authentication operations
 * 
 * WHAT:
 * - Processes authentication-related HTTP requests
 * - Validates request data and formats responses
 * - Delegates business logic to auth service
 * - Manages HTTP status codes and error responses
 * 
 * WHY:
 * - Separates HTTP concerns from business logic
 * - Provides consistent API response format
 * - Handles request/response transformation
 * - Centralizes authentication endpoint logic
 * 
 * HOW:
 * - Receives and validates HTTP requests
 * - Calls appropriate auth service methods
 * - Formats service responses for HTTP
 * - Handles errors and returns appropriate status codes
 * - Manages cookies/tokens for session management
 * 
 * DEPENDENCIES:
 * - Authentication service
 * - Request validation utilities
 * - Response formatting utilities
 * - JWT/session management utilities
 * 
 * REF:
 * - auth.service.ts
 * - auth.routes.ts
 * - common/dto/pagination.dto.ts
 */