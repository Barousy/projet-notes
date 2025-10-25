# 🎯 Guide Rapide : Créer une Nouvelle Entité

## 🚀 Procédure en 3 étapes

### 1️⃣ Modifier le fichier de configuration

Ouvrez `prisma/add-tenant.mjs` et modifiez les variables dans l'objet `CONFIG` :

```javascript
const CONFIG = {
  slug: "ecole-ibn-khaldoun",  // ← Changez le slug
  name: "École Ibn Khaldoun",  // ← Changez le nom
  
  admin: {
    email: "directeur@ibn-khaldoun.fr",  // ← Email de l'admin
    name: "Mohamed Al-Hassan",             // ← Nom de l'admin
    phone: "+33 1 23 45 67 89"            // ← Téléphone
  },
  
  // ... personnalisez salles, matières, classes
};
```

### 2️⃣ Exécuter le script

```bash
node prisma/add-tenant.mjs
```

### 3️⃣ Accéder à l'entité

**https://projet-notes.netlify.app/s/[votre-slug]/dashboard**

---

## 📝 Exemple complet : Centre Al-Andalous

### Étape 1 : Configuration

```javascript
const CONFIG = {
  slug: "centre-al-andalous",
  name: "Centre Culturel Al-Andalous",
  
  admin: {
    email: "admin@al-andalous.fr",
    name: "Fatima Zahra",
    phone: "+33 6 12 34 56 78"
  },
  
  schoolYear: {
    name: "2025-2026",
    startDate: "2025-09-01",
    endDate: "2026-07-01"
  },
  
  rooms: [
    { name: "Salle 1", capacity: 25 },
    { name: "Salle 2", capacity: 20 }
  ],
  
  subjects: [
    { name: "Coran", category: "quran", coefficient: 3 },
    { name: "Arabe", category: "language", coefficient: 2 }
  ],
  
  classes: [
    { name: "Groupe Coran Adultes", roomIndex: 0 },
    { name: "Groupe Arabe", roomIndex: 1 }
  ]
};
```

### Étape 2 : Exécution

```bash
node prisma/add-tenant.mjs
```

### Étape 3 : Accès

**https://projet-notes.netlify.app/s/centre-al-andalous/dashboard**

---

## 🎯 Ce que l'entité peut faire

Une fois créée, l'entité peut :

1. ✅ **Accéder au dashboard** avec des statistiques
2. ✅ **Gérer les étudiants** : ajouter, modifier, supprimer
3. ✅ **Gérer les classes** : créer, organiser, planifier
4. ✅ **Prendre les présences** : suivre l'assiduité
5. ✅ **Ajouter des notes** : saisir et suivre les notes
6. ✅ **Suivre le Coran** : progression coranique
7. ✅ **Voir l'emploi du temps** : planning hebdomadaire

---

## 📊 Données créées automatiquement

Pour chaque nouvelle entité, le script crée :

- ✅ 1 Tenant (entité)
- ✅ 1 User (administrateur)
- ✅ 1 UserOnTenant (association)
- ✅ 1 SchoolYear (année scolaire)
- ✅ N Rooms (salles configurées)
- ✅ N Subjects (matières configurées)
- ✅ N Classes (classes configurées)

---

## 🔐 Sécurité

- **Données isolées** : Chaque entité ne voit que ses propres données
- **Slug unique** : Requis pour accéder à l'entité
- **Multi-tenant** : Plusieurs entités coexistent sur la même plateforme

---

## 💡 Conseils

1. **Slug descriptif** : Utilisez un slug clair et mémorable
2. **Email unique** : Chaque admin doit avoir un email unique
3. **Testez l'accès** : Vérifiez que l'URL fonctionne après création
4. **Personnalisez** : Adaptez salles, matières et classes à vos besoins

---

## 🆘 Besoin d'aide ?

Consultez `GUIDE_NOUVELLE_ENTITE.md` pour plus de détails.
