// src/components/ProtectedRoute.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, UserPlus, LogIn, AlertCircle } from "lucide-react";
import AuthModal from "./AuthModal";

export default function ProtectedRoute({ children, pageName = "cette page", requiredRole = "user" }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté et récupérer son rôle
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUserRole(user.role || (user.isAdmin ? "admin" : "user"));
      } catch (e) {
        console.error("Erreur lors de la lecture de l'utilisateur:", e);
      }
    }
    setIsChecking(false);
  }, []);

  const handleAuthSuccess = (user) => {
    setIsAuthenticated(true);
    setUserRole(user.role || (user.isAdmin ? "admin" : "user"));
    setShowAuthModal(false);
    // Pas de reload, on met à jour l'état directement
  };

  // Pendant la vérification
  if (isChecking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Si non connecté, afficher la page de protection
  if (!isAuthenticated) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-[60vh] flex items-center justify-center px-4"
        >
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
            {/* Icône de verrouillage */}
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Lock className="text-blue-600" size={40} />
            </div>

            {/* Titre */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Connexion requise
              </h2>
              <p className="text-gray-600">
                Vous devez être connecté pour accéder à {pageName}
              </p>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-3 pt-4">
              <motion.button
                onClick={() => setShowAuthModal(true)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogIn size={20} />
                Se connecter
              </motion.button>

              <p className="text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Créer un compte gratuitement
                </button>
              </p>
            </div>

            {/* Avantages de la connexion */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Avec un compte, vous pouvez :
              </p>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Publier des annonces gratuitement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Contacter les vendeurs directement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Gérer votre profil et vos annonces</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Sauvegarder vos favoris</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Modal d'authentification */}
        {showAuthModal && (
          <AuthModal 
            onClose={() => setShowAuthModal(false)}
            onAuthSuccess={handleAuthSuccess}
          />
        )}
      </>
    );
  }

  // ✅ Vérifier si l'utilisateur a le bon rôle
  if (requiredRole === "admin" && userRole !== "admin") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[60vh] flex items-center justify-center px-4"
      >
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
          {/* Icône d'erreur */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="text-red-600" size={40} />
          </div>

          {/* Titre */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Accès refusé
            </h2>
            <p className="text-gray-600">
              Seuls les administrateurs peuvent accéder à {pageName}
            </p>
          </div>

          {/* Message informatif */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">
              Votre compte n'a pas les permissions nécessaires.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Si connecté ET a le bon rôle, afficher le contenu de la page
  return children;
}