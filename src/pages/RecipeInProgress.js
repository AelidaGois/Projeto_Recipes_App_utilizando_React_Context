import React, { useEffect, useState } from 'react';
import Ingredient from '../components/Ingredient';
import { foodsDrinksDetails } from '../services/RecipesApi';

function RecipeInProgress() {
  const [stateRecipe, setStateRecipe] = useState({});
  const { pathname } = document.location; // pega o pathname que contem a url no document.location
  const { strDrinkThumb, strMealThumb, strMeal, strDrink, strCategory } = stateRecipe;
  const split = pathname.split('/');
  const chamaApi = async () => {
    const url = `https://www.the${split[1] === 'foods' ? 'meal' : 'cocktail'}db.com/api/json/v1/1/lookup.php?i=${split[2]}`;
    const apiResponse = await foodsDrinksDetails(url);
    setStateRecipe(apiResponse);
    /* const checkedInFavorite = () => (stateFavorite ? 'favorite-btn' : 'favorite-btn');
    setStateFavorite(); */
    // https://www.themealdb.com/api/json/v1/1/lookup.php?i={id-da-receita}
    // https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id-da-receita}
  };

  /* console.log(stateRecipe); */
  // DidMount
  useEffect(() => {
    chamaApi();
  }, []);
  /*
  buttonCompartilhar (event, 'Link copied!' ) {
 event.preventDefault();
 window.open(link do botão)
  } */
  return (

    <div>
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
        /* onClick={ checkedInFavorite } */
      >
        Favorite
      </button>
      <p
        data-testid="recipe-category"
      >
        { strCategory }
      </p>
      <Ingredient
        stateRecipe={ stateRecipe }
        checked
        pageName={ split[1] }
        id={ split[2] }
      />
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
