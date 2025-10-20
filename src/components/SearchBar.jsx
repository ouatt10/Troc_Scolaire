// src/components/SearchBar.jsx
import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [niveau, setNiveau] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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
    "Primaire (CP-CM2)",
    "Collège (6ème-3ème)",
    "Lycée (Seconde-Terminale)",
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

  return (
    <div className="w-full bg-white rounded-xl shadow-card p-4 lg:p-6">
      {/* Première ligne : recherche principale */}
      <div className="flex flex-col lg:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Rechercher des manuels, fournitures..."
            className="w-full pl-12 pr-4 py-3 bg-background-subtle border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <button
          onClick={handleSearch}
          className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Search size={18} />
          <span>Rechercher</span>
        </button>
      </div>

      {/* Deuxième ligne : filtres */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Catégorie */}
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 bg-background-subtle border border-border rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        </div>

        {/* Niveau */}
        <div className="relative">
          <select
            value={niveau}
            onChange={(e) => setNiveau(e.target.value)}
            className="w-full px-4 py-2.5 bg-background-subtle border border-border rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            {niveaux.map((niv) => (
              <option key={niv} value={niv}>{niv}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        </div>

        {/* Prix maximum */}
        <div className="relative">
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Prix max (FCFA)"
            min="0"
            className="w-full px-4 py-2.5 bg-background-subtle border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Tags de filtres actifs */}
      {(category && category !== "Toutes catégories") || 
       (niveau && niveau !== "Tous niveaux") || 
       maxPrice ? (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border-light">
          <span className="text-sm text-text-muted">Filtres actifs:</span>
          {category && category !== "Toutes catégories" && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              {category}
            </span>
          )}
          {niveau && niveau !== "Tous niveaux" && (
            <span className="px-3 py-1 bg-accent-green/10 text-accent-green text-sm rounded-full">
              {niveau}
            </span>
          )}
          {maxPrice && (
            <span className="px-3 py-1 bg-orange-100 text-orange-600 text-sm rounded-full">
              Max: {maxPrice} FCFA
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
}