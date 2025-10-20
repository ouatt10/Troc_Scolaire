// src/pages/Deposer.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Image as ImageIcon, Check, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Deposer() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    prix: "",
    categorie: "",
    niveau: "",
    type: "Vente",
    etat: "",
    image: null
  });

  const categories = [
    "Manuels scolaires",
    "Fournitures",
    "Sacs et cartables",
    "Uniformes",
    "Matériel informatique",
    "Calculatrices",
    "Autres"
  ];

  const niveaux = [
    "Primaire",
    "Collège",
    "Lycée",
    "Université",
    "Tous niveaux"
  ];

  const etats = [
    "Neuf",
    "Comme neuf",
    "Bon état",
    "État correct",
    "Usagé"
  ];

  const types = [
    { value: "Vente", label: "Vente", color: "blue" },
    { value: "Don", label: "Don", color: "green" },
    { value: "Échange", label: "Échange", color: "orange" }
  ];

  // Gestion de l'upload d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB max
        setErrors({ ...errors, image: "L'image ne doit pas dépasser 5 Mo" });
        return;
      }

      setFormData({ ...formData, image: file });
      
      // Créer une prévisualisation
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Effacer l'erreur image
      if (errors.image) {
        const newErrors = { ...errors };
        delete newErrors.image;
        setErrors(newErrors);
      }
    }
  };

  // Supprimer l'image
  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!formData.titre.trim()) newErrors.titre = "Le titre est requis";
    if (formData.titre.length < 5) newErrors.titre = "Le titre doit contenir au moins 5 caractères";
    if (!formData.description.trim()) newErrors.description = "La description est requise";
    if (formData.description.length < 20) newErrors.description = "La description doit contenir au moins 20 caractères";
    if (!formData.categorie) newErrors.categorie = "Veuillez sélectionner une catégorie";
    if (!formData.niveau) newErrors.niveau = "Veuillez sélectionner un niveau";
    if (!formData.etat) newErrors.etat = "Veuillez indiquer l'état";
    
    if (formData.type === "Vente") {
      if (!formData.prix || formData.prix <= 0) {
        newErrors.prix = "Le prix doit être supérieur à 0";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Récupérer l'utilisateur connecté
    const storedUser = localStorage.getItem("user");
    const user = JSON.parse(storedUser);

    // Créer l'annonce
    const newAnnonce = {
      id: Date.now(),
      ...formData,
      prix: formData.type === "Don" ? 0 : parseInt(formData.prix),
      vendeur: `${user.prenom} ${user.nom}`,
      vendeurId: user.id,
      statut: "En attente", // En attente de validation admin
      dateCreation: new Date().toISOString(),
      vues: 0,
      messages: 0,
      imageUrl: imagePreview || null // Pour l'instant on garde l'image en base64
    };

    // Sauvegarder l'annonce dans localStorage
    // On va créer un tableau d'annonces pour cet utilisateur
    const userAnnonces = JSON.parse(localStorage.getItem(`annonces_${user.id}`) || "[]");
    userAnnonces.push(newAnnonce);
    localStorage.setItem(`annonces_${user.id}`, JSON.stringify(userAnnonces));

    // Aussi ajouter à la liste globale des annonces (pour la page Annonces)
    const allAnnonces = JSON.parse(localStorage.getItem("allAnnonces") || "[]");
    allAnnonces.push(newAnnonce);
    localStorage.setItem("allAnnonces", JSON.stringify(allAnnonces));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Rediriger vers le profil après 2 secondes
    setTimeout(() => {
      navigate("/profil");
    }, 2000);
  };

  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  // Message de succès
  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[60vh] flex items-center justify-center"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Annonce soumise avec succès !
          </h2>
          <p className="text-gray-600">
            Votre annonce est en attente de validation. Vous serez notifié une fois qu'elle sera publiée.
          </p>
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-gray-500">Redirection vers votre profil...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-4xl font-bold text-gray-900">
          Publier une annonce
        </h1>
        <p className="text-gray-600">
          Remplissez le formulaire ci-dessous pour publier votre annonce
        </p>
      </motion.div>

      {/* Formulaire */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6"
      >
        
        {/* Type d'annonce */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Type d'annonce *
          </label>
          <div className="grid grid-cols-3 gap-4">
            {types.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData({ ...formData, type: type.value, prix: type.value === "Don" ? "0" : formData.prix })}
                className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                  formData.type === type.value
                    ? `border-${type.color}-600 bg-${type.color}-50 text-${type.color}-700`
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Titre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Titre de l'annonce *
          </label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            placeholder="Ex: Manuels de Mathématiques Terminale S"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.titre ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.titre && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.titre}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Décrivez votre article en détail (état, caractéristiques, etc.)"
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          <div className="flex items-center justify-between mt-1">
            {errors.description && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.description}
              </p>
            )}
            <p className="text-sm text-gray-500 ml-auto">
              {formData.description.length} caractères
            </p>
          </div>
        </div>

        {/* Catégorie et Niveau */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie *
            </label>
            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.categorie ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.categorie && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.categorie}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Niveau scolaire *
            </label>
            <select
              name="niveau"
              value={formData.niveau}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.niveau ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Sélectionnez un niveau</option>
              {niveaux.map((niv) => (
                <option key={niv} value={niv}>{niv}</option>
              ))}
            </select>
            {errors.niveau && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.niveau}
              </p>
            )}
          </div>
        </div>

        {/* Prix et État */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix en FCFA {formData.type === "Vente" && "*"}
            </label>
            <input
              type="number"
              name="prix"
              value={formData.prix}
              onChange={handleChange}
              disabled={formData.type === "Don"}
              placeholder={formData.type === "Don" ? "Gratuit" : "Ex: 15000"}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                errors.prix ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.prix && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.prix}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              État *
            </label>
            <select
              name="etat"
              value={formData.etat}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.etat ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Sélectionnez l'état</option>
              {etats.map((etat) => (
                <option key={etat} value={etat}>{etat}</option>
              ))}
            </select>
            {errors.etat && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.etat}
              </p>
            )}
          </div>
        </div>

        {/* Upload d'image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photo de l'article (optionnel)
          </label>
          
          {!imagePreview ? (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-all">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-600">
                  <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500">PNG, JPG ou JPEG (MAX. 5 Mo)</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Prévisualisation"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
              >
                <X size={18} />
              </button>
            </div>
          )}
          {errors.image && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.image}
            </p>
          )}
        </div>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Publication en cours...
              </>
            ) : (
              <>
                <Upload size={18} />
                Publier l'annonce
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate("/profil")}
            className="sm:w-auto px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
          >
            Annuler
          </button>
        </div>

        {/* Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>📌 Note :</strong> Votre annonce sera vérifiée par notre équipe avant d'être publiée. Cela peut prendre jusqu'à 24 heures.
          </p>
        </div>
      </motion.form>
    </div>
  );
}