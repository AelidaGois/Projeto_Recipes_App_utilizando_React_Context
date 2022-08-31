import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/ButtonStartRecipe.css';

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
      Start Recipe
    </button>
  );
}

ButtonStartRecipe.propTypes = {
  id: PropTypes.string,
  page: PropTypes.string,
}.isRequired;
export default ButtonStartRecipe;
