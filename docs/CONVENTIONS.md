# Conventions de développement - SOCIALA MONEY

## Commits

Utiliser le format conventionnel :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `security:` Amélioration de sécurité
- `refactor:` Refactorisation
- `docs:` Documentation
- `chore:` Tâches de maintenance / configuration
- `style:` Formatage (sans changement de logique)
- `test:` Ajout ou modification de tests

## Structure des features

Chaque domaine métier doit être isolé autant que possible dans `features/<domain>/`.

## TypeScript

- Mode `strict` activé
- Éviter `any`
- Préférer les types générés depuis Supabase dès que possible

## Sécurité

- Aucun secret dans le code
- Aucune modification directe de soldes / ledger / KYC / rôles depuis le frontend
- Toutes les opérations financières via Edge Functions ou server actions sécurisées

## Nommage

- Fichiers : kebab-case ou camelCase selon le contexte (composants en PascalCase)
- Composants React : PascalCase
- Fonctions et variables : camelCase
