export async function fetchDrinksAPI() {
  const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const response = await data.json();
  return response;
}

export async function fetchMealsAPI() {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const response = data.json();
  return response;
}
