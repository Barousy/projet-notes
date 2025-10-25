# 🏢 Guide : Créer une nouvelle entité

Ce guide vous explique comment créer une nouvelle entité (tenant) pour qu'une structure puisse tester l'application avec ses propres données.

## 📋 Prérequis

1. **Node.js installé** (voir `INSTALLATION.md`)
2. **Accès à la base de données PostgreSQL** (variables d'environnement configurées)
3. **Git configuré** pour les déploiements

## 🚀 Étapes pour créer une nouvelle entité

### Étape 1 : Créer le slug de l'entité

Choisissez un **slug unique** pour votre entité (ex: `ecole-ibn-khaldoun`, `centre-al-andalous`).

Le slug doit :
- Être en minuscules
- Contenir uniquement des lettres, chiffres et tirets
- Être court et mémorable
- Exemple : `ecole-ibn-khaldoun`

### Étape 2 : Modifier le script de seed

Modifiez le fichier `prisma/seed.mjs` pour ajouter votre nouvelle entité :

```javascript
async function main() {
  // Créer la nouvelle entité
  const newTenant = await prisma.tenant.upsert({ 
    where: { slug: "votre-slug-ici" }, 
    update: {}, 
    create: { 
      slug: "votre-slug-ici", 
      name: "Nom de votre école/centre",
      timezone: "Europe/Paris"
    } 
  });
  
  // Créer l'administrateur principal
  const admin = await prisma.user.upsert({ 
    where: { email: "admin@votre-ecole.com" }, 
    update: {}, 
    create: { 
      email: "admin@votre-ecole.com", 
      name: "Prénom Nom",
      phone: "+33 X XX XX XX XX"
    } 
  });
  
  // Associer l'admin à l'entité
  await prisma.userOnTenant.upsert({ 
    where: { userId_tenantId: { userId: admin.id, tenantId: newTenant.id } }, 
    update: { role: Role.SUPER_ADMIN }, 
    create: { userId: admin.id, tenantId: newTenant.id, role: Role.SUPER_ADMIN } 
  });
  
  // Créer l'année scolaire
  const year = await prisma.schoolYear.create({ 
    data: { 
      tenantId: newTenant.id, 
      name: "2025-2026", 
      startDate: new Date("2025-09-01"), 
      endDate: new Date("2026-07-01") 
    } 
  });
  
  // Créer les salles
  const rooms = await Promise.all([
    prisma.room.create({ data: { tenantId: newTenant.id, name: "Salle 1", capacity: 25 } }),
    prisma.room.create({ data: { tenantId: newTenant.id, name: "Salle 2", capacity: 20 } }),
    // Ajoutez plus de salles si nécessaire
  ]);
  
  // Créer les matières
  const subjects = await Promise.all([
    prisma.subject.create({ data: { tenantId: newTenant.id, schoolYearId: year.id, name: "Coran", category: "quran", coefficient: 3 } }),
    prisma.subject.create({ data: { tenantId: newTenant.id, schoolYearId: year.id, name: "Arabe", category: "language", coefficient: 2 } }),
    // Ajoutez vos matières spécifiques
  ]);
  
  // Créer les classes
  const classes = await Promise.all([
    prisma.class.create({ data: { tenantId: newTenant.id, schoolYearId: year.id, name: "Groupe Coran Débutants", roomId: rooms[0].id } }),
    prisma.class.create({ data: { tenantId: newTenant.id, schoolYearId: year.id, name: "Groupe Arabe Niveau 1", roomId: rooms[1].id } }),
    // Ajoutez vos classes
  ]);
  
  console.log("✅ Entité créée:", newTenant.name);
}
```

### Étape 3 : Exécuter le seed

```bash
npm run db:seed
```

Ou directement avec Node.js :

```bash
node prisma/seed.mjs
```

### Étape 4 : Accéder à l'entité

Une fois le seed exécuté, accédez à l'entité via :

**https://projet-notes.netlify.app/s/votre-slug-ici/dashboard**

## 📝 Données à créer pour une nouvelle entité

### Obligatoires :
1. ✅ **Tenant** (entité) - Slug et nom
2. ✅ **User** (administrateur) - Email et nom
3. ✅ **UserOnTenant** - Association admin/entité
4. ✅ **SchoolYear** - Année scolaire

### Recommandées :
5. 📚 **Subjects** (matières) - Coran, Arabe, etc.
6. 🏫 **Classes** - Groupes d'étudiants
7. 🏢 **Rooms** (salles) - Salles de cours
8. 👥 **Students** (étudiants) - Inscriptions
9. 👨‍👩‍👧‍👦 **Guardians** (tuteurs) - Parents/responsables
10. 📅 **Sessions** - Emploi du temps

## 🎯 Exemple complet : École Ibn Khaldoun

```javascript
// Slug: ecole-ibn-khaldoun
const tenant = await prisma.tenant.upsert({ 
  where: { slug: "ecole-ibn-khaldoun" }, 
  update: {}, 
  create: { 
    slug: "ecole-ibn-khaldoun", 
    name: "École Ibn Khaldoun",
    timezone: "Europe/Paris"
  } 
});

const admin = await prisma.user.upsert({ 
  where: { email: "directeur@ibn-khaldoun.fr" }, 
  update: {}, 
  create: { 
    email: "directeur@ibn-khaldoun.fr", 
    name: "Mohamed Al-Hassan",
    phone: "+33 1 23 45 67 89"
  } 
});

// Associer l'admin
await prisma.userOnTenant.upsert({ 
  where: { userId_tenantId: { userId: admin.id, tenantId: tenant.id } }, 
  update: { role: Role.SUPER_ADMIN }, 
  create: { userId: admin.id, tenantId: tenant.id, role: Role.SUPER_ADMIN } 
});

// Année scolaire
const year = await prisma.schoolYear.create({ 
  data: { 
    tenantId: tenant.id, 
    name: "2025-2026", 
    startDate: new Date("2025-09-01"), 
    endDate: new Date("2026-07-01") 
  } 
});

// Salles
const rooms = await Promise.all([
  prisma.room.create({ data: { tenantId: tenant.id, name: "Salle principale", capacity: 30 } }),
  prisma.room.create({ data: { tenantId: tenant.id, name: "Salle annexe", capacity: 15 } }),
]);

// Matières
const subjects = await Promise.all([
  prisma.subject.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Coran", category: "quran", coefficient: 3 } }),
  prisma.subject.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Tajwid", category: "quran", coefficient: 2 } }),
  prisma.subject.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Arabe", category: "language", coefficient: 2 } }),
]);

// Classes
const classes = await Promise.all([
  prisma.class.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Groupe Coran Débutants", roomId: rooms[0].id } }),
  prisma.class.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Groupe Arabe Niveau 1", roomId: rooms[1].id } }),
]);
```

URL d'accès : **https://projet-notes.netlify.app/s/ecole-ibn-khaldoun/dashboard**

## 🔐 Accès et sécurité

### Créer un mot de passe pour l'admin

Actuellement, l'authentification n'est pas encore implémentée. Pour l'instant :
- Toutes les pages sont accessibles sans mot de passe
- L'entité est protégée par son slug unique
- Seuls ceux qui connaissent le slug peuvent accéder

### Évolution future

Vous pourrez ajouter plus tard :
- Authentification par email/mot de passe
- Gestion des permissions (admin, professeur, parent)
- Interface de connexion sécurisée

## 📊 Gestion après création

Une fois l'entité créée, les utilisateurs peuvent :
1. ✅ Voir le dashboard avec les statistiques
2. ✅ Gérer les étudiants (via `/s/slug/students`)
3. ✅ Gérer les classes (via `/s/slug/classes`)
4. ✅ Prendre les présences (via `/s/slug/attendance`)
5. ✅ Ajouter des notes (via `/s/slug/grades`)
6. ✅ Suivre le Coran (via `/s/slug/quran`)

## 🚨 Important

- **Slug unique** : Chaque entité doit avoir un slug unique
- **Email unique** : Chaque utilisateur (admin) doit avoir un email unique
- **Données isolées** : Chaque entité ne voit que ses propres données
- **Multi-tenant** : Plusieurs entités peuvent coexister sur la même plateforme

## 📞 Support

Pour toute question ou problème lors de la création d'une nouvelle entité, consultez les logs du seed ou vérifiez que le slug n'existe pas déjà dans la base de données.
