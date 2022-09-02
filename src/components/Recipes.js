import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContextRecipes } from '../context/ProviderApp';
import { fetchMealsAPI, fetchDrinksAPI } from '../services/RecipesApi';

import FoodCards from './FoodCards';
import DrinkCards from './DrinkCards';

function AllRecipes({ title }) {
  const {
    setAllFoods,
    setAllDrinks,
  } = ContextRecipes();

  useEffect(() => {
    const getAllRecipes = async () => {
      const drinksAPI = await fetchDrinksAPI();
      setAllDrinks(drinksAPI);

      const foodsAPI = await fetchMealsAPI();
      setAllFoods(foodsAPI);
      // console.log(foodsAPI);
      // console.log(drinksAPI);
    };
    getAllRecipes();
    // console.log(allFoods);
  }, [setAllDrinks, setAllFoods]);
  return (

    <div>
      <h1>Receitas</h1>
      <h2>{title}</h2>
      {title === 'foods' ? <FoodCards page={ title } /> : <DrinkCards page={ title } />}
    </div>

  );
}
AllRecipes.propTypes = {
  title: PropTypes.string,
}.isRequires;

export default AllRecipes;
