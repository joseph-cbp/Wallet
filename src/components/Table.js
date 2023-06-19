import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { wallet: { expenses } } = this.props;
    return (
      <table>
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
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
                  <td>{currency}</td>
                  <td>{usedRate}</td>
                  <td>{convertValue}</td>
                  <td>Real</td>
                  <td>Editar/Excluir</td>
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

export default connect(mapStateToProps)(Table);
