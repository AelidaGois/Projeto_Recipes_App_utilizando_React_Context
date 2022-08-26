import React from 'react';

import Header from '../components/Header';
import AllRecipes from '../components/AllRecipes';
import CategoriasRecipes from '../components/CategoriesRecipes';
import Footer from '../components/Footer';

function Foods() {
  return (
    <div>
      <Header title="Foods" enableSearch />
      <CategoriasRecipes foodRecipes="meals" />
      <AllRecipes title="foods" />
      <Footer />
    </div>
  );
}

export default Foods;
