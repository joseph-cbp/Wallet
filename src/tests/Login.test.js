import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o Componente <Login/>', () => {
  it('Verifica se o formulário está sendo renderizado na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it(
    `Verifica: 
    - Formulário é renderizado na tela;
    - Se forem passados emails com estrutura errada o botão "Entrar" é habilitado
    - Se for passada uma senha menor que 6 dígitos, o botão de "Entrar" é habilitado`,
    () => {
      renderWithRouterAndRedux(<App />);
      const inputEmail = screen.getByTestId('email-input');
      const inputPassword = screen.getByTestId('password-input');
      const buttonLogin = screen.getByRole('button', { name: /entrar/i });
      const emailsToTest = ['teste@teste', 'teste.com'];

      expect(inputEmail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();

      emailsToTest.forEach((test) => {
        userEvent.type(inputEmail, test);
        userEvent.type(inputPassword, '12345');
        expect(buttonLogin).toBeDisabled();
        userEvent.clear(inputEmail);
        userEvent.clear(inputPassword);
      });

      userEvent.type(inputEmail, 'teste@teste.com');
      userEvent.type(inputPassword, '12345');
      expect(buttonLogin).toBeDisabled();
    },
  );

  it('Verifica path de redirecionamento', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '123456');
    expect(buttonLogin).toBeEnabled();

    act(() => {
      userEvent.click(buttonLogin);
    });
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});
