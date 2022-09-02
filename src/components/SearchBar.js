import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ContextApp from '../context/ContextApp';

function SearchBar() {
  const history = useHistory();
  const {
    stateSearch,
    setStateSearch,
    stateRadio,
    setStateRadio,
    stateIdMeal,
    setStateIdMeal,
    stateIdDrinks,
    setIdDrinks,
    data,
    setData } = useContext(ContextApp);
  // refatorando 1. separa chamada da api,
  // 2. fazer a checagem do global alet antes de enviar pra api
  // 3.possivel useeffect ao inves d usar outra função
  // 4. atenção estado global e local 5.useeffect? constante vs função
  // 5. constante usar ao inves d estado
  const getAPI = async (ingrediente, radio) => {
    const url = (radio === 'i' ? 'filter' : 'search');
    const { pathname } = history.location;
    const domain = (
      pathname === '/drinks' ? 'thecocktaildb' : 'themealdb');
    const endPointIngredient = `https://www.${domain}.com/api/json/v1/1/${url}.php?${radio}=${ingrediente}`;
    try {
      const response = await fetch(endPointIngredient);
      const results = await response.json();
      return results;
    } catch (error) {
      return error;
    }
  };
  const handleInput = ({ target: { value } }) => {
    setStateSearch({
      ...stateSearch, value,
    });
    const ingrediente = value;
    return ingrediente;
  };
  const handleRadioButton = ({ target: { id } }) => {
    setStateRadio({
      ...stateRadio, id,
    });
    return id;
  };
  const redirectToRecipe = async (apiResults) => {
    const treatedApi = await apiResults;
    const { pathname } = history.location;
    setData({ ...data,
      treatedApi,
    });
    if (pathname.includes('/foods')) {
      // console.log(treatedApi.meals);
      if (!treatedApi || treatedApi.meals === null) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (treatedApi.meals.length === 1) {
        setStateIdMeal(...stateIdMeal,
          treatedApi.meals[0].idMeal);
        return history.push(`/foods/${treatedApi.meals[0].idMeal}`);
      }
    } else {
      if (!treatedApi || treatedApi.drinks === null) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (treatedApi.drinks.length === 1) {
        setIdDrinks(...stateIdDrinks,
          treatedApi.drinks[0].idDrink);
        return history.push(`/drinks/${treatedApi.drinks[0].idDrink}`);
      }
    }
  };
  const handleSubmitButton = async (e) => {
    e.preventDefault();
    if (stateSearch.value.length > 1 && stateRadio.id === 'f') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      console.log(stateRadio.id);
      const apiResults = await getAPI(stateSearch.value, stateRadio.id);
      redirectToRecipe(apiResults);
    }
  };
  return (
    <div>
      <form>
        <label htmlFor="search">
          <input
            data-testid="search-input"
            id="search"
            type="text"
            onChange={ handleInput }
          />
        </label>
        <br />
        <label htmlFor="ingredient-search-radio">
          <input
            id="i"
            name="radio"
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ handleRadioButton }
          />
          ingredient
        </label>
        <label htmlFor="name-search-radio">
          <input
            id="s"
            name="radio"
            type="radio"
            data-testid="name-search-radio"
            onChange={ handleRadioButton }
          />
          name
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            id="f"
            name="radio"
            type="radio"
            data-testid="first-letter-search-radio"
            onChange={ handleRadioButton }
          />
          first letter
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ handleSubmitButton }
        >
          search
        </button>
      </form>
    </div>
  );
}
export default SearchBar;
