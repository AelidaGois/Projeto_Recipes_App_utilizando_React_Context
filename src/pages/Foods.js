import React from 'react';

import Header from '../components/Header';
import AllRecipes from '../components/AllRecipes';
import Footer from '../components/Footer';

function Foods() {
  return (
    <div>
      <Header title="Foods" enableSearch />
      <AllRecipes title="foods" />
      <Footer />
    </div>
  );
}

export default Foods;
