import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContextRecipes } from '../context/ProviderApp';
import {
  fetchCategories,
  fetchCategoriesFilter, fetchMealsAPI, fetchDrinksAPI } from '../services/RecipesApi';
/* import AllRecipes from './Recipes'; */
// No requisito 22 não foi possivel acessar o estado dentro da função handleButtonCategory,
// então criei uma let toggle para simular o estado
let toggle = 'testando';
function CategoriasRecipes({ foodRecipes }) {
  const { categories, setCategories, setAllFoods, setAllDrinks } = ContextRecipes();
  /* const [stateToggle, setStateToggle] = useState('') */

  const maxNumberOfButtons = 5;
  async function renderAllCategories() {
    if (foodRecipes === 'meals') {
      const foodsAPI = await fetchMealsAPI();
      setAllFoods(foodsAPI);
    }
    if (foodRecipes === 'drinks') {
      const drinksAPI = await fetchDrinksAPI();
      setAllDrinks(drinksAPI);
    }
  }
  async function handleButtonCategory(category) {
    /* toggle = category; */
    if (foodRecipes === 'meals') {
      if (toggle === category) {
        toggle = '';
        return renderAllCategories();
      }
      toggle = category;
      const getFilterAPI = await fetchCategoriesFilter(category, foodRecipes);
      setAllFoods(getFilterAPI);
    }
    if (foodRecipes === 'drinks') {
      if (toggle === category) {
        toggle = '';
        return renderAllCategories();
      }
      toggle = category;
      const getFilterAPI = await fetchCategoriesFilter(category, foodRecipes);
      setAllDrinks(getFilterAPI);
    }
  }
  async function renderCategories() {
    const allCategories = await fetchCategories(foodRecipes);

    if (allCategories) {
      const nome = allCategories[foodRecipes].map((category, index) => {
        if (index < maxNumberOfButtons) {
          return (
            <button
              type="button"
              key={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => handleButtonCategory(category.strCategory) }
            >
              { category.strCategory }
            </button>
          );
        }
        return null;
      });
      setCategories(nome);
    }
  }
  useEffect(() => {
    renderCategories();
  }, []);

  return (
    <div>
      {categories}
      <button
        type="button"
        onClick={ renderAllCategories }
        data-testid="All-category-filter"
      >
        Todos
      </button>
    </div>
  );
}

CategoriasRecipes.propTypes = {
  foodRecipes: PropTypes.bool,
}.isRequired;

export default CategoriasRecipes;
