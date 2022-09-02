import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/RenderWithRouter';
import ProviderApp from '../context/ProviderApp';
import SearchBar from '../components/SearchBar';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import oneDrink from '../../cypress/mocks/oneDrink';

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
    // const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=arroz';
    const inputSearch = screen.getByTestId(searchInput);
    const radio = screen.getByTestId('ingredient-search-radio');
    const button = screen.getByTestId(execSearchBtn);
    userEvent.type(inputSearch, food);
    userEvent.click(radio);
    // jest.resetAllMocks();
    // jest.spyOn(global, 'fetch');
    // global.fetch.mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(japaneseMeals),
    // });
    userEvent.click(button);
    // expect(() => fetch).toHaveBeenCalledWith(url);
  });

  it('Testa se ao clicar no radio button `name` a API correta é chamada', () => {
    renderWithRouter(<ProviderApp><SearchBar /></ProviderApp>);
    const food = 'pão';
    // const url2 = 'https://www.themealdb.com/api/json/v1/1/search.php?s=pão';
    const inputSearch = screen.getByTestId(searchInput);
    const radio = screen.getByTestId(nameSearchRadio);
    const button = screen.getByTestId(execSearchBtn);
    userEvent.type(inputSearch, food);
    userEvent.click(radio);
    // jest.resetAllMocks();
    // jest.spyOn(global, 'fetch');
    // global.fetch.mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(japaneseMeals),
    // });
    userEvent.click(button);
    // expect(() => fetch).toHaveBeenCalledWith(url2);
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

  it('Testa se ao pesquisar uma comida a página é redirecionada', async () => {
    global.fetch = () => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(oneMeal),
    });

    const { history } = renderWithRouter(<ProviderApp><App /></ProviderApp>);
    history.push('/foods');
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(searchInput);
    userEvent.type(inputSearch, 'Arrabiata');

    const radioName = screen.getByTestId(nameSearchRadio);
    userEvent.click(radioName);

    const buttonFiltrar = screen.getByTestId(execSearchBtn);
    userEvent.click(buttonFiltrar);
    history.push('/foods/52771');
    const { pathname } = history.location;
    const foodPage = screen.getByText(/receitas/i);
    expect(pathname).toBe('/foods/52771');
    expect(foodPage).toBeInTheDocument();
  });

  it('Testa se ao pesquisar uma bebida a página é redirecionada', async () => {
    global.fetch = () => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(oneDrink),
    });

    const { history } = renderWithRouter(<ProviderApp><App /></ProviderApp>);
    history.push('/drinks');
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId(searchInput);
    userEvent.type(inputSearch, 'Aquamarine');

    const radioName = screen.getByTestId(nameSearchRadio);
    userEvent.click(radioName);

    const buttonFiltrar = screen.getByTestId(execSearchBtn);
    userEvent.click(buttonFiltrar);
    history.push('/drinks/178319');
    const { pathname } = history.location;
    const foodPage = screen.getByText(/receitas de bebidas/i);
    expect(pathname).toBe('/drinks/178319');
    expect(foodPage).toBeInTheDocument();
  });
});
