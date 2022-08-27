import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { ContextRecipes } from '../context/ProviderApp';

function DrinkCards(props) {
  const cardsMaxNumber = 12;
  const { allDrinks } = ContextRecipes();

  const { page } = props;
  return (
    <div>
      { allDrinks && allDrinks.drinks
        .filter((non, index) => index < cardsMaxNumber).map((drink, index) => (
          <Link to={ `/${page}/${drink.idDrink}` } key={ index }>
            <div
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
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}

DrinkCards.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default DrinkCards;
