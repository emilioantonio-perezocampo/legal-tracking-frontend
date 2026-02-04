# LegalTracking Frontend - Project Context

## Project Overview
This is the new LegalTracking enterprise platform frontend, replacing a legacy system. It's a production-grade, self-hosted Next.js application designed for legal practice management.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: 
  - **Server State**: TanStack Query (v5)
  - **Client State**: Zustand
- **Forms**: React Hook Form + Zod
- **Tables**: TanStack Table
- **Auth**: Supabase Auth (via `@supabase/ssr`)
- **API**: FastAPI (REST)

## Project Structure
```
legaltracking-web/
├── app/
│   ├── (public)/       # Public routes (Login)
│   ├── (protected)/    # Authenticated routes (Dashboard, Expedientes)
│   ├── layout.tsx      # Root layout with Providers
│   └── globals.css
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── forms/          # Form-specific components
│   ├── tables/         # Table configurations
│   └── layout/         # Layout components (Sidebar, etc.)
├── lib/
│   ├── api/            # API client and service functions
│   ├── auth/           # Supabase auth helpers (Client, Server, Middleware)
│   ├── hooks/          # Custom React hooks
│   └── utils.ts        # Utility functions (cn, etc.)
├── stores/             # Zustand stores
├── types/              # TypeScript global types
├── Dockerfile          # Multi-stage production build
├── docker-compose.yml  # Deployment configuration
└── .env.example        # Environment variables template
```

## Key Workflows

### Authentication
- Middleware handles session refresh and protected route redirects.
- `lib/auth/server.ts` is used for Server Components.
- `lib/auth/client.ts` is used for Client Components.

### Data Fetching
- Use `lib/api/client.ts` for fetch requests.
- Always wrap API calls in TanStack Query `useQuery` or `useMutation`.

### Forms
- Use `react-hook-form` with `zodResolver`.
- Components in `components/forms/` should follow the `login-form.tsx` pattern.

## Development & Deployment
- **Local Dev**: `npm run dev`
- **Docker Build**: `docker build -t legaltracking-web .`
- **Docker Run**: `docker-compose up -d`

## Design Guidelines
- Maintain high contrast and professional aesthetics.
- Components should be kept under 150 lines where possible.
- Use absolute imports (`@/components/...`).
