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

// TENTATIVA FINAL //
// AJUDA DO THIAGO QUADROS //

export async function fetchCatoriesFoodsAPI() {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const response = data.json();
  return response;
}

export async function fetchCatoriesDrinksAPI() {
  const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const response = data.json();
  return response;
}

export async function fetchCategoriesFilter(filter, type) {
  if (type === 'meals') {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`);
    const response = data.json();
    return response;
  }
  if (type === 'drinks') {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`);
    const response = data.json();
    return response;
  }
}

export const foodsDrinksDetails = async (url) => {
  const data = await fetch(url);
  const response = await data.json();
  if (url.includes('cocktail')) {
    return response.drinks[0];
  } return response.meals[0];
};

export const fetchCategories = async (foodRecipes) => {
  if (foodRecipes === 'meals') return fetchCatoriesFoodsAPI();
  return fetchCatoriesDrinksAPI();
};

/* export default fetchCategories; */
