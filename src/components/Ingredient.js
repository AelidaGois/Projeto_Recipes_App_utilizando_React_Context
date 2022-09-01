import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
/* import RecipeInProgress from '../pages/RecipeInProgress'; */

function Ingredient(props) {
  const { stateRecipe, checked, pageName, id } = props;
  const [listaDeIngredientes, setlistaDeIngredientes] = useState([]);

  const arrayIngredientes = Object.entries(stateRecipe)
    .filter((ingrediente) => (ingrediente[1] && ingrediente[0]
      .includes('Ingredient') && ingrediente[1].length > 0));
  //   console.log(arrayIngredientes[1]);

  const name = pageName === 'foods' ? 'meal' : 'cocktail';
  // DidMount
  useEffect(() => {
    const getLocalStorage = localStorage.getItem('inProgressRecipes');
    if (getLocalStorage) {
      const pegagetLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

      const recebeLocalStorage = [
        ...pegagetLocalStorage[name][id][0], ...listaDeIngredientes];
      console.log(recebeLocalStorage);
      setlistaDeIngredientes(recebeLocalStorage);
      // se o localstorage for true iremos utilizar o  localstorage
    } else {
      const criandoObj = { [name]: { [id]: '' } };
      // criando localStoja e modificando o objeto para string
      localStorage.setItem('inProgressRecipes', JSON.stringify(criandoObj));
    }
  }, []);
  // DidUpDate
  useEffect(() => {
    const objAtualiza = { [id]: [listaDeIngredientes] };
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const juntaArrays = { ...getLocalStorage };
    juntaArrays[name] = { ...objAtualiza };
    /* console.log(juntaArrays); */
    localStorage.setItem('inProgressRecipes', JSON.stringify(juntaArrays));
  }, [listaDeIngredientes]);

  const verificaCheck = (event) => {
    if (event.target.checked) {
      const lista = [...listaDeIngredientes];
      lista.push(event.target.name);
      /* console.log(lista); */
      return setlistaDeIngredientes(lista);
    }
    const lista = listaDeIngredientes
      .filter((ingredient) => ingredient !== event.target.name);
    /* console.log(lista); */
    return setlistaDeIngredientes(lista);
  };

  return (
    <div>
      <ul>
        {arrayIngredientes.map((ingrediente, index) => (
          <li
            key={ ingrediente[0] }
            data-testid={ `${index}-ingredient-step` }
          >
            {checked && <input
              name={ ingrediente[1] }
              type="checkbox"
              checked={ listaDeIngredientes.includes(ingrediente[1]) }
              onChange={ verificaCheck }
            />}
            { ingrediente[1] }
          </li>
        ))}
      </ul>
    </div>
  );
}

Ingredient.propTypes = {
  stateRecipe: PropTypes.object,
}.isRequired;

export default Ingredient;
