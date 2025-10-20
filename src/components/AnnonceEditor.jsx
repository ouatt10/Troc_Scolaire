import React, { useState } from 'react';

export default function AnnonceEditor({ annonce, onCancel, onSave }){
  const [form, setForm] = useState({
    title: annonce?.title || '',
    description: annonce?.description || '',
    price: annonce?.price || 0,
    location: annonce?.location || '',
    type: annonce?.type || 'Don'
  });

  const handle = e => setForm({...form, [e.target.name]: e.target.value});
  const submit = e => { e.preventDefault(); onSave(form); };

  return (
    <form onSubmit={submit} style={{maxWidth:600,background:'#fff',padding:12,borderRadius:8,border:'1px solid #e5e7eb'}}>
      <label>Titre<br/><input name="title" value={form.title} onChange={handle} required/></label><br/>
      <label>Type<br/>
        <select name="type" value={form.type} onChange={handle}>
          <option>Don</option><option>Vente</option><option>Échange</option>
        </select>
      </label><br/>
      <label>Prix<br/><input name="price" type="number" value={form.price} onChange={handle}/></label><br/>
      <label>Lieu<br/><input name="location" value={form.location} onChange={handle}/></label><br/>
      <label>Description<br/><textarea name="description" value={form.description} onChange={handle}/></label><br/>
      <div style={{marginTop:8,display:'flex',gap:8}}>
        <button className="btn" type="submit">Enregistrer</button>
        <button type="button" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}
