// src/components/SearchBar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [niveau, setNiveau] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  // ✅ Pour éviter l'exécution au premier rendu
  const isFirstRender = useRef(true);

  const categories = [
    "Toutes catégories",
    "Manuels scolaires",
    "Fournitures",
    "Matériel informatique",
    "Uniformes",
    "Sacs et cartables",
    "Calculatrices",
    "Autres"
  ];

  const niveaux = [
    "Tous niveaux",
    "Maternelle",
    "Primaire",
    "Collège",
    "Lycée",
    "Université",
    "Formation professionnelle"
  ];

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        searchTerm,
        category: category === "Toutes catégories" ? "" : category,        
        niveau: niveau === "Tous niveaux" ? "" : niveau,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null
      });
    }
  };

  // ✅ Filtrer automatiquement SAUF au premier rendu
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Ne rien faire au premier rendu
    }
    handleSearch();
  }, [category, niveau, maxPrice]);

  // ✅ Gestion de la touche Entrée
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-card p-4 lg:p-6">    
      {/* Barre de recherche principale */}
      <div className="flex-1 relative mb-4">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher des manuels, fournitures, uniformes..."
          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <p className="text-xs text-gray-500 mt-1 ml-1">
          💡 Tapez votre recherche et appuyez sur <kbd className="px-2 py-0.5 bg-gray-200 rounded text-xs font-mono">Entrée</kbd>
        </p>
      </div>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Catégorie */}
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"        
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Niveau */}
        <div className="relative">
          <select
            value={niveau}
            onChange={(e) => setNiveau(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"        
          >
            {niveaux.map((niv) => (
              <option key={niv} value={niv}>{niv}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Prix maximum */}
        <div className="relative">
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Prix max (FCFA)"
            min="0"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Tags de filtres actifs */}
      {(searchTerm || (category && category !== "Toutes catégories") ||
       (niveau && niveau !== "Tous niveaux") || maxPrice) ? (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-600">Filtres actifs:</span> 
          
          {searchTerm && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center gap-1">
              <Search size={12} />
              "{searchTerm}"
            </span>
          )}
          
          {category && category !== "Toutes catégories" && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
              {category}
            </span>
          )}
          
          {niveau && niveau !== "Tous niveaux" && (
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
              {niveau}
            </span>
          )}
          
          {maxPrice && (
            <span className="px-3 py-1 bg-orange-100 text-orange-600 text-sm rounded-full">
              Max: {maxPrice} FCFA
            </span>
          )}
          
          <button
            onClick={() => {
              setSearchTerm("");
              setCategory("");
              setNiveau("");
              setMaxPrice("");
            }}
            className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded-full hover:bg-red-200 transition-colors"
          >
            ✕ Réinitialiser
          </button>
        </div>
      ) : null}
    </div>
  );
}