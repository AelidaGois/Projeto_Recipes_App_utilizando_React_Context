import React from 'react';
import { ContextRecipes } from '../context/ProviderApp';

function DrinkCards() {
  const cardsMaxNumber = 12;
  const { allDrinks } = ContextRecipes();

  return (
    <div>
      { allDrinks && allDrinks.drinks
        .filter((non, index) => index < cardsMaxNumber).map((drink, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
              style={ { width: '200px', height: '200px' } }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { drink.strDrink }
              {/* if(allDrinks === true)
              return drinks/{id-da-receita}; */}
            </p>
          </div>
        ))}
    </div>
  );
}

export default DrinkCards;
