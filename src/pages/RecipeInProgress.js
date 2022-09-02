import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Ingredient from '../components/Ingredient';
import { foodsDrinksDetails } from '../services/RecipesApi';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
import RecipeContext from '../context/ContextApp';

function RecipeInProgress(props) {
  const { history } = props;
  const { stateTrueFalse } = useContext(RecipeContext);
  const [stateRecipe, setStateRecipe] = useState({});
  const { pathname } = document.location; // pega o pathname que contem a url no document.location
  const { strDrinkThumb, strMealThumb, strMeal, strDrink, strCategory } = stateRecipe;
  const split = pathname.split('/');
  const chamaApi = async () => {
    const url = `https://www.the${split[1] === 'foods' ? 'meal' : 'cocktail'}db.com/api/json/v1/1/lookup.php?i=${split[2]}`;
    const apiResponse = await foodsDrinksDetails(url);
    setStateRecipe(apiResponse);

    // https://www.themealdb.com/api/json/v1/1/lookup.php?i={id-da-receita}
    // https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id-da-receita}
  };

  /* console.log(stateRecipe); */
  // DidMount
  useEffect(() => {
    chamaApi();
  }, []);

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
      <ButtonShare />
      <ButtonFavorite
        stateFavorite={ stateRecipe }
        pageName={ split[1] }
        id={ split[2] }
      />
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
        onClick={ () => history.push('/done-recipes') }
        disabled={ stateTrueFalse }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
export default RecipeInProgress;
// id bebida 14610
