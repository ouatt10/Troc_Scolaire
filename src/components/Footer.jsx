// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="footer-shell" role="contentinfo">
      <div className="footer-inner">© {new Date().getFullYear()} TrocScolaire — Tous droits réservés</div>
    </footer>
  );
}
