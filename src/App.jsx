// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Annonces from "./pages/Annonces";
import Deposer from "./pages/Deposer";
import Profil from "./pages/Profil";
import AdminModeration from "./pages/AdminModeration";
import UserDashboard from "./pages/UserDashboard";
import Apropos from "./pages/Apropos";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Erreur lors de la lecture de l'utilisateur:", e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="app-root min-h-screen bg-gray-50">
      <Header user={user} setUser={setUser} />
      
      <main id="main" className="pt-32 min-h-screen" role="main" tabIndex={-1}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <Routes>
            {/* Pages publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/annonces" element={<Annonces />} />
            <Route path="/apropos" element={<Apropos />} />
            
            {/* Pages protégées - Utilisateurs normaux */}
            <Route 
              path="/profil" 
              element={
                <ProtectedRoute pageName="votre profil" requiredRole="user">
                  <Profil user={user} setUser={setUser} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/deposer" 
              element={
                <ProtectedRoute pageName="la publication d'annonces" requiredRole="user">
                  <Deposer user={user} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute pageName="le tableau de bord" requiredRole="user">
                  <UserDashboard user={user} />
                </ProtectedRoute>
              } 
            />
            
            {/* Page protégée - Administrateurs SEULEMENT */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute pageName="l'administration" requiredRole="admin">
                  <AdminModeration user={user} />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}