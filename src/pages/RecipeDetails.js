import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAPIById } from '../services/getAPI';

function RecipeDetails() {
  const { pathname } = useLocation();

  const domainID = (pathname
    .includes('/foods') ? pathname
      .replace('/foods/', '') : pathname
      .replace('/drinks/', ''));

  console.log(pathname);
  /*
  const getRecipesFromAPI = async () => {
    const sentType = domainSource(pathname);
    const setId = await getAPIById(domainID);
    console.log(sentType, setId);
  };
 */
  useEffect(() => {
    const getRecipesFromAPI = async () => {
      const setId = await getAPIById(pathname, domainID);
      console.log(setId);
    };
    getRecipesFromAPI();
  // everything in here runs when app renders
  // inside array = when array value changes useEffect runs
  });
  const onClickRecipeDetails = () => {};
  return (
    <div>
      <p>
        teste do hook url
        {pathname.replace('/foods/', '')}
      </p>
      <p>Tela de Detalhes da Receita</p>
      <button
        type="submit"
        data-testid="start-recipe-btn"
        name="buttonRecipeDetails"
        onClick={ onClickRecipeDetails }
      >
        Start Recipe
      </button>

    </div>
  );
}

export default RecipeDetails;
