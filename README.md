# 🎓 TrocScolaire - Frontend

Interface utilisateur de la plateforme d'échange de fournitures scolaires TrocScolaire, construite avec React, Vite et Tailwind CSS.

![TrocScolaire](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-6.0-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

🌐 **Demo Live** : [https://trocscolaire.netlify.app](https://trocscolaire.netlify.app)

📡 **Backend API** : [Troc_Scolaire_Backend](https://github.com/ouatt10/Troc_Scolaire_Backend)

---

## 📋 Table des matières

- [À propos du projet](#-à-propos-du-projet)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#️-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#️-configuration)
- [Démarrage](#-démarrage)
- [Structure du projet](#-structure-du-projet)
- [Déploiement](#-déploiement)
- [Captures d'écran](#-captures-décran)
- [Contribution](#-contribution)
- [Auteur](#-auteur)

---

## 📖 À propos du projet

**TrocScolaire** est une plateforme web qui facilite l'échange et la vente de fournitures scolaires entre étudiants, parents et enseignants. Notre mission est de rendre l'éducation plus accessible en permettant le réemploi de matériel scolaire de qualité.

### 🎯 Problème résolu

- **Coût élevé** des fournitures scolaires neuves
- **Gaspillage** de matériel en bon état
- **Difficulté** à trouver des fournitures d'occasion de confiance

### 💡 Notre solution

Une plateforme intuitive et sécurisée pour :
- Publier des annonces de vente/échange
- Rechercher et filtrer des fournitures
- Communiquer directement avec les vendeurs
- Échanger en toute confiance

---

## ✨ Fonctionnalités

### 🔐 Authentification
- ✅ Inscription et connexion sécurisées
- ✅ Gestion de profil utilisateur
- ✅ Session persistante avec JWT

### 📢 Gestion des annonces
- ✅ Publier une annonce (vente/échange/don)
- ✅ Recherche et filtres avancés (catégorie, niveau, prix, ville)
- ✅ Ajout aux favoris
- ✅ Compteur de vues
- ✅ Statuts d'annonces (active, en attente, validée)

### 💬 Messagerie
- ✅ Chat en temps réel avec Socket.IO
- ✅ Conversations privées entre utilisateurs
- ✅ Notifications de nouveaux messages
- ✅ Historique des conversations

### 👤 Profil utilisateur
- ✅ Informations personnelles éditables
- ✅ Mes annonces publiées
- ✅ Statistiques (annonces, messages, échanges)
- ✅ Annonces favorites

### 🎨 Interface utilisateur
- ✅ Design moderne et responsive
- ✅ Animations fluides avec Framer Motion
- ✅ Mode sombre/clair (à venir)
- ✅ Expérience utilisateur optimisée

---

## 🛠️ Technologies utilisées

### Core
- **React** 18.3 - Bibliothèque UI
- **Vite** 6.0 - Build tool ultra-rapide
- **React Router** 7.1 - Routing

### Styling
- **Tailwind CSS** 3.4 - Framework CSS utility-first
- **Framer Motion** 11.15 - Animations

### État & API
- **Axios** 1.7 - Client HTTP
- **Context API** - Gestion d'état globale
- **Socket.IO Client** 4.8 - Communication temps réel

### Icônes & UI
- **Lucide React** 0.468 - Icônes modernes

### Dev Tools
- **ESLint** - Linting
- **PostCSS** - Transformation CSS
- **Autoprefixer** - Compatibilité navigateurs

---

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

---

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/ouatt10/Troc_Scolaire.git
cd Troc_Scolaire
```

### 2. Installer les dépendances

```bash
npm install
```

---

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# URL de l'API backend
VITE_API_URL=http://localhost:5000/api

# URL Socket.IO (optionnel si même que API)
VITE_SOCKET_URL=http://localhost:5000
```

**En production (Netlify) :**

Ajoutez ces variables dans **Netlify Dashboard** → **Site settings** → **Environment variables** :

```env
VITE_API_URL=https://troc-scolaire-backend.onrender.com/api
```

---

## 🎬 Démarrage

### Mode développement

```bash
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

### Build pour production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

### Preview du build

```bash
npm run preview
```

---

## 📁 Structure du projet

```
Troc_Scolaire/
├── public/
│   ├── favicon.png              # Icône du site
│   ├── _redirects               # Redirections Netlify
│   └── image/                   # Images statiques
├── src/
│   ├── api/
│   │   └── axios.js             # Configuration Axios
│   ├── components/
│   │   ├── Header.jsx           # En-tête navigation
│   │   ├── Footer.jsx           # Pied de page
│   │   ├── AnnonceCard.jsx      # Carte annonce
│   │   └── ProtectedRoute.jsx   # Route protégée
│   ├── context/
│   │   └── AuthContext.jsx      # Contexte authentification
│   ├── pages/
│   │   ├── Home.jsx             # Page d'accueil
│   │   ├── Login.jsx            # Connexion
│   │   ├── Register.jsx         # Inscription
│   │   ├── Profil.jsx           # Profil utilisateur
│   │   ├── Deposer.jsx          # Déposer annonce
│   │   ├── Annonces.jsx         # Liste annonces
│   │   ├── AnnonceDetails.jsx   # Détails annonce
│   │   └── Messages.jsx         # Messagerie
│   ├── App.jsx                  # Composant racine
│   ├── main.jsx                 # Point d'entrée
│   └── index.css                # Styles globaux
├── .env                         # Variables d'environnement
├── .gitignore                   # Fichiers ignorés
├── package.json                 # Dépendances
├── vite.config.js               # Configuration Vite
├── tailwind.config.cjs          # Configuration Tailwind
├── postcss.config.cjs           # Configuration PostCSS
└── README.md                    # Documentation
```

---

## 🌐 Déploiement

### Déploiement sur Netlify

#### Option 1 : Via Git (recommandé)

1. Pushez votre code sur GitHub
2. Connectez-vous sur [Netlify](https://netlify.com)
3. Cliquez sur **"Add new site"** → **"Import an existing project"**
4. Sélectionnez votre repo GitHub
5. Configurez :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
6. Ajoutez les variables d'environnement (voir [Configuration](#️-configuration))
7. Déployez ! 🚀

#### Option 2 : Via Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Build du projet
npm run build

# Déployer
netlify deploy --prod
```

### Configuration Netlify

Ajoutez un fichier `public/_redirects` pour gérer les routes React :

```
/*    /index.html   200
```

---

## 📸 Captures d'écran

### 🏠 Page d'accueil
Interface accueillante avec recherche rapide et annonces récentes.

### 📋 Liste des annonces
Filtres puissants par catégorie, niveau, prix et localisation.

### 💬 Messagerie
Chat en temps réel pour communiquer avec les vendeurs.

### 👤 Profil utilisateur
Gestion complète de vos informations et annonces.

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commitez vos changements (`git commit -m 'Add: Amazing feature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Guidelines

- Utilisez des commits clairs et descriptifs
- Respectez la structure du code existante
- Testez vos modifications avant de soumettre
- Documentez les nouvelles fonctionnalités

---

## 🐛 Signaler un bug

Si vous trouvez un bug, ouvrez une [issue](https://github.com/ouatt10/Troc_Scolaire/issues) avec :
- Une description claire du problème
- Les étapes pour reproduire
- Le comportement attendu vs actuel
- Des captures d'écran si possible

---

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 👤 Auteur

**OUATTARA El Hadj Fetigue**

- 🐙 GitHub: [@ouatt10](https://github.com/ouatt10)
- 💼 LinkedIn: [El Hadj Fetigue OUATTARA](https://linkedin.com/in/votre-profil)
- 📧 Email: votre.email@example.com
- 🌐 Portfolio: [votre-portfolio.com](https://votre-portfolio.com)

---

## 🔗 Liens utiles

- **Frontend Live** : [https://trocscolaire.netlify.app](https://trocscolaire.netlify.app)
- **Backend API** : [https://troc-scolaire-backend.onrender.com](https://troc-scolaire-backend.onrender.com)
- **Backend Repo** : [Troc_Scolaire_Backend](https://github.com/ouatt10/Troc_Scolaire_Backend)
- **Documentation API** : [API Endpoints](https://github.com/ouatt10/Troc_Scolaire_Backend#-api-endpoints)

---

## 🙏 Remerciements

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Socket.IO](https://socket.io/)

---

## 📊 Statistiques du projet

![GitHub stars](https://img.shields.io/github/stars/ouatt10/Troc_Scolaire?style=social)
![GitHub forks](https://img.shields.io/github/forks/ouatt10/Troc_Scolaire?style=social)
![GitHub issues](https://img.shields.io/github/issues/ouatt10/Troc_Scolaire)

---

⭐ **Si ce projet vous a aidé, n'hésitez pas à lui donner une étoile sur GitHub !**

💡 **Des suggestions d'amélioration ?** Ouvrez une issue ou contactez-moi directement !

🚀 **Bonne exploration de TrocScolaire !**