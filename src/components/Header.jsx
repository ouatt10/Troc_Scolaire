// src/components/Header.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, LogOut, BookOpen, Menu, X, User, UserCircle, Shield } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ UTILISER AuthContext au lieu de localStorage directement
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  // ✅ Navigation adaptée au rôle
  const navItems = [
    { to: "/", label: "Accueil" },
    { to: "/annonces", label: "Annonces" },
    { to: "/profil", label: "Profil" },
    { to: "/apropos", label: "À propos" },
  ];

  // ✅ Ajouter le lien Admin uniquement pour les admins
  if (user?.role === 'admin') {
    navItems.push({ to: "/admin", label: "Administration", isAdmin: true });
  }

  return (
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
                px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
                ${location.pathname === item.to 
                  ? 'bg-blue-600 text-white' 
                  : item.isAdmin 
                    ? 'text-orange-600 hover:bg-orange-50 hover:text-orange-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
              aria-current={location.pathname === item.to ? "page" : undefined}
            >
              {item.isAdmin && <Shield size={16} />}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              {/* Badge utilisateur avec rôle visible */}
              <motion.div 
                className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  user.role === 'admin' 
                    ? 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200' 
                    : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  user.role === 'admin' ? 'bg-orange-600' : 'bg-blue-600'
                }`}>
                  {user.role === 'admin' ? (
                    <Shield size={16} className="text-white" />
                  ) : (
                    <User size={16} className="text-white" />
                  )}
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900 block">
                    {user.prenom || user.nom}
                  </span>
                  {user.role === 'admin' && (
                    <span className="text-xs text-orange-600 font-medium">Admin</span>
                  )}
                </div>
              </motion.div>

              <motion.button
                onClick={handleLogout}
                className="relative flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity transform -skew-x-12 group-hover:translate-x-full duration-700"></span>
                <LogOut size={20} className="relative z-10" />
                <span className="relative z-10 hidden sm:inline">Déconnexion</span>
              </motion.button>
            </div>
          ) : (
            <motion.button
              onClick={handleLogin}
              className="relative flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity transform -skew-x-12 group-hover:translate-x-full duration-700"></span>
              <UserCircle size={20} className="relative z-10" />
              <span className="relative z-10">Connexion</span>
            </motion.button>
          )}

          {/* Menu burger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
                  px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2
                  ${location.pathname === item.to 
                    ? 'bg-blue-600 text-white' 
                    : item.isAdmin
                      ? 'text-orange-600 hover:bg-orange-50'
                      : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {item.isAdmin && <Shield size={16} />}
                {item.label}
              </Link>
            ))}
            
            {/* Actions mobile */}
            {isAuthenticated && user ? (
              <div className="pt-2 border-t border-gray-200 space-y-2 mt-2">
                <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
                  user.role === 'admin'
                    ? 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200'
                    : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    user.role === 'admin' ? 'bg-orange-600' : 'bg-blue-600'
                  }`}>
                    {user.role === 'admin' ? (
                      <Shield size={18} className="text-white" />
                    ) : (
                      <User size={18} className="text-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {user.prenom} {user.nom}
                    </p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                    {user.role === 'admin' && (
                      <p className="text-xs text-orange-600 font-medium mt-1">Administrateur</p>
                    )}
                  </div>
                </div>
                
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
                  handleLogin();
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
  );
}