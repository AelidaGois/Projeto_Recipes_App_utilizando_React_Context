import React, { useContext } from 'react';
import ContextApp from '../context/ContextApp';

function FoodRecipes() {
  const {
    data,
  } = useContext(ContextApp);
  console.log(data);
  const { strMeal } = data;
  return (

    <div>
      <p>receitas</p>
      <img src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" alt="aaa" />
      <h2>{strMeal}</h2>
      <ul>
        <li>aaa</li>
      </ul>
      <p>aaa</p>

    </div>
  );
}

export default FoodRecipes;
