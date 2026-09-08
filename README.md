# Sociala Money 💰

Application web sociale de gestion d'argent.

## Stack technique
- **Frontend** : Next.js + React + Tailwind CSS
- **Backend / Base de données** : Supabase (PostgreSQL + Auth + Realtime + Storage)
- **Déploiement** : Vercel (recommandé)

## Fonctionnalités prévues
- Authentification (email / Google / etc.)
- Gestion de transactions
- Partage social d'objectifs d'épargne
- Dashboard en temps réel
- Profils utilisateurs

## Installation

1. Clone le repo :
```bash
git clone https://github.com/socialamoney/Sociala-Money.git
cd Sociala-Money
```

2. Installe les dépendances :
```bash
npm install
```

3. Configure les variables d'environnement :
```bash
cp .env.example .env.local
```
Puis ajoute tes clés Supabase :
```
NEXT_PUBLIC_SUPABASE_URL=ton_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=ta_clé
```

4. Lance le projet :
```bash
npm run dev
```

## Structure du projet (à venir)
```
/
├── app/                 # Next.js App Router
├── components/          # Composants React
├── lib/                 # Utilitaires (supabase client...)
├── public/              # Assets
└── ...
```

## Contribution
Les contributions sont les bienvenues !

---
Créé avec ❤️ pour Sociala Money
