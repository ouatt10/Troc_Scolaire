// src/services/api.js - Service API pour simuler le backend

class MockAPI {
  constructor() {
    this.delay = 500; // Délai de simulation (ms)
  }

  // Utilitaire pour simuler un délai réseau
  async simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, this.delay));
  }

  // ===== UTILISATEURS =====
  async getUsers() {
    await this.simulateDelay();
    const users = await import("../data/users.json");
    return users.users;
  }

  async getUserById(id) {
    await this.simulateDelay();
    const users = await import("../data/users.json");
    return users.users.find(u => u.id === parseInt(id));
  }

  async createUser(userData) {
    await this.simulateDelay();
    const users = await import("../data/users.json");
    const newUser = {
      id: Math.max(...users.users.map(u => u.id)) + 1,
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
    users.users.push(newUser);
    localStorage.setItem("mockUsers", JSON.stringify(users.users));
    return newUser;
  }

  async updateUser(id, userData) {
    await this.simulateDelay();
    const users = await import("../data/users.json");
    const index = users.users.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
      users.users[index] = { ...users.users[index], ...userData };
      localStorage.setItem("mockUsers", JSON.stringify(users.users));
      return users.users[index];
    }
    throw new Error("Utilisateur non trouvé");
  }

  // ===== ANNONCES =====
  async getAnnonces(filters = {}) {
    await this.simulateDelay();
    const annonces = await import("../data/annonces.json");
    let result = annonces.annonces;

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
    const annonces = await import("../data/annonces.json");
    return annonces.annonces.find(a => a.id === parseInt(id));
  }

  async createAnnonce(annonceData) {
    await this.simulateDelay();
    const annonces = await import("../data/annonces.json");
    const newAnnonce = {
      id: Math.max(...annonces.annonces.map(a => a.id)) + 1,
      ...annonceData,
      datePublication: new Date().toISOString(),
      dateModification: new Date().toISOString(),
      statut: "active",
      vues: 0,
      favorites: 0,
      commentaires: 0,
      troqueAvec: null
    };
    annonces.annonces.push(newAnnonce);
    localStorage.setItem("mockAnnonces", JSON.stringify(annonces.annonces));
    return newAnnonce;
  }

  async updateAnnonce(id, annonceData) {
    await this.simulateDelay();
    const annonces = await import("../data/annonces.json");
    const index = annonces.annonces.findIndex(a => a.id === parseInt(id));
    if (index !== -1) {
      annonces.annonces[index] = { 
        ...annonces.annonces[index], 
        ...annonceData,
        dateModification: new Date().toISOString()
      };
      localStorage.setItem("mockAnnonces", JSON.stringify(annonces.annonces));
      return annonces.annonces[index];
    }
    throw new Error("Annonce non trouvée");
  }

  async deleteAnnonce(id) {
    await this.simulateDelay();
    const annonces = await import("../data/annonces.json");
    const index = annonces.annonces.findIndex(a => a.id === parseInt(id));
    if (index !== -1) {
      annonces.annonces.splice(index, 1);
      localStorage.setItem("mockAnnonces", JSON.stringify(annonces.annonces));
      return true;
    }
    throw new Error("Annonce non trouvée");
  }

  // ===== MESSAGES =====
  async getMessages(userId) {
    await this.simulateDelay();
    const messages = await import("../data/messages.json");
    return messages.messages.filter(m => 
      m.emetteerId === userId || m.recepteurId === userId
    );
  }

  async sendMessage(messageData) {
    await this.simulateDelay();
    const messages = await import("../data/messages.json");
    const newMessage = {
      id: Math.max(...messages.messages.map(m => m.id), 0) + 1,
      ...messageData,
      dateEnvoi: new Date().toISOString(),
      lu: false
    };
    messages.messages.push(newMessage);
    localStorage.setItem("mockMessages", JSON.stringify(messages.messages));
    return newMessage;
  }

  // ===== CATÉGORIES =====
  async getCategories() {
    await this.simulateDelay();
    const categories = await import("../data/categories.json");
    return categories.categories;
  }

  // ===== AUTHENTIFICATION =====
  async login(email, password) {
    await this.simulateDelay();
    const users = await import("../data/users.json");
    const user = users.users.find(u => u.email === email && u.password === password);
    if (user) {
      return user;
    }
    throw new Error("Email ou mot de passe incorrect");
  }
}

export default new MockAPI();