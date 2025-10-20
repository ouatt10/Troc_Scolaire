import React, { useEffect, useState } from "react";
import api from "./services/api";

export default function TestAPI() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const test = async () => {
      try {
        console.log("🧪 Test 1: Récupérer les utilisateurs...");
        const users = await api.getUsers();
        console.log("✅ Utilisateurs:", users);

        console.log("🧪 Test 2: Récupérer les annonces...");
        const annonces = await api.getAnnonces();
        console.log("✅ Annonces:", annonces);

        console.log("🧪 Test 3: Récupérer les catégories...");
        const categories = await api.getCategories();
        console.log("✅ Catégories:", categories);

        console.log("🧪 Test 4: Récupérer les messages...");
        const messages = await api.getMessages(2); // Messages de l'utilisateur 2
        console.log("✅ Messages:", messages);

        setData({
          users: users.length,
          annonces: annonces.length,
          categories: categories.length,
          messages: messages.length
        });
        setLoading(false);
      } catch (err) {
        console.error("❌ Erreur:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    test();
  }, []);

  if (loading) return <div className="p-8">⏳ Chargement du test...</div>;
  if (error) return <div className="p-8 text-red-600">❌ Erreur: {error}</div>;

  return (
    <div className="p-8 bg-green-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">✅ Test API Réussi!</h1>
      <ul className="space-y-2">
        <li>📚 {data.users} utilisateurs chargés</li>
        <li>📝 {data.annonces} annonces chargées</li>
        <li>🏷️ {data.categories} catégories chargées</li>
        <li>💬 {data.messages} messages chargés</li>
      </ul>
      <p className="mt-4 text-sm text-gray-600">Vérifie la console (F12) pour plus de détails</p>
    </div>
  );
}