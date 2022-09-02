import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import mealsCatogories from '../../cypress/mocks/mealCategories';
import drinksCatogories from '../../cypress/mocks/drinkCategories';
import renderWithRouter from './utils/RenderWithRouter';
import RecipesProvider from '../context/ProviderApp';
import corba from './utils/Mock';
/* import RecipesContext from '../context/ProviderApp'; */

import App from '../App';

function mockFetch() {
  jest.spyOn(global, 'fetch').mockImplementation(async (url) => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return { json: async () => meals };
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
      return { json: async () => drinks };
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return { json: async () => mealsCatogories };
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
      return { json: async () => drinksCatogories };
    }
    if(url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=undefined') {
      return { json: async () => corba };
    }
    return { json: async () => mealsCatogories };
  });
}

describe('Testes da página de RecipesInProgress', () => {
  it('Testa se renderiza alguma comida', async () => {
    mockFetch();
    const { history } = await (waitFor(() => renderWithRouter(
      <RecipesProvider><App /></RecipesProvider>,
    )));
    await act(async () => {
      history.push('/foods/52977/in-progress');
    });
    /* expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list'); */
  });
});
