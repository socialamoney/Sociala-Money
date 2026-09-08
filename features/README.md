# Features

This folder contains domain-specific feature modules for SOCIALA MONEY.

Each feature should be self-contained as much as possible:

```
features/
  auth/
  kyc/
  wallet/
  transactions/
  recharge/
  withdrawal/
  transfers/
  collections/
  payments/
  shops/
  products/
  orders/
  customers/
  virtual-card/
  affiliation/
  notifications/
  support/
  security/
  analytics/
  administration/
```

Recommended structure per feature:

```
feature-name/
  components/
  hooks/
  services/
  types.ts
  index.ts
```

Do not implement business logic here yet. This is the foundation.
