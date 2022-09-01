import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/RenderWithRouter';

import Login from '../pages/Login';

describe('Testes da página de login', () => {
  const email = 'email-input';
  const password = 'password-input';
  const loginBtn = 'login-submit-btn';

  it('Testa se o input de email aparece na tela de Login', () => {
    render(<Login />);
    const emailInput = screen.getByTestId(email);

    expect(emailInput.type).toBe('email');
    expect(emailInput).toBeInTheDocument();
  });

  it('Testa se o input de senha aparece na tela de Login', () => {
    render(<Login />);
    const passwordInput = screen.getByTestId(password);

    expect(passwordInput.type).toBe('password');
    expect(passwordInput).toBeInTheDocument();
  });

  it('Testa se o botão de "Entrar" inicia desabilitado', () => {
    render(<Login />);
    const button = screen.getByTestId(loginBtn);

    expect(button).toHaveProperty('disabled', true);
  });

  it('Testa se o botão de "Entrar" é habilitado quando bota a senha e o email', () => {
    render(<Login />);
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const button = screen.getByTestId(loginBtn);

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, 'password');
    expect(button).toHaveProperty('disabled', false);
  });

  it('Testa se o botão de Entrar permanece desabilitado', () => {
    render(<Login />);
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const button = screen.getByTestId(loginBtn);

    userEvent.type(emailInput, 'teste887teste.com');
    userEvent.type(passwordInput, 'passasadas');
    expect(button).toHaveProperty('disabled', true);
  });

  it('Testa se o botão Entrar direciona o usuário para a página "/foods"', () => {
    const { history } = renderWithRouter(<Login />);
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const button = screen.getByTestId(loginBtn);

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, 'password');
    expect(button).toHaveProperty('disabled', false);

    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});
