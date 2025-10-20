// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import Accueil from "./pages/Home";
import Annonces from "./pages/Annonces";
import Deposer from "./pages/Deposer";
import Profil from "./pages/Profil";
import AdminModeration from "./pages/AdminModeration";
import UserDashboard from "./pages/UserDashboard";
import Apropos from "./pages/Apropos";

export default function App() {
  return (
    <div className="app-root min-h-screen bg-gray-50">
      <Header />
      <main id="main" className="pt-32 min-h-screen" role="main" tabIndex={-1}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/annonces" element={<Annonces />} />
            <Route path="/apropos" element={<Apropos />} />

            <Route
              path="/profil"
              element={
                <ProtectedRoute pageName="votre profil">
                  <Profil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deposer"
              element={
                <ProtectedRoute pageName="la publication d'annonces">
                  <Deposer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute pageName="le tableau de bord">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute pageName="l'administration" requiredRole="admin">
                  <AdminModeration />
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
