import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ContextApp from '../context/ContextApp';

function SearchBar() {
// 1º escrever um ingrediente e escolher o radio ingredient
// 2º clicar no botão Search
// 3º o search irá selecionar a API correta
// 4º Após a API correta ela será chamada com o termo da busca
  const history = useHistory();
  const {
    stateSearch,
    setStateSearch,
    stateRadio,
    setStateRadio } = useContext(ContextApp);

  const getAPI = async (ingrediente, radio) => {
    if (radio === 'f' && ingrediente.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
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

  const handleSubmitButton = (e) => {
    e.preventDefault();
    console.log(stateRadio);
    getAPI(stateSearch.value, stateRadio.id);
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
