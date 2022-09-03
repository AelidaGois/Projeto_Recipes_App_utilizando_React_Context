import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
import ButtonStartRecipe from '../components/ButtonStartRecipe';
import Ingredient from '../components/Ingredient';
import RecomenendedRecipe from './RecomendedRecipes';
import { foodsDrinksDetails } from '../services/RecipesApi';

function RecipeDetails() {
  const params = useParams();
  const [item, setItem] = useState({});
  const { pathname } = useLocation();
  const {
    strDrinkThumb,
    strMealThumb,
    strYoutube,
    strCategory,
    strInstructions,
    strAlcoholic,
  } = item;

  const splitPathname = pathname.split('/');

  const getRecipesFromAPI = async () => {
    const url = `https://www.the${splitPathname[1] === 'foods' ? 'meal' : 'cocktail'}db.com/api/json/v1/1/lookup.php?i=${splitPathname[2]}`;
    const apiResponse = await foodsDrinksDetails(url);
    setItem(apiResponse);
  };

  useEffect(() => {
    getRecipesFromAPI();
    // everything in here runs when app renders
    // inside array = when array value changes useEffect runs
  }, []);
  return (
    <main>
      <div>
        <h2 data-testid="recipe-title">{item?.strMeal || item?.strDrink}</h2>
        {/* item?. verifica se item existe  */}
        <img
          width="200"
          data-testid="recipe-photo"
          src={ strDrinkThumb || strMealThumb }
          alt="strMealThumb"
        />
        <p data-testid="recipe-category">{strCategory }</p>
        <p data-testid="recipe-category">{strAlcoholic || ''}</p>
        <p data-testid="instructions">
          {strInstructions}
        </p>
        <ButtonShare />
        <ButtonFavorite
          stateFavorite={ item }
          pageName={ splitPathname[1] }
          id={ splitPathname[2] }
        />
        <Ingredient
          stateRecipe={ item }
          checked={ false }
          pageName={ splitPathname[1] }
          id={ splitPathname[2] }
        />
        <iframe
          data-testid="video"
          width="200"
          src={ strYoutube }
          title="strYoutube"
        >
          strYoutube
        </iframe>
      </div>
      <div>
        <ButtonStartRecipe id={ params.recipeId } page={ pathname.split('/')[1] } />
      </div>
      <div>
        <RecomenendedRecipe linkToPage={ splitPathname } />
      </div>
    </main>
  );
}

export default RecipeDetails;
