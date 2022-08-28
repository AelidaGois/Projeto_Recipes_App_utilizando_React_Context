import React from 'react';

function RecipeDetails() {
  const onClickRecipeDetails = () => {

  };
  return (
    <div>
      <p>Tela de Detalhes da Receita</p>
      <button
        type="submit"
        data-testid="start-recipe-btn"
        name="buttonRecipeDetails"
        onClick={ onClickRecipeDetails }
      >
        Star Recipe
      </button>

    </div>
  );
}

export default RecipeDetails;
