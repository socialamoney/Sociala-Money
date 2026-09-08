# Supabase

This folder manages Supabase-related assets for SOCIALA MONEY.

## Structure

```
supabase/
  migrations/     # SQL migrations (versioned)
  functions/      # Edge Functions
  seed/           # Seed data (development only)
```

## Important rules

- Claude is responsible for building the database schema.
- Do **not** create or modify tables from this repository without coordination.
- Migrations should be added only when they have been validated.
- Edge Functions will handle sensitive operations (payments, transfers, webhooks, etc.).

## Future Edge Functions (examples)

- process-payment
- process-recharge
- process-withdrawal
- process-transfer
- payment-webhook
- telegram-webhook
- create-payment-link
- process-refund

These will be added progressively.
