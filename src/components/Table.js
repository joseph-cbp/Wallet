import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense, removeExpense } from '../redux/actions/editExpenses';
import { sumTotal } from '../redux/actions/addExpenses';

class Table extends Component {
  handleEdit = (expense) => {
    const { dispatch } = this.props;
    dispatch(editExpense(expense));
  };

  handleRemove = (id) => {
    const { dispatch, wallet: { expenses } } = this.props;
    const newArr = expenses.filter((expense) => expense.id !== id);
    dispatch(removeExpense(newArr));
    dispatch(sumTotal());
  };

  render() {
    const { wallet: { expenses } } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => {
              const { id,
                description,
                tag,
                method,
                value,
                currency,
                exchangeRates } = expense;
              const valueOfNumber = (Number(value)).toFixed(2);
              const usedRate = Number(exchangeRates[currency].ask);
              const convertValue = (usedRate * valueOfNumber).toFixed(2);

              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{valueOfNumber}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{(usedRate).toFixed(2)}</td>
                  <td>{convertValue}</td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      onClick={ () => this.handleRemove(id) }
                    >
                      Excluir
                    </button>
                    <button
                      data-testid="edit-btn"
                      onClick={ () => this.handleEdit(expense) }
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

Table.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        exchangeRates: PropTypes.shape().isRequired,
        map: PropTypes.func,
      }).isRequired,
    ),

  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
