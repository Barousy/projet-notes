# 🚀 Guide d'installation pour ajouter du vrai contenu

## 📋 Prérequis

Pour ajouter du vrai contenu à votre application, vous devez installer Node.js.

### 1. Installer Node.js

1. **Téléchargez Node.js** depuis : https://nodejs.org/
2. **Choisissez la version LTS** (recommandée)
3. **Installez** en suivant les instructions
4. **Redémarrez** votre terminal/PowerShell

### 2. Vérifier l'installation

```bash
node --version
npm --version
```

### 3. Ajouter des données réelles

Une fois Node.js installé, exécutez :

```bash
npm run db:seed
```

Cela ajoutera :
- ✅ 1 tenant : Masjid An-Noor
- ✅ 1 admin : Sheikh Ahmed Al-Mansouri
- ✅ 1 année scolaire : 2025-2026
- ✅ 4 salles
- ✅ 5 matières (Coran, Tajwid, Arabe, Tafsir, Fiqh)
- ✅ 5 classes
- ✅ 8 étudiants avec matricules
- ✅ 5 tuteurs
- ✅ Présences, notes, progressions Coraniques

### 4. Accéder aux vraies données

- **Dashboard réel** : https://projet-notes.netlify.app/s/masjid-noor/dashboard
- **Étudiants réels** : https://projet-notes.netlify.app/s/masjid-noor/students
- **Classes réelles** : https://projet-notes.netlify.app/s/masjid-noor/classes

### 5. Mode démo conservé

Le mode démo reste intact pour vos présentations :
- **Dashboard démo** : https://projet-notes.netlify.app/s/masjid-noor/dashboard (avec bannière démo)
- **Pages démo** : https://projet-notes.netlify.app/s/masjid-noor/demo/*

## 🎯 Stratégie

- **Mode démo** : Pour les présentations clients (données statiques)
- **Vraies données** : Pour la gestion réelle (base de données)
- **Interface identique** : Même design, données différentes
