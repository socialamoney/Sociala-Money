# Components

Shared UI components for SOCIALA MONEY.

Structure recommendation:

```
components/
  ui/           # Base UI primitives (Button, Input, Card, etc.)
  layout/       # Layout components (Sidebar, Header, etc.)
  forms/        # Form-related components
  feedback/     # Toast, Modal, Alert, etc.
```

Keep components pure and reusable. Business logic belongs in `features/`.
