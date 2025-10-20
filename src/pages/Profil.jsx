// src/pages/Profil.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, Package, MessageCircle, Star, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Profil() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("annonces");
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState({
    telephone: "",
    localisation: "",
    typeUtilisateur: "Étudiant",
    bio: ""
  });

  useEffect(() => {
    // Récupérer l'utilisateur connecté depuis localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);
      
      // Récupérer le profil complet s'il existe
      const storedProfile = localStorage.getItem(`profile_${user.id}`);
      if (storedProfile) {
        setProfileData(JSON.parse(storedProfile));
      }
    }
  }, []);

  // Récupérer les annonces de l'utilisateur (depuis localStorage pour l'instant)
  const mesAnnonces = userData ? 
    JSON.parse(localStorage.getItem(`annonces_${userData.id}`) || "[]") : [];

  const statistiques = [
    { label: "Annonces publiées", value: mesAnnonces.length.toString(), icon: Package },
    { label: "Messages reçus", value: "0", icon: MessageCircle },
    { label: "Note moyenne", value: "-", icon: Star },
    { label: "Échanges réussis", value: "0", icon: User }
  ];

  const handleSave = () => {
    if (userData) {
      // Sauvegarder le profil dans localStorage
      localStorage.setItem(`profile_${userData.id}`, JSON.stringify(profileData));
      setIsEditing(false);
      alert("✅ Profil mis à jour avec succès !");
    }
  };

  if (!userData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Calculer la date d'inscription
  const dateInscription = new Date(userData.id).toLocaleDateString('fr-FR', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="w-full space-y-6">
      
      {/* En-tête profil */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {userData.prenom?.[0] || userData.nom?.[0] || "U"}
            {userData.nom?.[0] || ""}
          </div>

          {/* Infos principales */}
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {userData.prenom} {userData.nom}
            </h1>
            <p className="text-gray-600">{profileData.typeUtilisateur}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={14} />
              <span>Membre depuis {dateInscription}</span>
            </div>
          </div>

          {/* Bouton édition */}
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 shadow-md"
          >
            {isEditing ? (
              <>
                <Save size={16} />
                Sauvegarder
              </>
            ) : (
              <>
                <Edit2 size={16} />
                Modifier le profil
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Statistiques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {statistiques.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center space-y-2">
            <stat.icon size={28} className="mx-auto text-blue-600" />
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Contenu avec onglets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Onglets */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("annonces")}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === "annonces"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Mes annonces
          </button>
          <button
            onClick={() => setActiveTab("informations")}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === "informations"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Informations
          </button>
        </div>

        {/* Contenu des onglets */}
        <div className="p-6">
          {activeTab === "annonces" ? (
            <div className="space-y-4">
              {mesAnnonces.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-xl text-gray-600 mb-2">Aucune annonce pour le moment</p>
                  <p className="text-sm text-gray-500 mb-6">
                    Publiez votre première annonce pour commencer à échanger !
                  </p>
                  <Link
                    to="/deposer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    <Package size={18} />
                    Publier une annonce
                  </Link>
                </div>
              ) : (
                mesAnnonces.map((annonce) => (
                  <div key={annonce.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{annonce.titre}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span>{annonce.prix.toLocaleString()} FCFA</span>
                        <span>•</span>
                        <span>{annonce.vues || 0} vues</span>
                        <span>•</span>
                        <span>{annonce.messages || 0} messages</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        annonce.statut === "Actif"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {annonce.statut || "En attente"}
                    </span>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Email (non modifiable) */}
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-gray-600 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600"
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-gray-600 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={profileData.telephone}
                    onChange={(e) => setProfileData({ ...profileData, telephone: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Ex: +225 07 XX XX XX XX"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Localisation */}
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-gray-600 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localisation
                  </label>
                  <input
                    type="text"
                    value={profileData.localisation}
                    onChange={(e) => setProfileData({ ...profileData, localisation: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Ex: Cocody, Abidjan"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Type d'utilisateur */}
              <div className="flex items-start gap-4">
                <User size={20} className="text-gray-600 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Je suis
                  </label>
                  <select
                    value={profileData.typeUtilisateur}
                    onChange={(e) => setProfileData({ ...profileData, typeUtilisateur: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="Étudiant">Étudiant</option>
                    <option value="Parent">Parent</option>
                    <option value="Enseignant">Enseignant</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div className="flex items-start gap-4">
                <BookOpen size={20} className="text-gray-600 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    À propos de moi
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Parlez un peu de vous..."
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed resize-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}