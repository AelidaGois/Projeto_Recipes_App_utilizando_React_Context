import React from 'react';

import Header from '../components/Header';
import AllRecipes from '../components/Recipes';
import CategoriasRecipes from '../components/CategoriesRecipes';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" enableSearch />
      <CategoriasRecipes foodRecipes="drinks" />
      <AllRecipes title="drinks" />
      <Footer />
    </div>
  );
}

export default Drinks;
