// src/pages/Auth.jsx
import React, { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isLogin ? "Connexion" : "Inscription"}</h2>

        <form className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Nom complet</label>
              <input type="text" placeholder="Entrez votre nom complet" required />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="exemple@email.com" required />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          <button type="submit" className="btn-primary">
            {isLogin ? "Se connecter" : "Créer un compte"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? (
            <>
              Pas encore de compte ?{" "}
              <span onClick={toggleForm}>Inscrivez-vous</span>
            </>
          ) : (
            <>
              Déjà inscrit ?{" "}
              <span onClick={toggleForm}>Connectez-vous</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
