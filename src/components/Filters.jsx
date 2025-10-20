// src/components/Filters.jsx
import React from "react";
import { Layers, Tag, BookOpen, User } from "lucide-react";

export default function Filters() {
  return (
    <div className="filters" role="region" aria-label="Filtres">
      <button className="filter"><Layers size={14} /> Niveau</button>
      <button className="filter"><Tag size={14} /> Prix</button>
      <button className="filter"><BookOpen size={14} /> Catégorie</button>
      <button className="filter"><User size={14} /> Nom</button>
    </div>
  );
}
