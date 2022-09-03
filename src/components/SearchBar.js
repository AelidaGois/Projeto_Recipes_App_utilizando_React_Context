import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ContextApp from '../context/ContextApp';
import { getAPI } from '../services/getAPI';

function SearchBar() {
  const history = useHistory();
  const { pathname } = history.location;
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
    setData({ ...data,
      treatedApi,
    });
    if (pathname.includes('/foods')) {
      if (!treatedApi) {
        console.log('erro treatedAPI');
      } else if (treatedApi.meals.length === 1) {
        setStateIdMeal(...stateIdMeal,
          treatedApi.meals[0].idMeal);
        history.push(`/foods/${treatedApi.meals[0].idMeal}`);
      }
    } else if (pathname.includes('/drinks')) {
      if (!treatedApi) {
        console.log('erro treatedAPI');
      } else if (treatedApi.drinks.length === 1) {
        setIdDrinks(...stateIdDrinks,
          treatedApi.drinks[0].idDrink);
        history.push(`/drinks/${treatedApi.drinks[0].idDrink}`);
      }
    }
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    if (stateSearch.value.length > 1 && stateRadio.id === 'f') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const apiResults = await getAPI(stateSearch.value, stateRadio.id, pathname);
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
          type="submit"
          onClick={ handleSubmitButton }
        >
          search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
