import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense } from '../redux/actions/editExpenses';

class Table extends Component {
  handleEdit = (expense) => {
    const { dispatch } = this.props;
    // event.preventDefault();
    dispatch(editExpense(expense));
  };

  render() {
    const { wallet: { expenses } } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>
            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
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
                    <button data-testid="delete-btn">
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
