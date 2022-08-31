export const domainSource = (type) => (type.includes('foods') ? 'meal' : 'cocktail');

export const getAPI = async (ingrediente, radio, pathname) => {
  const url = (radio === 'i' ? 'filter' : 'search');
  const domain = (
    pathname === '/drinks' ? 'thecocktaildb' : 'themealdb');
  const endPointIngredient = `https://www.${domain}.com/api/json/v1/1/${url}.php?${radio}=${ingrediente}`;
  const response = await fetch(endPointIngredient);
  const results = await response.json();
  return response.ok ? Promise.resolve(results)
    : Promise.reject(results);
};
export const getAPIById = async (type, id) => {
  const ENDPOINT = `https://www.the${domainSource(
    type,
  )}db.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(ENDPOINT);
  const results = await response.json();
  return response.ok ? Promise.resolve(results)
    : Promise.reject(results);
};
