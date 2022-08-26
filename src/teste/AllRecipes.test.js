import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { meals } from '../../cypress/mocks/meals';
import { drinks } from '../../cypress/mocks/drinks';
import { mealsCatogories } from '../../cypress/mocks/mealCategories';
import { drinksCatogories } from '../../cypress/mocks/drinkCategories';
import renderWithRouter from './utils/RenderWithRouter';

import RecipesContext from '../context/ProviderApp';

import App from '../App';

function mockFetch() {
  jest.spyOn(global, 'fetch').mockImplementation(async (url) => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return { json: async () => meals.meals };
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
  });
}

// function renderFoods() {
//   const { history } = renderWithRouter(<App />);
//   history.push('/foods');
// }

describe('Testes da página de Recipes', () => {
  it('Testa se renderiza alguma comida', async () => {
    mockFetch();
    const { history } = await (waitFor (() => renderWithRouter(
      <RecipesContext><App /></RecipesContext>,
    )));
    history.push('/foods');
    screen.logTestingPlaygroundURL();

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
});
