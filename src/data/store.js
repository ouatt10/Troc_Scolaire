// src/data/store.js
import { ANNONCES as SEED } from "./annonces";

const LS_KEY = "troc_annonces_v1";

// Charger les annonces depuis le localStorage ou utiliser les données initiales
export function loadAnnonces() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("loadAnnonces error", e);
  }

  // S'il n'y a rien dans le localStorage, on initialise avec les données de base
  const seeded = SEED.map((a) => ({
    status: "published",
    createdAt: new Date().toISOString(),
    ...a,
  }));
  localStorage.setItem(LS_KEY, JSON.stringify(seeded));
  return seeded;
}

// Sauvegarder la liste dans le localStorage
export function saveAnnonces(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

// Ajouter une nouvelle annonce
export function addAnnonce(obj) {
  const list = loadAnnonces();
  const newAnnonce = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    status: "published",
    ...obj,
  };
  list.unshift(newAnnonce);
  saveAnnonces(list);
  return newAnnonce;
}

// Mettre à jour une annonce
export function updateAnnonce(id, patch) {
  const list = loadAnnonces();
  const i = list.findIndex((a) => a.id === id);
  if (i === -1) return false;
  list[i] = { ...list[i], ...patch };
  saveAnnonces(list);
  return true;
}

// Supprimer une annonce
export function removeAnnonce(id) {
  let list = loadAnnonces();
  list = list.filter((a) => a.id !== id);
  saveAnnonces(list);
  return true;
}

// Marquer une annonce comme signalée
export function flagAnnonce(id) {
  return updateAnnonce(id, { status: "flagged" });
}

// Approuver une annonce signalée
export function approveAnnonce(id) {
  return updateAnnonce(id, { status: "published" });
}
