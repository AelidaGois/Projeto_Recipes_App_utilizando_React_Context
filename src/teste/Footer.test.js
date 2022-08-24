import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Footer from '../components/Footer';
import renderWithRouter from './utils/RenderWithRouter';
import App from '../App';

function urlValidade(url, history) {
  const { pathname } = history.location;

  expect(pathname).toBe(`/${url}`);
}
describe('Testes da página de Footer', () => {
  it('Testa id food e drink', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const food = screen.getByTestId('food-bottom-btn');
    expect(food).toBeInTheDocument();
    userEvent.click(food);
    urlValidade('foods', history);

    const drink = screen.getByTestId('drinks-bottom-btn');
    expect(drink).toBeInTheDocument();
    userEvent.click(drink);
    urlValidade('drinks', history);

    // const { history } = renderWithRouter(<App />);
    // history.push('/foods');
    // const food = screen.getByTestId('food-bottom-btn');
    // userEvent.click(button);
    // const drink = screen.getByTestId('drinks-bottom-btn');

    // expect(food).toBeInTheDocument();
    // expect(drink).toBeInTheDocument();
    // const btnDrinks = screen.getByRole('img', { name: /beber/i });
    // userClick(btnDrinks);
    // history.push('/drinks');
  });
});
