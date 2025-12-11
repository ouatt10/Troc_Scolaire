// src/pages/Home.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight, Sparkles, Shield, Leaf } from "lucide-react";

export default function Home() {
  const benefits = [
    { 
      icon: TrendingUp, 
      label: "Jusqu'à 70%", 
      sublabel: "d'économies",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    { 
      icon: Leaf, 
      label: "Écologique", 
      sublabel: "& solidaire",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    { 
      icon: Shield, 
      label: "100% Gratuit", 
      sublabel: "Sans commission",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    { 
      icon: Sparkles, 
      label: "Simple", 
      sublabel: "& rapide",
      color: "text-orange-600",
      bg: "bg-orange-50"
    }
  ];

  // ✅ Ajout du champ imageUrl pour les vraies images
  const recentAnnonces = [
    {
      id: 1,
      titre: "Manuels de Mathématiques Terminale S",
      prix: 5000,
      categorie: "Manuels scolaires",
      niveau: "Lycée",
      imageUrl: "/image/manuels-scolaires.jpg", // Image réelle
      image: "📚", // Fallback emoji si pas d'image
      type: "Vente"
    },
    {
      id: 2,
      titre: "Calculatrice Scientifique Casio",
      prix: 0,
      categorie: "Fournitures",
      niveau: "Collège",
      imageUrl: "/image/calculatrice-casio.jpg",
      image: "🧮",
      type: "Don"
    },
    {
      id: 3,
      titre: "Sac à dos neuf non utilisé",
      prix: 7000,
      categorie: "Sacs et cartables",
      niveau: "Primaire",
      imageUrl: "/image/Sacs-et-cartables.jpg",
      image: "🎒",
      type: "Vente"
    },
    {
      id: 4,
      titre: "Collection de livres CP-CE1",
      prix: 0,
      categorie: "Manuels scolaires",
      niveau: "Primaire",
      imageUrl: "/image/collection-livres.jpg",
      image: "📖",
      type: "Échange"
    }
  ];

  return (
    <div className="w-full space-y-12">
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Plateforme en lancement - Rejoignez-nous !
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Échangez, partagez,<br />
          économisez ensemble
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          TrocScolaire permet aux élèves, étudiants et parents d'échanger ou vendre leurs fournitures scolaires. Économisez et réduisez le gaspillage !
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/annonces"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            Voir les annonces
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/deposer"
            className="px-8 py-4 bg-white hover:bg-gray-50 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg transition-colors"
          >
            Publier une annonce
          </Link>
        </div>
      </motion.section>

      {/* Avantages */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -4 }}
            className={`${benefit.bg} rounded-xl p-6 shadow-md hover:shadow-xl transition-all text-center space-y-2`}
          >
            <benefit.icon size={32} className={`mx-auto ${benefit.color}`} />
            <p className={`text-2xl font-bold ${benefit.color}`}>{benefit.label}</p>
            <p className="text-sm text-gray-600">{benefit.sublabel}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Annonces récentes avec images réelles */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Annonces récentes</h2>
          <Link
            to="/annonces"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
          >
            Voir tout
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentAnnonces.map((annonce) => (
            <motion.div
              key={annonce.id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              {/* ✅ Image réelle avec fallback */}
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                {annonce.imageUrl ? (
                  <img 
                    src={annonce.imageUrl} 
                    alt={annonce.titre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Si l'image ne charge pas, afficher l'emoji
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
              </div>

              {/* Contenu */}
              <div className="p-4 space-y-3">
                {/* Badge type */}
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    annonce.type === "Don"
                      ? "bg-green-100 text-green-700"
                      : annonce.type === "Échange"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {annonce.type}
                </span>

                {/* Titre */}
                <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">
                  {annonce.titre}
                </h3>

                {/* Infos */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{annonce.niveau}</span>
                  <span className="font-semibold text-gray-900">
                    {annonce.prix === 0 ? "Gratuit" : `${annonce.prix.toLocaleString()} FCFA`}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Comment ça marche */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 md:p-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Comment ça marche ?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Inscrivez-vous
            </h3>
            <p className="text-gray-600">
              Créez votre compte gratuitement en quelques clics
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Publiez ou cherchez
            </h3>
            <p className="text-gray-600">
              Déposez vos annonces ou trouvez ce dont vous avez besoin
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Échangez
            </h3>
            <p className="text-gray-600">
              Contactez les utilisateurs et organisez vos échanges
            </p>
          </div>
        </div>
      </motion.section>

      {/* Call to action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 md:p-12 text-center space-y-6 shadow-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          Prêt à économiser ?
        </h2>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          Rejoignez notre communauté et commencez à échanger dès maintenant. C'est gratuit, simple et solidaire !
        </p>
        <Link
          to="/deposer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
        >
          Publier ma première annonce
          <ArrowRight size={20} />
        </Link>
      </motion.section>
    </div>
  );
}