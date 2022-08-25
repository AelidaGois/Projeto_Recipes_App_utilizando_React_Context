import React from 'react';

import Header from '../components/Header';
import AllRecipes from '../components/AllRecipes';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" enableSearch />
      <AllRecipes title="drinks" />
      <Footer />
    </div>
  );
}

export default Drinks;
