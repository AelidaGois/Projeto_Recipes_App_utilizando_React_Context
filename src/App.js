import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
// import FoodRecipes from './pages/FoodRecipes';
// import DrinkRecipes from './pages/DrinkRecipes';
import './css/Footer.css';
import './css/ButtonStartRecipe.css';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods/:foodId/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:recipeId/in-progress" component={ RecipeInProgress } />
        {/*  <Route path="/foods/:recipeId" component={ FoodRecipes } />
        <Route path="/drinks/:recipeId" component={ DrinkRecipes } /> */}
        <Route path="/foods" component={ Foods } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
