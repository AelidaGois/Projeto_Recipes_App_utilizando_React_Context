import React from 'react';
import PropTypes from 'prop-types';

function Recipes() {
  const { name, thumb, index } = props;
  return (
    <div>
      <fieldset
        data-testid={ `${index}-recipe-card` }
      >
        <legend data-testid={ `${index}-card-name` }>
          { name }
        </legend>

        <img src={ thumb } alt={ name } data-testid={ `${index}-card-img` } />
      </fieldset>
    </div>
  );
}
Recipes.propTypes = {
  name: PropTypes.string,
  thumb: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default Recipes;
