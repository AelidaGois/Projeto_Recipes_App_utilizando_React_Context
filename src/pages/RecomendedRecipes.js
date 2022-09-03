import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContextRecipes } from '../context/ProviderApp';
import { fetchDrinksAPI, fetchMealsAPI } from '../services/RecipesApi';

function FoodCards(props) {
  const cardsMaxNumber = 6;
  const { linkToPage } = props;
  const [saveAllDrinks, setAllDrinks] = useState({});
  const [saveAllFoods, setAllFoods] = useState({});

  const getAllRecipes = async () => {
    const drinksAPI = await fetchDrinksAPI();
    setAllDrinks(drinksAPI);

    const foodsAPI = await fetchMealsAPI();
    setAllFoods(foodsAPI);
  };
  useEffect(() => {
    getAllRecipes();
    // console.log(allFoods);
  }, []);
  console.log(saveAllDrinks);
  console.log(saveAllFoods);
  console.log(linkToPage);
  return (
    <div>
      { saveAllFoods.meals && (linkToPage[1] === 'drinks' ? saveAllFoods.meals
        .filter((non, index) => index < cardsMaxNumber).map((food, index) => (
          <Link to={ `/${linkToPage[1]}/${linkToPage[2]}` } key={ index }>
            <div
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ food.strMealThumb }
                alt={ food.strMeal }
                data-testid={ `${index}-card-img` }
                style={ { width: '200px', height: '200px' } }
              />
              <p
                data-testid={ `${index}-recomendation-card` }
              >
                { food.strMeal }
              </p>
            </div>
          </Link>
        ))
        : saveAllDrinks.drinks
          .filter((non, index) => index < cardsMaxNumber).map((food, index) => (
            <Link to={ `/${linkToPage[1]}/${linkToPage[2]}` } key={ index }>
              <div
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ food.strDrinkThumb }
                  alt={ food.strDrink }
                  data-testid={ `${index}-card-img` }
                  style={ { width: '200px', height: '200px' } }
                />
                <p
                  data-testid={ `${index}-recomendation-card` }
                >
                  { food.strDrink }
                </p>
              </div>
            </Link>
          )))}
    </div>
  );
}

FoodCards.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default FoodCards;
