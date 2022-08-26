/* import { useHistory } from 'react-router-dom';

async function getAPI(ingrediente, radio) {
  const { history } = useHistory();

  const url = (radio === 'i' ? 'filter' : 'search');
  const { pathname } = history.location;
  const domain = (
    pathname === '/drinks' ? 'thecocktaildb' : 'themealdb');
  const endPointIngredient = `https://www.${domain}.com/api/json/v1/1/${url}.php?${radio}=${ingrediente}`;
  const response = await fetch(endPointIngredient);
  const results = await response.json();
  return response.ok ? Promise.resolve(results)
    : Promise.reject(results);
}

export default getAPI;
 */
