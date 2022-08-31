import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

function ButtonStartRecipe(props) {
  const history = useHistory();
  const { id, page } = props;

  function redirect() {
    history.push(`/${page}/${id}/in-progress`);
  }

  return (
    <button
      className="recipesDetails"
      type="button"
      data-testid="start-recipe-btn"
      name="buttonRecipeDetails"
      onClick={ redirect }
    >
      Star Recipe
    </button>
  );
}

ButtonStartRecipe.propTypes = {
  id: PropTypes.string,
  page: PropTypes.string,
}.isRequired;
export default ButtonStartRecipe;
