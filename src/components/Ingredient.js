import PropTypes from 'prop-types';
import React from 'react';

function Ingredient(props) {
  const { stateRecipe, checked } = props;
  console.log(checked);
  const arrayIngredientes = Object.entries(stateRecipe)
    .filter((ingrediente) => (ingrediente[1] && ingrediente[0]
      .includes('Ingredient') && ingrediente[1].length > 0));

  return (
    <div>
      <ul>
        {arrayIngredientes.map((ingrediente, index) => (
          <li
            key={ ingrediente[0] }
            data-testid={ `${index}-ingredient-step` }
          >
            {checked && <input type="checkbox" />}
            { ingrediente[1] }
          </li>
        ))}
      </ul>
    </div>
  );
}

Ingredient.propTypes = {
  stateRecipe: PropTypes.object,
}.isRequired;

export default Ingredient;
