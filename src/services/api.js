// src/services/api.js - Optimisé pour Vercel

// Import statique des données JSON
import usersData from "../data/users.json";
import annoncesData from "../data/annonces.json";
import messagesData from "../data/messages.json";
import categoriesData from "../data/categories.json";

class MockAPI {
  // ===== UTILISATEURS =====
  async getUsers() {
    return usersData.users;
  }

  async getUserById(id) {
    return usersData.users.find(u => u.id === parseInt(id));
  }

  async createUser(userData) {
    const newUser = {
      id: Math.max(...usersData.users.map(u => u.id)) + 1,
      ...userData,
      role: "user",
      isAdmin: false,
      dateInscription: new Date().toISOString().split('T')[0],
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      annoncesCount: 0,
      messagesCount: 0,
      noteMoyenne: 0,
      echangesReussis: 0
    };
    return newUser;
  }

  async updateUser(id, userData) {
    await this.simulateDelay();
    const index = usersData.users.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
      usersData.users[index] = { ...usersData.users[index], ...userData };
      return usersData.users[index];
    }
    throw new Error("Utilisateur non trouvé");
  }

  // ===== ANNONCES =====
  async getAnnonces(filters = {}) {
    await this.simulateDelay();
    let result = [...annoncesData.annonces];

    if (filters.categorie) {
      result = result.filter(a => a.categorie === filters.categorie);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(a => 
        a.titre.toLowerCase().includes(search) || 
        a.description.toLowerCase().includes(search)
      );
    }
    if (filters.auteurId) {
      result = result.filter(a => a.auteurId === filters.auteurId);
    }

    return result;
  }

  async getAnnonceById(id) {
    await this.simulateDelay();
    return annoncesData.annonces.find(a => a.id === parseInt(id));
  }

  async createAnnonce(annonceData) {
    await this.simulateDelay();
    const newAnnonce = {
      id: Math.max(...annoncesData.annonces.map(a => a.id)) + 1,
      ...annonceData,
      datePublication: new Date().toISOString(),
      dateModification: new Date().toISOString(),
      statut: "active",
      vues: 0,
      favorites: 0,
      commentaires: 0,
      troqueAvec: null
    };
    return newAnnonce;
  }

  async updateAnnonce(id, annonceData) {
    await this.simulateDelay();
    const index = annoncesData.annonces.findIndex(a => a.id === parseInt(id));
    if (index !== -1) {
      annoncesData.annonces[index] = { 
        ...annoncesData.annonces[index], 
        ...annonceData,
        dateModification: new Date().toISOString()
      };
      return annoncesData.annonces[index];
    }
    throw new Error("Annonce non trouvée");
  }

  async deleteAnnonce(id) {
    await this.simulateDelay();
    const index = annoncesData.annonces.findIndex(a => a.id === parseInt(id));
    if (index !== -1) {
      annoncesData.annonces.splice(index, 1);
      return true;
    }
    throw new Error("Annonce non trouvée");
  }

  // ===== MESSAGES =====
  async getMessages(userId) {
    await this.simulateDelay();
    return messagesData.messages.filter(m => 
      m.emetteerId === userId || m.recepteurId === userId
    );
  }

  async sendMessage(messageData) {
    await this.simulateDelay();
    const newMessage = {
      id: Math.max(...messagesData.messages.map(m => m.id), 0) + 1,
      ...messageData,
      dateEnvoi: new Date().toISOString(),
      lu: false
    };
    return newMessage;
  }

  // ===== CATÉGORIES =====
  async getCategories() {
    await this.simulateDelay();
    return categoriesData.categories;
  }

  // ===== AUTHENTIFICATION =====
  async login(email, password) {
    await this.simulateDelay();
    const user = usersData.users.find(u => u.email === email && u.password === password);
    if (user) {
      return user;
    }
    throw new Error("Email ou mot de passe incorrect");
  }
}

export default new MockAPI();