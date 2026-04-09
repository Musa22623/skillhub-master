# App Architecture

This workspace now uses the Next.js App Router, with `src/app` as the source of truth.

## Structure

- `app/layout.tsx`: Next.js root layout and global styles entry
- `app/page.tsx`: dashboard entry route
- `app/[...slug]/page.tsx`: registry-backed catch-all route
- `app/NextApp.tsx`: client-side app composition for shared shell/providers
- `app/lib/api/`: backend-facing API clients and temporary mock adapters
- `app/lib/services/`: page-level data orchestration
- `app/lib/mappers/`: API payload to UI model conversion
- `app/lib/types/`: page data contracts
- `app/providers/`: app-wide providers
- `app/layout/`: shell layout such as sidebar and content frame
- `app/navigation/`: sidebar menu model and page registry
- `app/components/`: reusable UI, page scaffolding, and shared types
- `app/features/legacy/`: imported legacy HTML data and React table adapters
- `app/sections/`: menu-aligned domain areas
  - `dashboard/`
  - `users/`
  - `products/`
  - `enrollment/`
  - `financials/`
  - `community/`
  - `platform/`
  - `system/`
  - `shared/`

## Section Rules

- Put section-specific page configs in `app/sections/<section>/config/pages.tsx`.
- Put section-specific custom pages in `app/sections/<section>/pages/`.
- Keep cross-section helpers in `app/sections/shared/`.
- Prefer config-driven pages before creating a custom page.

## UI Rules

- Keep primitive UI in `app/components/ui/`.
- Keep page-level composites in `app/components/page/`.
- Extend `DataTable` and shared cell renderers before duplicating table logic.
- Treat `app/features/legacy/` as the adapter boundary for old HTML-derived data.

## Migration Note

Legacy Vite and duplicate pre-migration source trees have been removed. New work should target `src/app` first.

## Data Flow

- Configured pages should load data through `lib/api -> lib/services -> lib/mappers -> sections/shared/ConfiguredPage`.
- Until the external backend is ready, `app/features/legacy/legacyData.ts` acts as the mock API source for legacy-backed pages.
- Page config files should prefer UI metadata and column definitions over embedding long-lived mock rows directly.
