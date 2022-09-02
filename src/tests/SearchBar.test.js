import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/RenderWithRouter';
import ProviderApp from '../context/ProviderApp';
import SearchBar from '../components/SearchBar';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import App from '../App';
import RecipesProvider from '../context/ProviderApp';

describe('Testes da página de SearchBar', () => {
  const searchInput = 'search-input';
  const execSearchBtn = 'exec-search-btn';
  const nameSearchRadio = 'name-search-radio';

  it('Testa se existe um input para busca', () => {
    renderWithRouter(<ProviderApp><SearchBar /></ProviderApp>);
    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
  });

  it('Testa se existe ao todo 3 radio-button', () => {
    renderWithRouter(<ProviderApp><SearchBar /></ProviderApp>);
    const radio = screen.getAllByRole('radio');
    const n = 3;
    expect(radio.length).toBe(n);
  });

  it('Testa se é chamada a API', () => {
    renderWithRouter(<ProviderApp><SearchBar /></ProviderApp>);
    const food = 'arroz';
    const inputSearch = screen.getByTestId(searchInput);
    const radio = screen.getByTestId('ingredient-search-radio');
    const button = screen.getByTestId(execSearchBtn);
    userEvent.type(inputSearch, food);
    userEvent.click(radio);
    userEvent.click(button);
   
  });

  it('Testa se ao clicar no radio button `name` a API correta é chamada', () => {
    renderWithRouter(<ProviderApp><SearchBar /></ProviderApp>);
    const food = 'pão';

  });
  it('Testa se ao clicar no radio button `name` a API correta é chamada', () => {
    renderWithRouter(<ProviderApp><SearchBar /></ProviderApp>);
    const food = 'pão';
    const inputSearch = screen.getByTestId(searchInput);
    const radio = screen.getByTestId(nameSearchRadio);
    const button = screen.getByTestId(execSearchBtn);
    userEvent.type(inputSearch, food);
    userEvent.click(radio);
    userEvent.click(button);
  });
  it(`Testa se ao clicar no radio
  first letter se houver mais de 1 letra aparece um alert`, () => {
    global.alert = jest.fn();
    renderWithRouter(<ProviderApp><SearchBar /></ProviderApp>);
    const exemple = 'ar';
    const inputSearch = screen.getByTestId(searchInput);
    const radio = screen.getByTestId('first-letter-search-radio');
    const button = screen.getByTestId(execSearchBtn);
    userEvent.type(inputSearch, exemple);
    userEvent.click(radio);
    userEvent.click(button);
    expect(global.alert).toHaveBeenCalled();
  });

  it(`Testa senão encontrar
  uma receita de comida apareça um alert`, async() => {
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(null),
    });
    global.alert = jest.fn();
    const { history} = renderWithRouter(<RecipesProvider><SearchBar /></RecipesProvider>);
    history.push('/foods')
    const inputSearch = screen.getByTestId(searchInput);
    const radio = screen.getByTestId(nameSearchRadio);
    const button = screen.getByTestId(execSearchBtn);
    userEvent.click(radio);
    userEvent.type(inputSearch, 'asdfdfdf');
    userEvent.click(button);
  
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });

  it(`Testa senão encontrar
  uma receita de bebida apareça um alert`, async() => {
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(null),
    });
    global.alert = jest.fn();
    const { history} = renderWithRouter(<RecipesProvider><SearchBar /></RecipesProvider>);
    history.push('/drinks')
    const inputSearch = screen.getByTestId(searchInput);
    const radio = screen.getByTestId(nameSearchRadio);
    const button = screen.getByTestId(execSearchBtn);
    userEvent.click(radio);
    userEvent.type(inputSearch, 'asdfdfdf');
    userEvent.click(button);
  
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  })

  it(`Testa se ao  encontrar 
  uma receita de comida se é redirecionado`, async() => {
    jest.resetAllMocks();
    
    const { history} = renderWithRouter(<RecipesProvider><SearchBar /></RecipesProvider>);
    history.push('/foods')
    const inputSearch = screen.getByTestId(searchInput);
    const radio = screen.getByTestId(nameSearchRadio);
    const button = screen.getByTestId(execSearchBtn);
    userEvent.click(radio);
    userEvent.type(inputSearch, 'banana');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    userEvent.click(button);
    await waitFor(() => expect(history.location.pathname).toBe('/foods/52771'));
   expect(history.location.pathname).toBe('/foods/52771')
  })
  it(`Testa se ao  encontrar
  uma receita de bebida se é redirecionado`, async() => {
    jest.resetAllMocks();
    const { history} = renderWithRouter(<RecipesProvider><SearchBar /></RecipesProvider>);
    history.push('/drinks')
    const inputSearch = screen.getByTestId(searchInput);
    const radio = screen.getByTestId(nameSearchRadio);
    const button = screen.getByTestId(execSearchBtn);
    userEvent.click(radio);
    userEvent.type(inputSearch, 'aquamarine');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    userEvent.click(button);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
 
   expect(history.location.pathname).toBe('/drinks/178319')
  })
  it(`Testa se nada acontece se a API falha`, async() => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => {
      return Promise.reject(null);
    });
    const { history} = renderWithRouter(<RecipesProvider><SearchBar /></RecipesProvider>);
    history.push('/drinks')
    const inputSearch = screen.getByTestId(searchInput);
    const radio = screen.getByTestId(nameSearchRadio);
    const button = screen.getByTestId(execSearchBtn);
    userEvent.click(radio);
    userEvent.type(inputSearch, 'bodfdf');
    userEvent.click(button);
    expect(history.location.pathname).not.toBe('/drinks/178319')
  })

});

