import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from './utils/RenderWithRouter';
import App from '../App';

/* describe('', () => {
  it('Testa se o botão redireciona para a tela de perfil', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/profile');
    const redireciona = screen.getByRole('heading', { name: /profile/i });
    expect(redireciona).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
}); */

const searchTop = 'search-top-btn';

describe('Teste componente Header', () => {
  it('Teste se a pagina está renderizando e redirecionando', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const button = screen.getByTestId('profile-top-btn');
    userEvent.click(button);
    history.push('/profile');
    screen.logTestingPlaygroundURL();
    const headerRenderizando = screen.getByText(/profile/i);
    expect(headerRenderizando).toBeInTheDocument();
    /* const lupa = screen.getByRole('button', { name: /searchicon/i });
    userEvent.click(lupa);
    const inputLupa = screen.getAllByTestId('search-top-btn');
    expect(inputLupa).toBeInTheDocument(); */
  });
  it('Teste se o botão está funcionando', () => {
    render(<Header />);
    const button = screen.getByRole('img', { name: /profileicon/i });
    expect(button).toBeInTheDocument();
  });
  it('Teste a função de esconder e mostrar a barra de busca', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const renderizandoButton = screen.getByTestId(searchTop);
    expect(renderizandoButton).toBeInTheDocument();
    fireEvent.click(renderizandoButton);
    const renderizaInput = screen.getByTestId(searchTop);
    expect(renderizaInput).toBeInTheDocument();
    fireEvent.click(renderizaInput);
    expect(renderizaInput).toBeInTheDocument();
  });

  it('Testa se o botão Entrar direciona o usuário para a página "/foods"', () => {
    const { history } = renderWithRouter(<Header />);
    const buttonIconProfile = screen.getByTestId('profile-top-btn');
    // const buttonTopBtn = screen.getByTestId(searchTop);

    userEvent.click(buttonIconProfile);
    // userEvent.click(buttonTopBtn);
    // expect(buttonProfile).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
    expect(buttonIconProfile).toBeInTheDocument();
  });
});
