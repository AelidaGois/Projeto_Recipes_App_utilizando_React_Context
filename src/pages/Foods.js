import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Foods() {
  return (
    <div>
      <Header title="Foods" enableSearch />
      <h1>Comidas</h1>
      <Footer />
    </div>
  );
}

export default Foods;
