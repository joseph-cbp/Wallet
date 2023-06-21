import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  // handleEdit = ({ tag, currency, description, method, value }) => {
  //   this.setState(() => ({
  //     tagInput: tag,
  //     currencyInput: currency,
  //     descriptionInput: description,
  //     methodInput: method,
  //     valueInput: value,
  //   }));
  // };

  render() {
    return (
      <div>
        TrybeWallet
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default connect()(Wallet);
