import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/RenderWithRouter';
import ProviderApp from '../context/ProviderApp';
import SearchBar from '../components/SearchBar';

describe('Testes da página de SearchBar', () => {
//   beforeEach(() => {
//     jest.spyOn(global, 'fetch');
//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(meals),
//     });
//   });

  //   afterEach(() => jest.resetAllMocks());

  const searchInput = 'search-input';
  const execSearchBtn = 'exec-search-btn';

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
    const radio = screen.getByTestId('name-search-radio');
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
});
