import React, { useEffect, useState } from 'react';
import Recipe from './recipe';
import './App.css';

function App() {

  const APP_ID = "3a3c7002";
  const APP_KEY = "c50de873cee2f46ce7b1446c8819d5c5";
  const [recipe, setRecipe] = useState([]);
  const [serach, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')


  useEffect(() => {
    getRecipe();
  }, [query])
  const getRecipe = async () => {
    const responce = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await responce.json();
    setRecipe(data.hits);
    console.log(data.hits);

  }

  const updateSearch = (e) => {
    setSearch(e.target.value);
    //console.log(serach)
  }

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(serach);

  }
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className='search-bar' type="text" value={serach} onChange={updateSearch}/>
        <button type='submit' className='search-button'>Search</button>
      </form>
      <div className="recipes">
        {recipe.map(recipe => (
        <Recipe
      key= {recipe.recipe.label}
      title = {recipe.recipe.label}
      ingredients = {recipe.recipe.ingredients}
      calories = {recipe.recipe.calories}
      image={recipe.recipe.image}
      />
      )

      )}
      </div>


    </div>
  );
}

export default App;
