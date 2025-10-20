// src/pages/Apropos.jsx
import React from "react";
import { motion } from "framer-motion";
import { Target, Users, Heart, Leaf, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Apropos() {
  const valeurs = [
    {
      icon: Heart,
      titre: "Solidarité",
      description: "Nous croyons en l'entraide entre familles pour faciliter l'accès à l'éducation"
    },
    {
      icon: Leaf,
      titre: "Écologie",
      description: "Réduire le gaspillage en donnant une seconde vie au matériel scolaire"
    },
    {
      icon: Shield,
      titre: "Confiance",
      description: "Un système de modération et vérification pour des échanges sécurisés"
    },
    {
      icon: Zap,
      titre: "Simplicité",
      description: "Une plateforme intuitive accessible à tous, même avec une connexion limitée"
    }
  ];

  return (
    <div className="w-full space-y-16">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          <Target size={16} />
          Notre mission
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Rendre l'éducation plus<br />
          <span className="text-blue-600">accessible et durable</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          TrocScolaire est né d'un constat simple : chaque année, des millions de FCFA sont dépensés en fournitures scolaires neuves alors que de nombreuses familles possèdent du matériel en excellent état qui n'est plus utilisé.
        </p>
      </motion.div>

      {/* Notre histoire */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <Users size={32} className="text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">Notre histoire</h2>
        </div>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            En 2024, face à la hausse constante des frais de scolarité et du coût des fournitures, 
            nous avons décidé de créer une plateforme solidaire où les familles, élèves et étudiants 
            peuvent échanger, vendre ou donner leur matériel éducatif.
          </p>
          <p>
            Notre objectif est double : <strong>réduire les dépenses des familles</strong> tout en 
            <strong> luttant contre le gaspillage</strong>. Chaque manuel réutilisé, chaque cartable 
            qui trouve un nouveau propriétaire, c'est une victoire pour l'économie circulaire et 
            l'accès à l'éducation.
          </p>
          <p>
            Aujourd'hui, TrocScolaire est une nouvelle plateforme dont l'objectif est de rassembler des milliers d'utilisateurs en Côte d'Ivoire et de continuer à grandir grâce à la confiance de notre communauté.
          </p>
        </div>
      </motion.section>

      {/* Nos valeurs */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Nos valeurs
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valeurs.map((valeur, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl shadow-md p-6 space-y-4 text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <valeur.icon size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {valeur.titre}
              </h3>
              <p className="text-gray-600">
                {valeur.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Comment nous aidons */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Comment nous aidons notre communauté
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Les élèves et étudiants
            </h3>
            <p className="text-gray-600">
              Trouvez des manuels, fournitures et matériel informatique à prix réduit. 
              Vendez vos anciens livres pour financer les nouveaux.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Les parents
            </h3>
            <p className="text-gray-600">
              Réduisez vos dépenses de rentrée scolaire de 40% à 60% en achetant d'occasion. 
              Donnez ou vendez ce que vos enfants n'utilisent plus.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Les enseignants
            </h3>
            <p className="text-gray-600">
              Organisez des collectes pour vos élèves. Publiez des annonces groupées 
              pour redistribuer le matériel aux familles dans le besoin.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Engagement sécurité */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield size={32} className="text-green-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Notre engagement pour votre sécurité
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-lg">
              ✓ Modération des annonces
            </h3>
            <p>
              Toutes les annonces sont vérifiées avant publication pour éviter les contenus inappropriés ou frauduleux.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-lg">
              ✓ Profils vérifiés
            </h3>
            <p>
              Système de vérification d'identité et notes pour garantir la fiabilité des utilisateurs.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-lg">
              ✓ Protection des mineurs
            </h3>
            <p>
              Règles strictes pour les échanges impliquant des mineurs. Recommandation d'accompagnement adulte.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-lg">
              ✓ Signalement facile
            </h3>
            <p>
              Système de signalement intégré pour rapporter toute activité suspecte ou annonce problématique.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Call to action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 md:p-12 text-center space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Rejoignez le mouvement !
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ensemble, construisons une communauté solidaire où l'éducation est accessible à tous 
          et où chaque objet trouve une seconde vie.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/annonces"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Voir les annonces
          </Link>
          <Link
            to="/deposer"
            className="px-8 py-4 bg-white hover:bg-gray-50 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg transition-colors"
          >
            Publier une annonce
          </Link>
        </div>
      </motion.section>
    </div>
  );
}