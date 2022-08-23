import React from 'react';
import { render, screen } from '@testing-library/react';
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
  });
  it('Teste se o botão está funcionando', () => {
    render(<Header />);
    const button = screen.getByRole('img', { name: /profileicon/i });
    expect(button).toBeInTheDocument();
  });
});
