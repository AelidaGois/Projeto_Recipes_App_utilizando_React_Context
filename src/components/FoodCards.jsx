import React from 'react';
import { ContextRecipes } from '../context/ProviderApp';

function FoodCards() {
  const cardsMaxNumber = 12;
  const { allFoods } = ContextRecipes();

  return (
    <div>
      { allFoods && allFoods.meals
        .filter((non, index) => index < cardsMaxNumber).map((food, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ food.strMealThumb }
              alt={ food.strMeal }
              data-testid={ `${index}-card-img` }
              style={ { width: '200px', height: '200px' } }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { food.strMeal }
            </p>
          </div>
        ))}
    </div>
  );
}

export default FoodCards;
