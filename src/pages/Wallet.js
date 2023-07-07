import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import './Wallet.css';

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
      <div className="wallet-main-container">
        <div className="wallet-info">
          TrybeWallet
          <Header />
          <WalletForm />
        </div>

        <div className="wallet-table">
          <Table />
        </div>
      </div>
    );
  }
}

export default connect()(Wallet);
