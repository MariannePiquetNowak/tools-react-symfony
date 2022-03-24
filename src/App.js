import React, { useState, useEffect, Fragment } from 'react'
import './App.css';
import { currentDate } from "./services/index";
function App() {
  const [categories, setCategories] = useState([]) // Retour de l'API
  const [loading, setloading] = useState(true)
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value }); 
  };

/* REQUETE GET */
useEffect(() => {
  fetch(`https://localhost:8000/api/categories`)
    .then((res) => res.json())
    .then((data) => {
      // setCategories(data);
      setCategories(data['hydra:member'])
      setloading(false)
    })
    
}, [categories])


/* REQUETE POST */
  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = { 
      "name": formData.name, 
      "slug": formData.slug 
    }

    await fetch(`https://localhost:8000/api/categories`, {
      method: "POST", 
      headers: { 
        "Content-Type": "application/json; application/ld+json",
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => {
      console.log(res)
      return res.json()
    })
    // .then(() => window.location.reload()) // Recharge la page sans arguments dans l'url et malgré le preventDefault()
  }
  

/* REQUETE PATCH */
  const handleSubmitPatch = async (e) => {
    e.preventDefault();
    await fetch(`https://localhost:8000/api/categories/${formData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/merge-patch+json; chartset=utf-8',
        'Accept': 'application/json'
      },
      body: JSON.stringify({...formData})
    })
    .then(res => {
      console.log(res)
      return res.json();
    })
    .then(data => Object.assign(data, formData)) // remplace les anciennes données par les nouvelles  
    .then(() => window.location.reload())
    .catch(err => console.log("Erreur dans le fetch des categories", err))
  }

/* REQUETE DELETE */
const handleSubmitDelete = async (e) => {
  e.preventDefault();
  await fetch(`https://localhost:8000/api/categories/${formData.id}`, {method: "DELETE"})
  .then(res => res.status)
  .then(() => {
    const newDatas = categories.filter(({ id }) => {return id !== formData.id })
  })
  .then(() => window.location.reload())
}


  return (
    <div className="App">
        <p><span style={{fontWeight: "bold"}}>Date et Heure :</span> {currentDate()}</p>

      <h2 style={{color:"#50B2C0"}}>Methode Post sur API Platform</h2>
     
        <form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'start',flexDirection: "column"}}>
          <label>Nom de la catégorie</label>
          <input name="name" type="text" placeholder="Mobilier" onChange={handleChange} />
          <label>Slug de la categorie</label>
          <input name="slug" onChange={handleChange} type="text" placeholder="mobilier" />
          <button type="submit">Ajouter une catégorie</button>
        </form>

      <h2 style={{color: "#23CE6B"}}>Methode Patch sur API Platform</h2>
      <form onSubmit={handleSubmitPatch} style={{display: 'flex', alignItems: 'start',flexDirection: "column"}}>
          <label>Id de la catégorie</label>
          <input name="id" type="text" placeholder="1" onChange={handleChange} />
          <label>Nom de la catégorie</label>
          <input name="name" type="text" placeholder="Mobilier" onChange={handleChange} />
          <label>Slug de la categorie</label>
          <input name="slug" onChange={handleChange} type="text" placeholder="mobilier" />
          <button type="submit">Ajouter une catégorie</button>
      </form>

      <h2 style={{color: "#ff7f00"}}>Methode Delete sur API Platform</h2>
      <form onSubmit={handleSubmitDelete} style={{display: 'flex', alignItems: 'start',flexDirection: "column"}}>
          <label>Id de la catégorie à supprimer</label>
          <input name="id" type="text" placeholder="1" onChange={handleChange} />
          <button type="submit">supprimer une catégorie</button>
      </form>

      <h2 style={{color: "#FF4000"}}>Methode Get : Liste des catégories</h2>
      
      {loading ? (
        <div>Loading...</div>
      ) : (
      <Fragment>
          {categories.map((categorie) => (
            <div key={categorie.id}>
              <h1>{categorie.id} {categorie.name}</h1>
              <h2>{categorie.slug}</h2>
            </div>
          ))}
        </Fragment>
      )}
    </div>
  )
}

export default App;
