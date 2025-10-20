// src/pages/AdminModeration.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Trash2, 
  Clock, 
  AlertTriangle,
  User,
  Package,
  Filter
} from "lucide-react";

export default function AdminModeration() {
  const [annonces, setAnnonces] = useState([]);
  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [annonceSelectionnee, setAnnonceSelectionnee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Charger toutes les annonces
  useEffect(() => {
    chargerAnnonces();
  }, []);

  const chargerAnnonces = () => {
    const allAnnonces = JSON.parse(localStorage.getItem("allAnnonces") || "[]");
    setAnnonces(allAnnonces);
  };

  // Filtrer les annonces
  const annoncesFiltrees = annonces.filter((annonce) => {
    if (filtreStatut === "tous") return true;
    return annonce.statut === filtreStatut;
  });

  // Statistiques
  const stats = {
    total: annonces.length,
    enAttente: annonces.filter(a => a.statut === "En attente").length,
    actif: annonces.filter(a => a.statut === "Actif").length,
    rejetees: annonces.filter(a => a.statut === "Rejeté").length
  };

  // Approuver une annonce
  const approuverAnnonce = (annonce) => {
    const allAnnonces = JSON.parse(localStorage.getItem("allAnnonces") || "[]");
    const index = allAnnonces.findIndex(a => a.id === annonce.id);
    
    if (index !== -1) {
      allAnnonces[index].statut = "Actif";
      localStorage.setItem("allAnnonces", JSON.stringify(allAnnonces));
      
      // Mettre à jour aussi dans les annonces de l'utilisateur
      const userAnnonces = JSON.parse(localStorage.getItem(`annonces_${annonce.vendeurId}`) || "[]");
      const userIndex = userAnnonces.findIndex(a => a.id === annonce.id);
      if (userIndex !== -1) {
        userAnnonces[userIndex].statut = "Actif";
        localStorage.setItem(`annonces_${annonce.vendeurId}`, JSON.stringify(userAnnonces));
      }
      
      chargerAnnonces();
      setShowModal(false);
      alert("✅ Annonce approuvée avec succès !");
    }
  };

  // Rejeter une annonce
  const rejeterAnnonce = (annonce) => {
    const motif = prompt("Motif du rejet (optionnel) :");
    
    const allAnnonces = JSON.parse(localStorage.getItem("allAnnonces") || "[]");
    const index = allAnnonces.findIndex(a => a.id === annonce.id);
    
    if (index !== -1) {
      allAnnonces[index].statut = "Rejeté";
      allAnnonces[index].motifRejet = motif || "Non conforme";
      localStorage.setItem("allAnnonces", JSON.stringify(allAnnonces));
      
      // Mettre à jour aussi dans les annonces de l'utilisateur
      const userAnnonces = JSON.parse(localStorage.getItem(`annonces_${annonce.vendeurId}`) || "[]");
      const userIndex = userAnnonces.findIndex(a => a.id === annonce.id);
      if (userIndex !== -1) {
        userAnnonces[userIndex].statut = "Rejeté";
        userAnnonces[userIndex].motifRejet = motif || "Non conforme";
        localStorage.setItem(`annonces_${annonce.vendeurId}`, JSON.stringify(userAnnonces));
      }
      
      chargerAnnonces();
      setShowModal(false);
      alert("❌ Annonce rejetée");
    }
  };

  // Supprimer une annonce
  const supprimerAnnonce = (annonce) => {
    if (!confirm("⚠️ Êtes-vous sûr de vouloir supprimer définitivement cette annonce ?")) {
      return;
    }
    
    // Supprimer de la liste globale
    let allAnnonces = JSON.parse(localStorage.getItem("allAnnonces") || "[]");
    allAnnonces = allAnnonces.filter(a => a.id !== annonce.id);
    localStorage.setItem("allAnnonces", JSON.stringify(allAnnonces));
    
    // Supprimer aussi des annonces de l'utilisateur
    let userAnnonces = JSON.parse(localStorage.getItem(`annonces_${annonce.vendeurId}`) || "[]");
    userAnnonces = userAnnonces.filter(a => a.id !== annonce.id);
    localStorage.setItem(`annonces_${annonce.vendeurId}`, JSON.stringify(userAnnonces));
    
    chargerAnnonces();
    setShowModal(false);
    alert("🗑️ Annonce supprimée définitivement");
  };

  // Voir les détails
  const voirDetails = (annonce) => {
    setAnnonceSelectionnee(annonce);
    setShowModal(true);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 md:p-8"
      >
        <h1 className="text-3xl font-bold mb-2">
          Panneau d'administration
        </h1>
        <p className="text-blue-100">
          Gérez et modérez les annonces de la plateforme
        </p>
      </motion.div>

      {/* Statistiques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-xl shadow-md p-6 space-y-2">
          <Package className="text-gray-600" size={24} />
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600">Total annonces</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 space-y-2">
          <Clock className="text-orange-600" size={24} />
          <p className="text-3xl font-bold text-gray-900">{stats.enAttente}</p>
          <p className="text-sm text-gray-600">En attente</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 space-y-2">
          <CheckCircle className="text-green-600" size={24} />
          <p className="text-3xl font-bold text-gray-900">{stats.actif}</p>
          <p className="text-sm text-gray-600">Actives</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 space-y-2">
          <XCircle className="text-red-600" size={24} />
          <p className="text-3xl font-bold text-gray-900">{stats.rejetees}</p>
          <p className="text-sm text-gray-600">Rejetées</p>
        </div>
      </motion.div>

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-md p-4"
      >
        <div className="flex items-center gap-4">
          <Filter className="text-gray-600" size={20} />
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFiltreStatut("tous")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtreStatut === "tous"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tous ({stats.total})
            </button>
            <button
              onClick={() => setFiltreStatut("En attente")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtreStatut === "En attente"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              En attente ({stats.enAttente})
            </button>
            <button
              onClick={() => setFiltreStatut("Actif")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtreStatut === "Actif"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Actives ({stats.actif})
            </button>
            <button
              onClick={() => setFiltreStatut("Rejeté")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtreStatut === "Rejeté"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Rejetées ({stats.rejetees})
            </button>
          </div>
        </div>
      </motion.div>

      {/* Liste des annonces */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {annoncesFiltrees.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Package className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-xl text-gray-600">Aucune annonce à afficher</p>
          </div>
        ) : (
          annoncesFiltrees.map((annonce) => (
            <div
              key={annonce.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="w-full md:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {annonce.imageUrl ? (
                    <img
                      src={annonce.imageUrl}
                      alt={annonce.titre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      📦
                    </div>
                  )}
                </div>

                {/* Contenu */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {annonce.titre}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {annonce.description}
                      </p>
                    </div>
                    
                    {/* Badge statut */}
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                        annonce.statut === "Actif"
                          ? "bg-green-100 text-green-700"
                          : annonce.statut === "En attente"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {annonce.statut}
                    </span>
                  </div>

                  {/* Infos */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{annonce.vendeur}</span>
                    </div>
                    <span>•</span>
                    <span className="font-semibold">
                      {annonce.prix === 0 ? "Gratuit" : `${annonce.prix.toLocaleString()} FCFA`}
                    </span>
                    <span>•</span>
                    <span>{annonce.categorie}</span>
                    <span>•</span>
                    <span>{annonce.niveau}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      onClick={() => voirDetails(annonce)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Eye size={16} />
                      Voir détails
                    </button>

                    {annonce.statut === "En attente" && (
                      <>
                        <button
                          onClick={() => approuverAnnonce(annonce)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                        >
                          <CheckCircle size={16} />
                          Approuver
                        </button>
                        <button
                          onClick={() => rejeterAnnonce(annonce)}
                          className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                        >
                          <XCircle size={16} />
                          Rejeter
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => supprimerAnnonce(annonce)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Trash2 size={16} />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </motion.div>

      {/* Modal de détails */}
      <AnimatePresence>
        {showModal && annonceSelectionnee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Détails de l'annonce
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XCircle size={24} />
                </button>
              </div>

              {/* Contenu */}
              <div className="p-6 space-y-6">
                {/* Image */}
                {annonceSelectionnee.imageUrl && (
                  <img
                    src={annonceSelectionnee.imageUrl}
                    alt={annonceSelectionnee.titre}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}

                {/* Infos */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Titre</label>
                    <p className="text-gray-900">{annonceSelectionnee.titre}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <p className="text-gray-900">{annonceSelectionnee.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Prix</label>
                      <p className="text-gray-900">
                        {annonceSelectionnee.prix === 0 ? "Gratuit" : `${annonceSelectionnee.prix.toLocaleString()} FCFA`}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Type</label>
                      <p className="text-gray-900">{annonceSelectionnee.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Catégorie</label>
                      <p className="text-gray-900">{annonceSelectionnee.categorie}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Niveau</label>
                      <p className="text-gray-900">{annonceSelectionnee.niveau}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">État</label>
                      <p className="text-gray-900">{annonceSelectionnee.etat}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Statut</label>
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          annonceSelectionnee.statut === "Actif"
                            ? "bg-green-100 text-green-700"
                            : annonceSelectionnee.statut === "En attente"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {annonceSelectionnee.statut}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Vendeur</label>
                    <p className="text-gray-900">{annonceSelectionnee.vendeur}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Date de création</label>
                    <p className="text-gray-900">
                      {new Date(annonceSelectionnee.dateCreation).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  {annonceSelectionnee.statut === "En attente" && (
                    <>
                      <button
                        onClick={() => approuverAnnonce(annonceSelectionnee)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                      >
                        <CheckCircle size={18} />
                        Approuver
                      </button>
                      <button
                        onClick={() => rejeterAnnonce(annonceSelectionnee)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
                      >
                        <XCircle size={18} />
                        Rejeter
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => supprimerAnnonce(annonceSelectionnee)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    <Trash2 size={18} />
                    Supprimer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}