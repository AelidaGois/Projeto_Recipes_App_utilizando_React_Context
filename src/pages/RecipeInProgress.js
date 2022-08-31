import React, { useEffect, useState } from 'react';
import { foodsDrinksDetails } from '../services/RecipesApi';

function RecipeInProgress() {
  const [stateRecipe, setStateRecipe] = useState({});
  const { pathname } = document.location; // pega o pathname que contem a url no document.location
  const { strDrinkThumb, strMealThumb, strMeal, strDrink, strCategory } = stateRecipe;
  const chamaApi = async () => {
    const split = pathname.split('/');
    const url = `https://www.the${split[1] === 'foods' ? 'meal' : 'cocktail'}db.com/api/json/v1/1/lookup.php?i=${split[2]}`;
    const apiResponse = await foodsDrinksDetails(url);
    setStateRecipe(apiResponse);

    // https://www.themealdb.com/api/json/v1/1/lookup.php?i={id-da-receita}
    // https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id-da-receita}
  };

  console.log(stateRecipe);
  // DidMount
  useEffect(() => {
    chamaApi();
  }, []);

  return (

    <div>
      Requisito 37
      <img
        src={ strDrinkThumb || strMealThumb }
        alt="teste"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">
        { strDrink || strMeal }
      </h2>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar //fazer uma logica para usar componente
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
      <p
        data-testid="recipe-category"
      >
        { strCategory }
      </p>
      {/* <p
        data-testid={ `${index}-ingredient-step` }
      /> */}
      {/* //chamar um componente */}
      <div data-testid="instructions" />
      <button
        type="button"
        data-testid="finish-recipe-btn"
        /* onClick={}
        disabled={} */
      >
        Finalizar Receita
      </button>
    </div>
  );
}
export default RecipeInProgress;
// id bebida 14610
