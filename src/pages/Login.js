import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [validate, setValidate] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const magicNumber = 6;
    if (regex.test(email) && password.length > magicNumber) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }, [email, password]);

  const saveUser = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email
          {' '}
          <input
            value={ email }
            id="email"
            name="email"
            data-testid="email-input"
            type="email"
            onChange={ ({ target }) => setEmail(target.value) }
            required
            placeholder="Digite seu email"
          />
        </label>
        <label htmlFor="password">
          Senha
          {' '}
          <input
            id="password"
            value={ password }
            name="password"
            data-testid="password-input"
            type="password"
            onChange={ ({ target }) => setPassword(target.value) }
            required
            placeholder="Digite sua senha"
          />
        </label>
        <button
          id="button"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ validate }
          onClick={ saveUser }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
