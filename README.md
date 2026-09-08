# SOCIALA MONEY

Plateforme fintech africaine développée par **Sociala Agency**.

> Recevoir, gérer, envoyer et utiliser de l'argent à travers plusieurs moyens de paiement locaux et internationaux.

## Les 4 piliers

1. **COLLECTE** — Payment Links & QR codes
2. **CARTE** — Carte virtuelle
3. **TRANSFERT** — Transferts nationaux & internationaux
4. **BOUTIQUE** — Jusqu'à 3 boutiques gratuites par compte

## Stack technique

| Couche              | Technologie                                      |
|---------------------|--------------------------------------------------|
| Frontend            | Next.js 15 + React 19 + TypeScript + Tailwind CSS |
| Backend             | Supabase (PostgreSQL + Auth + Storage + Edge Functions + RLS) |
| Email               | Resend                                           |
| Notifications       | Telegram Bot API                                 |
| Déploiement         | Vercel (recommandé)                             |

## Architecture du repository

```
Sociala-Money/
├── app/                    # Next.js App Router (pages & layouts)
├── components/             # Composants UI réutilisables
├── features/               # Modules métier (auth, wallet, shops...)
├── hooks/                  # Hooks React partagés
├── lib/                    # Utilitaires & clients Supabase
├── services/               # Services transverses
├── types/                  # Types TypeScript
├── supabase/
│   ├── migrations/         # Migrations SQL versionnées
│   ├── functions/          # Edge Functions
│   └── seed/               # Données de développement
├── docs/                   # Documentation
├── public/                 # Assets statiques
├── tests/                  # Tests (futur)
├── middleware.ts           # Gestion de session Supabase
├── .env.example            # Variables d'environnement (placeholders)
└── ...
```

## Rôle de Supabase

Supabase est le backend principal. Il gère :

- Base de données PostgreSQL
- Authentification
- Stockage de fichiers
- Row Level Security (RLS)
- Edge Functions (opérations sensibles)
- Realtime

**Important** : Le schéma de base de données est construit séparément. Ce repository se connecte à Supabase, il ne recrée pas les tables.

## Installation locale

1. **Cloner le repository**

```bash
git clone https://github.com/socialamoney/Sociala-Money.git
cd Sociala-Money
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer l'environnement**

```bash
cp .env.example .env.local
```

Remplir les variables (voir `.env.example`).

4. **Lancer le serveur de développement**

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

| Commande          | Description                    |
|-------------------|--------------------------------|
| `npm run dev`     | Serveur de développement       |
| `npm run build`   | Build de production            |
| `npm run start`   | Lancer le build de production  |
| `npm run lint`    | Linter ESLint                  |
| `npm run type-check` | Vérification TypeScript     |

## Sécurité

- Ne jamais committer de secrets réels (service_role key, tokens, clés API...)
- Les variables `NEXT_PUBLIC_*` sont exposées au navigateur
- Les opérations financières passent obligatoirement par le backend (Edge Functions)
- Le frontend ne peut pas modifier directement les soldes, le ledger, les rôles ou le statut KYC

## État actuel du projet

**Fondation du repository en place.**

Les fonctionnalités métier (auth, wallet, collecte, transferts, boutiques, etc.) seront ajoutées progressivement une fois la base de données Supabase stabilisée.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)

## Licence

Propriétaire — Sociala Agency
