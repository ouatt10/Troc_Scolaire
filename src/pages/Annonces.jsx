// src/pages/Annonces.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import { MessageCircle, User, X, Info } from "lucide-react";

export default function Annonces() {
  const [showBanner, setShowBanner] = useState(true);

  // Données d'exemple - AJOUTEZ isDemo: true à chaque article
  const allAnnonces = [
    {
      id: 1,
      titre: "Manuels de Mathématiques Terminale S",
      description: "Collection complète en excellent état, annotations propres",
      prix: 5000,
      categorie: "Manuels scolaires",
      niveau: "Lycée",
      type: "Vente",
      imageUrl: "/image/manuels-scolaires.jpg",
      image: "📚",
      vendeur: "Équipe TrocScolaire",
      isDemo: true // ← AJOUTEZ CETTE LIGNE
    },
    {
      id: 2,
      titre: "Calculatrice Scientifique Casio ",
      description: "déjà utilisée, un peu usée et ancien",
      prix: 0,
      categorie: "Fournitures",
      niveau: "Collège",
      type: "Don",
      imageUrl: "/image/calculatrice-casio.jpg",
      image: "🧮",
      vendeur: "Équipe TrocScolaire",
      isDemo: true // ← AJOUTEZ CETTE LIGNE
    },
    {
      id: 3,
      titre: "Sac à dos Eastpak bleu marine",
      description: "Utilisé 1 an, très bon état, toutes les poches fonctionnelles",
      prix: 5000,
      categorie: "Sacs et cartables",
      niveau: "Primaire",
      type: "Vente",
      imageUrl: "/image/primaire.jpg",
      image: "🎒",
      vendeur: "Équipe TrocScolaire",
      isDemo: true // ← AJOUTEZ CETTE LIGNE
    },
    {
      id: 4,
      titre: "Collection complète livres CP-CE1",
      description: "Français, Maths, Éveil - 10 livres en tout",
      prix: 0,
      categorie: "Manuels scolaires",
      niveau: "Primaire",
      type: "Échange",
      imageUrl: "/image/collection-livres.jpg",
      image: "📖",
      vendeur: "Équipe TrocScolaire",
      isDemo: true // ← AJOUTEZ CETTE LIGNE
    },
    {
      id: 5,
      titre: "Ordinateur portable HP pour étudiant",
      description: "Core i5, 8GB RAM, 256GB SSD, parfait pour bureautique",
      prix: 100000,
      categorie: "Matériel informatique",
      niveau: "Université",
      type: "Vente",
      imageUrl: "/image/materiel-informatique.jpg",
      image: "💻",
      vendeur: "Équipe TrocScolaire",
      isDemo: true // ← AJOUTEZ CETTE LIGNE
    },
    {
      id: 6,
      titre: "Uniformes collège fille taille M",
      description: "1 complet lavé et repassé",
      prix: 3000,
      categorie: "Uniformes",
      niveau: "Collège",
      type: "Vente",
      imageUrl: "/image/uniformes.jpg",
      image: "👔",
      vendeur: "Équipe TrocScolaire",
      isDemo: true // ← AJOUTEZ CETTE LIGNE
    },
    {
      id: 7,
      titre: "Tablette Samsung Galaxy Tab pour étudiants",
      description: "Écran 10 pouces, parfaite pour lire des PDF et prendre des notes",
      prix: 65000,
      categorie: "Matériel informatique", 
      niveau: "Université",
      type: "Vente",
      imageUrl: "/image/universite.jpg",
      image: "📱",
      vendeur: "Équipe TrocScolaire",
      isDemo: true // ← AJOUTEZ CETTE LIGNE
    },
    {
      id: 8,
      titre: "Lot de cahiers et fournitures neuves",
      description: "Cahiers, stylos, crayons, gommes - tout neuf jamais utilisé",
      prix: 4000,
      categorie: "Fournitures",
      niveau: "Primaire",
      type: "Vente",
      imageUrl: "/image/fournitures.jpg",
      image: "✏️",
      vendeur: "Équipe TrocScolaire",
      isDemo: true // ← AJOUTEZ CETTE LIGNE
    },
    {
      id: 9,
      titre: "Atlas géographique mondial illustré",
      description: "Édition récente 2023, cartes détaillées et colorées",
      prix: 5500,
      categorie: "Manuels scolaires",
      niveau: "Collège",
      type: "Vente",
      imageUrl: "/image/atlas.jpg",
      image: "🗺️",
      vendeur: "Équipe TrocScolaire",
      isDemo: true // ← AJOUTEZ CETTE LIGNE
    }
  ];

  const [annonces, setAnnonces] = useState(allAnnonces);

const handleSearch = (filters) => {
  console.log("🔍 Filtres reçus:", filters);
  
  let results = [...allAnnonces];
  console.log("📦 Nombre d'annonces avant filtre:", results.length);

  // Filtre par terme de recherche
  if (filters.searchTerm) {
    console.log("🔤 Recherche texte:", filters.searchTerm);
    results = results.filter(a =>
      a.titre.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      a.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
    );
    console.log("✅ Après filtre texte:", results.length, "résultats");
  }

  // Filtre par catégorie
  if (filters.category) {
    console.log("📁 Filtre catégorie:", filters.category);
    const avant = results.length;
    results = results.filter(a => {
      console.log(`   Comparaison: "${a.categorie}" === "${filters.category}"`, a.categorie === filters.category);
      return a.categorie === filters.category;
    });
    console.log(`✅ Après filtre catégorie: ${avant} → ${results.length} résultats`);
  }

  // Filtre par niveau
  if (filters.niveau) {
    console.log("🎓 Filtre niveau:", filters.niveau);
    const avant = results.length;
    results = results.filter(a => {
      console.log(`   Comparaison: "${a.niveau}" === "${filters.niveau}"`, a.niveau === filters.niveau);
      return a.niveau === filters.niveau;
    });
    console.log(`✅ Après filtre niveau: ${avant} → ${results.length} résultats`);
  }

  // Filtre par prix maximum
  if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
    console.log("💰 Filtre prix max:", filters.maxPrice);
    const avant = results.length;
    results = results.filter(a => {
      console.log(`   Comparaison: ${a.prix} <= ${filters.maxPrice}`, a.prix <= filters.maxPrice);
      return a.prix <= filters.maxPrice;
    });
    console.log(`✅ Après filtre prix: ${avant} → ${results.length} résultats`);
  }

  console.log("🎯 RÉSULTATS FINAUX:", results.length, "annonces");
  console.log("───────────────────────────────────────");
  setAnnonces(results);
};

  return (
    <div className="w-full space-y-8">
      
      {/* NOUVEAU : Banner d'information pour articles démo */}
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-gray-800">
                <span className="font-semibold text-blue-700">Bienvenue sur TrocScolaire !</span>
                {' '}Les articles affichés sont des exemples pour illustrer le fonctionnement de la plateforme. 
                Inscrivez-vous pour publier vos propres annonces d'échange !
              </p>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Titre de la page */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">
          Toutes les annonces
        </h1>
        <p className="text-gray-600">
          {annonces.length} annonce{annonces.length > 1 ? 's' : ''} disponible{annonces.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Barre de recherche */}
      <SearchBar onSearch={handleSearch} />

      {/* Liste des annonces */}
      {annonces.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">Aucune annonce trouvée</p>
          <p className="text-sm text-gray-500 mt-2">
            Essayez de modifier vos filtres de recherche
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {annonces.map((annonce, index) => (
            <motion.div
              key={annonce.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              {/* Image réelle avec fallback */}
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                {annonce.imageUrl ? (
                  <img 
                    src={annonce.imageUrl} 
                    alt={annonce.titre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                {/* Fallback emoji */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center text-6xl"
                  style={{ display: annonce.imageUrl ? 'none' : 'flex' }}
                >
                  {annonce.image}
                </div>
                
                {/* NOUVEAU : Badge démo - affiché en premier */}
                {annonce.isDemo && (
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg backdrop-blur-sm z-10">
                    📌 Exemple
                  </span>
                )}

                {/* Badge type - déplacé à droite */}
                <span
                  className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm shadow-lg ${
                    annonce.type === "Don"
                      ? "bg-green-600 text-white"
                      : annonce.type === "Échange"
                      ? "bg-orange-500 text-white"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {annonce.type}
                </span>
              </div>

              {/* Contenu */}
              <div className="p-5 space-y-3">
                {/* Titre */}
                <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
                  {annonce.titre}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
                  {annonce.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {annonce.categorie}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    {annonce.niveau}
                  </span>
                </div>

                {/* Prix */}
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-2xl font-bold text-gray-900">
                    {annonce.prix === 0 ? (
                      <span className="text-green-600">Gratuit</span>
                    ) : (
                      <span>{annonce.prix.toLocaleString()} <span className="text-base font-normal text-gray-600">FCFA</span></span>
                    )}
                  </p>
                </div>

                {/* Info vendeur */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User size={14} />
                  <span>Par {annonce.vendeur}</span>
                </div>

                {/* Bouton contact */}
                <button className="w-full mt-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                  <MessageCircle size={16} />
                  Contacter
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}