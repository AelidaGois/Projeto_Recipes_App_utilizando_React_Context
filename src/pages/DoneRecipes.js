import React, { useState, useEffect } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';

function DoneRecipes() {
  const [allDoneRecipes, setAllDoneRecipes] = useState([]);
  const [alertLinkCopied, setalertLinkCopied] = useState(false);
  const [buttonsFilter, setbuttonsFilter] = useState('');

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    setAllDoneRecipes(local);
  }, []);
  const elementAlert = <p>Link copied!</p>;
  const alert = () => {
    setalertLinkCopied(!alertLinkCopied);
  };

  const handleClickButtons = ({ target }) => {
    if (target.innerText === 'All') {
      setbuttonsFilter('');
    } else if (target.innerText === 'Drinks') {
      setbuttonsFilter('drink');
    } else {
      setbuttonsFilter('food');
    }
  };
  return (
    <>
      <Header title="Done Recipes" profileIcon />
      {alertLinkCopied && elementAlert}
      <button
        type="button"
        data-testId="filter-by-all-btn"
        name="buttonAll"
        onClick={ handleClickButtons }
      >
        All
      </button>
      <button
        type="button"
        data-testId="filter-by-food-btn"
        name="buttonFood"
        onClick={ handleClickButtons }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="buttonDrink"
        onClick={ handleClickButtons }
      >
        Drinks
      </button>
      {allDoneRecipes && allDoneRecipes.length && allDoneRecipes
        .filter((recip) => recip.type.includes(buttonsFilter)).map((recipe, index) => (
          <>
            <Link to={ `/${recipe.type === 'food' ? 'foods' : 'drinks'}/${recipe.id}` }>

              <img
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt="imagem da receita"

              />
              <p
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </p>
            </Link>

            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.type === 'drink' ? recipe.alcoholicOrNot
                : `${recipe.nationality} - ${recipe.category}` }

            </p>
            {console.log(recipe.type, 'tipo de receitas')}

            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate}
            </p>
            <button
              type="button"
              onClick={ () => {
                const url = recipe.type === 'food' ? `http://localhost:3000/foods/${recipe.id}`
                  : `http://localhost:3000/drinks/${recipe.id}`;
                clipboardCopy(url);
                alert();
              } }
            >
              <img
                src={ shareIcon }
                alt="foto-compartilhar"
                data-testid={ `${index}-horizontal-share-btn` }
                name="buttonCompartilhar"
              />

            </button>

            {recipe.tags.map((tagName, indexTag) => (
              <p
                key={ indexTag }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </p>
            ))}
          </>
        ))}
    </>

  );
}

export default DoneRecipes;
