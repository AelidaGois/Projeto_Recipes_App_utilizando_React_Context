import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import favIconWhite from '../images/whiteHeartIcon.svg';
import favIconBlack from '../images/blackHeartIcon.svg';

function ButtonFavorite(props) {
  const [stateFav, setStateFav] = useState(false);
  const { stateFavorite, pageName, id } = props;
  /* console.log(stateFavorite); */

  useEffect(() => {
    const getLocalStorage = localStorage.getItem('favoriteRecipes');
    if (!getLocalStorage) {
      const iniciarFavorite = [];
      localStorage.setItem('favoriteRecipes', JSON.stringify(iniciarFavorite));
    } else if (JSON.parse(getLocalStorage).some((item) => item.id === id)) {
      setStateFav(true);
    }
  }, []);

  const type = pageName === 'foods' ? 'food' : 'drink';
  const clickButton = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const objButtonFavorite = { id,
      type,
      nationality: stateFavorite.strArea || '',
      category: stateFavorite.strCategory,
      alcoholicOrNot: stateFavorite.strAlcoholic || '',
      name: stateFavorite.strMeal || stateFavorite.strDrink,
      image: stateFavorite.strMealThumb || stateFavorite.strDrinkThumb,
    };
    if (getLocalStorage.some((item) => item.id === objButtonFavorite.id)) {
      const favorite = getLocalStorage.filter((elem) => elem.id !== objButtonFavorite.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
      console.log('true');
      setStateFav(false);
    } else {
      const favorite = [...getLocalStorage, objButtonFavorite];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
      setStateFav(true);
    }
  };
  return (

    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ clickButton }
      src={ !stateFav ? favIconWhite : favIconBlack }
    >
      <img src={ !stateFav ? favIconWhite : favIconBlack } alt="heartIcon" />
    </button>

  );
}
// shareIcon.svg;
// whiteHeartIcon.svg;
// blackHeartIcon.svg

ButtonFavorite.propTypes = {
  id: PropTypes.string,
  pageName: PropTypes.string,
  stateFavorite: PropTypes.shape({
    strArea: PropTypes.string,
  }),
}.isRequired;

export default ButtonFavorite;
