import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o Componente <Login/>', () => {
  renderWithRouterAndRedux(<App />);
  const inputEmail = screen.getByTestId('email-input');
  const inputPassword = screen.getByTestId('password-input');
  const { history } = renderWithRouterAndRedux(<App />);

  it('Verifica se o formulário está sendo renderizado na tela', () => {
    // const { history } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });
  it('Verifica se for passados emails com estrutura errada, o botão de entrar é habilitado', () => {
    // renderWithRouterAndRedux(<App />);
    // const inputEmail = screen.getByTestId('email-input');
    const emailsToTest = ['teste@teste', 'teste.com'];

    emailsToTest.forEach((test) => {
      userEvent.type(inputEmail, test);
      userEvent.type(inputPassword, '123456');
      const buttonLogin = screen.getByRole('button', { name: /entrar/i });
      expect(buttonLogin).toBeDisabled();
    });
  });
  it('Verifica se uma senha menor do que 6 digitos for passada, o botão é habilitado', () => {
    // renderWithRouterAndRedux(<App />);
    // const inputEmail = screen.getByTestId('email-input');
    // const inputPassword = screen.getByTestId('password-input');
    // const buttonLogin = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '12345');
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    expect(buttonLogin).toBeDisabled();
  });
  it('Verifica path de redirecionamento', () => {
    userEvent.type(inputEmail, 'teste@teste.com');
  });
});
