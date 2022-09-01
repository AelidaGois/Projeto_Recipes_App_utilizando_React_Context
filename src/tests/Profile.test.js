import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/RenderWithRouter';

import App from '../App';

function urlLink(url, history) {
  expect(history.location).toBe(`/${url}`);
}

// const emailInput = 'teste@teste.com';
// const email = screen.getByTestId('email-input');
// const senha = screen.getByTestId('password-input');

describe('Teste da página "Profile"', () => {
  it('Teste de botão "done-recipes"', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = 'teste@email.com';
    const Email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Senha');
    const btn = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(Email, emailInput);
    userEvent.type(password, '1234567');
    userEvent.click(btn);

    history.push('/profile');
    const btnDone = screen.getByTestId('profile-done-btn');
    expect(btnDone).toBeInTheDocument();
    userEvent.click(btnDone);
    urlLink('done-recipes', history);
  });

  it('Teste de botão "favorite-recipes"', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = 'teste@teste.com';
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(email, emailInput);
    userEvent.type(senha, '1234567');
    userEvent.click(btn);

    history.push('/profile');
    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
    userEvent.click(btnFavorite);
    urlLink('favorite-recipes', history);
  });

  it('Teste de botão "logout"', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = 'teste@teste.com';
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(email, emailInput);
    userEvent.type(senha, '1234567');
    userEvent.click(btn);

    history.push('/profile');
    const btnLogout = screen.getByTestId('profile-logout-btn');
    expect(btnLogout).toBeInTheDocument();
    userEvent.click(btnLogout);
    urlLink('/', history);
  });
});
