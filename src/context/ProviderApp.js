import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './ContextApp';

function ProviderApp({ children }) {
  const [stateEmail, setStateEmail] = useState({ email: '',
  });
  const [statePassword, setStatePassword] = useState({ password: '',
  });
  const [stateSearch, setStateSearch] = useState('');
  const [stateRadio, setStateRadio] = useState('');
  const [stateIdMeal, setStateIdMeal] = useState('');
  const [stateIdDrinks, setIdDrinks] = useState('');
  const [data, setData] = useState({});

  const valueObj = { stateEmail,
    setStateEmail,
    statePassword,
    setStatePassword,
    stateSearch,
    setStateSearch,
    stateRadio,
    setStateRadio,
    stateIdMeal,
    setStateIdMeal,
    stateIdDrinks,
    setIdDrinks,
    data,
    setData,
  };

  return (
    <RecipesContext.Provider
      value={ valueObj }
    >
      { children }
    </RecipesContext.Provider>
  );
}

ProviderApp.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default ProviderApp;
