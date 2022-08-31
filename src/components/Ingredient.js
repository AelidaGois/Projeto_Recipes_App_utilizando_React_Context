import PropTypes from 'prop-types';
import React from 'react';

function Ingredient(props) {
  const { stateRecipe } = props;
  const { strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
    strIngredient16,
    strIngredient17,
    strIngredient18,
    strIngredient19,
    strIngredient20 } = stateRecipe;
  console.log(strIngredient1);
  const ingredientes = [strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
    strIngredient16,
    strIngredient17,
    strIngredient18,
    strIngredient19,
    strIngredient20];

  return (
    <div>
      <ol />
    </div>
  );
}

Ingredient.propTypes = {
  stateRecipe: PropTypes.shape({
    strIngredient1: PropTypes.string,
    strIngredient2: PropTypes.string,
    strIngredient3: PropTypes.string,
    strIngredient4: PropTypes.string,
    strIngredient5: PropTypes.string,
    strIngredient6: PropTypes.string,
    strIngredient7: PropTypes.string,
    strIngredient8: PropTypes.string,
    strIngredient9: PropTypes.string,
    strIngredient10: PropTypes.string,
    strIngredient11: PropTypes.string,
    strIngredient12: PropTypes.string,
    strIngredient13: PropTypes.string,
    strIngredient14: PropTypes.string,
    strIngredient15: PropTypes.string,
    strIngredient16: PropTypes.string,
    strIngredient17: PropTypes.string,
    strIngredient18: PropTypes.string,
    strIngredient19: PropTypes.string,
    strIngredient20: PropTypes.string,
  }).isRequired,
};
export default Ingredient;
