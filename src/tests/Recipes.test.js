import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import renderWithRouter from './utils/RenderWithRouter';
import RecipesProvider from '../context/ProviderApp';
import AllRecipes from '../components/Recipes';

describe('Testes da página de Recipes', () => {
  it('Testa se renderiza alguma comida', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    const { history } = renderWithRouter(<RecipesProvider><AllRecipes title="foods" /></RecipesProvider>);
    
    history.push('/foods');
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const corba = screen.getByText(/Corba/i);
    expect(corba).toBeInTheDocument();
    
  });
  it('Testa se renderiza alguma bebida', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
  
    const { history } = renderWithRouter(<RecipesProvider><AllRecipes title="drinks" /></RecipesProvider>);
    
    history.push('/drinks');
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const corba = screen.getByText(/Adam/i);
    expect(corba).toBeInTheDocument();
    
  });
});