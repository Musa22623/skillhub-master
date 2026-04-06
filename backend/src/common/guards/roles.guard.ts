// SRP: Middleware to enforce Role-Based Access Control (RBAC) on admin routes.
// WHAT: A Fastify hook that runs after `auth.guard.ts`. It checks the user's role against required permissions, querying the `admin_permissions` table for the 'Support' role.
// WHY: Enables granular control over the admin panel.
// DEPENDENCIES: `auth.guard.ts`, `admin_permissions` database table.
// REF: "The system should support a custom 'Support' role with granular permissions..."