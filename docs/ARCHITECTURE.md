# Architecture - SOCIALA MONEY

## Overview

SOCIALA MONEY is a fintech platform built with:

- **Frontend**: Next.js 15 (App Router) + React + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Edge Functions + RLS)
- **Email**: Resend
- **Notifications**: Telegram Bot API

## Separation of concerns

| Layer              | Responsibility                                      | Location          |
|--------------------|-----------------------------------------------------|-------------------|
| UI Components      | Reusable presentational components                  | `components/`     |
| Features           | Domain logic, pages, feature-specific components    | `features/`       |
| Services           | Cross-cutting services                              | `services/`       |
| Supabase clients   | Browser / Server / Middleware clients               | `lib/supabase/`   |
| Types              | Shared TypeScript types                             | `types/`          |
| Edge Functions     | Sensitive backend operations                        | `supabase/functions/` |
| Migrations         | Database schema changes                             | `supabase/migrations/` |

## Security rules

- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client.
- All financial operations must go through Edge Functions or server-side logic.
- Frontend must never directly update balances, ledger, transaction status, roles, or KYC status.
- RLS policies protect data access.

## Environments

- `development`
- `staging`
- `production`

Secrets must be different per environment and never committed.
