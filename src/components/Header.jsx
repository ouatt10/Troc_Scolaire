// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogIn, LogOut, BookOpen, Menu, X, User, Search, UserCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AuthModal from "./AuthModal";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setUserData(user);
    }
  }, []);

  const handleAuthSuccess = (user) => {
    setIsAuthenticated(true);
    setUserData(user);
    setAuthModalOpen(false);
  };

  const handleLogout = () => {
  setIsAuthenticated(false);
  setUserData(null);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.reload(); // ✅ Ajoutez juste cette ligne
 };

  const location = useLocation();

  const navItems = [
    { to: "/", label: "Accueil" },
    { to: "/annonces", label: "Annonces" },
    { to: "/profil", label: "Profil" },
    { to: "/apropos", label: "À propos" },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-sm border-b border-gray-200 shadow-sm"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 14 }}
      >
        <a 
          href="#main" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md"
        >
          Aller au contenu principal
        </a>

        <div className="h-16 flex items-center justify-between gap-3 max-w-7xl mx-auto px-4 lg:px-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-gray-900 font-semibold text-lg hover:text-blue-600 transition-colors">
            <BookOpen size={24} className="text-blue-600" />
            <span className="hidden sm:inline">TrocScolaire</span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${location.pathname === item.to 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
                aria-current={location.pathname === item.to ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated && userData ? (
              // ✅ Utilisateur connecté - Badge + Bouton Déconnexion BLEU
              <div className="flex items-center gap-3">
                {/* Badge utilisateur avec nom */}
                <motion.div 
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {userData.prenom || userData.nom}
                  </span>
                </motion.div>

                {/* ✅ Bouton déconnexion BLEU avec icône intégrée */}
                <motion.button
                  onClick={handleLogout}
                  className="relative flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl overflow-hidden group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Effet de brillance au hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity transform -skew-x-12 group-hover:translate-x-full duration-700"></span>
                  
                  <LogOut size={20} className="relative z-10" />
                  <span className="relative z-10 hidden sm:inline">Déconnexion</span>
                </motion.button>
              </div>
            ) : (
              // ✅ Utilisateur non connecté - Bouton Connexion
              <motion.button
                onClick={() => setAuthModalOpen(true)}
                className="relative flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Effet de brillance au hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity transform -skew-x-12 group-hover:translate-x-full duration-700"></span>
                
                <UserCircle size={20} className="relative z-10" />
                <span className="relative z-10">Connexion</span>
              </motion.button>
            )}

            {/* Menu burger mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 border-t border-gray-200">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher des manuels, fournitures..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              aria-label="Recherche"
            />
          </div>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    px-4 py-3 rounded-lg font-medium transition-all
                    ${location.pathname === item.to 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Actions mobile */}
              {isAuthenticated && userData ? (
                <div className="pt-2 border-t border-gray-200 space-y-2 mt-2">
                  <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <User size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {userData.prenom} {userData.nom}
                      </p>
                      <p className="text-xs text-gray-600">{userData.email}</p>
                    </div>
                  </div>
                  
                  {/* ✅ Bouton mobile déconnexion BLEU */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                  >
                    <LogOut size={20} />
                    Déconnexion
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg mt-2"
                >
                  <UserCircle size={20} />
                  Connexion
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </motion.header>

      {authModalOpen && (
        <AuthModal 
          onClose={() => setAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
}
