# projet-notes

Plateforme multi-tenant pour la gestion d'écoles (extensible aux mosquées/associations/centres).

## Stack technique

- **Next.js 14** avec App Router et TypeScript
- **Prisma** + **PostgreSQL** (Neon)
- **TailwindCSS** + PostCSS + autoprefixer
- **Déploiement Netlify** via `@netlify/plugin-nextjs`
- **Multi-tenant strict** (toutes requêtes filtrées par tenantId)

## Démarrage rapide

### 1. Installation des dépendances
```bash
pnpm install
```

### 2. Configuration de l'environnement
```bash
cp .env.example .env
```

Renseignez dans `.env` :
- `DATABASE_URL` : URL de votre base Neon PostgreSQL
- `AUTH_SECRET` : Clé secrète forte pour l'authentification

### 3. Base de données
```bash
# Migration de la base
pnpm db:migrate

# Données de test
pnpm db:seed
```

### 4. Démarrage du serveur
```bash
pnpm dev
```

Visitez `http://localhost:3000` puis `http://localhost:3000/s/masjid-noor/dashboard`

## Scripts disponibles

- `pnpm dev` - Serveur de développement
- `pnpm build` - Build de production
- `pnpm start` - Serveur de production
- `pnpm prisma:studio` - Interface Prisma Studio
- `pnpm db:migrate` - Migrations Prisma
- `pnpm db:seed` - Données de test
- `pnpm test` - Tests Vitest

## Déploiement Netlify

### Configuration requise
- Build command: `pnpm build`
- Publish directory: `.next`
- Plugin: `@netlify/plugin-nextjs`

### Variables d'environnement
```
DATABASE_URL=postgresql://...
AUTH_SECRET=...
NEXTAUTH_URL=https://votre-site.netlify.app
NEXT_PUBLIC_APP_URL=https://votre-site.netlify.app
```

## Architecture multi-tenant

Toutes les entités sont isolées par `tenantId`. Le routage utilise `/s/[tenant]/...` pour identifier le tenant actuel.

## Fonctionnalités

- ✅ Gestion des tenants (écoles/mosquées/centres)
- ✅ Utilisateurs et rôles
- ✅ Classes et matières
- ✅ Inscriptions et présences
- ✅ Notes et évaluations
- ✅ Progression Coranique
- 🔄 Authentification (placeholder)
- 🔄 i18n FR/EN/AR (futur)
