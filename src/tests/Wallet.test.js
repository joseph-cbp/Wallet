import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testar componente <Wallet />', () => {
  it('Verifica se renderiza a WalletForm', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/carteira');
    });
    await screen.findByText('USD');
    const currencyInput = screen.getByTestId('currency-input');
    const addExpesesButton = screen.getByRole('button', { name: /Adicionar despesa/i });
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    userEvent.type(valueInput, '100');
    userEvent.type(descriptionInput, 'Chocolate');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.selectOptions(currencyInput, 'BTC');
    act(() => {
      userEvent.click(addExpesesButton);
    });

    waitFor(() => {
      const deleteButton = screen.getByTestId('delete-btn');
      expect(deleteButton).toBeInTheDocument();
    });
  });
});
