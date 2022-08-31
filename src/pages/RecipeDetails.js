import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ButtonStartRecipe from '../components/ButtonStartRecipe';
import { getAPIById } from '../services/getAPI';

function RecipeDetails() {
  const { pathname } = useLocation();
  const params = useParams();
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

  return (
    <div>
      <ButtonStartRecipe id={ params.recipeId } page={ pathname.split('/')[1] } />
    </div>
  );
}

export default RecipeDetails;
