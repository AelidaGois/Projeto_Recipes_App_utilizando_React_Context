import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  function redirect(page) {
    history.push(`/${page}`);
  }
  return (

    <div data-testid="footer" className="footer">
      <button
        type="button"
        onClick={ () => redirect('foods') }
      >
        <img src={ mealIcon } alt="Foods" data-testid="food-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ () => redirect('drinks') }
      >
        <img src={ drinkIcon } alt="Drink" data-testid="drinks-bottom-btn" />
      </button>

    </div>
  );
}
export default Footer;
