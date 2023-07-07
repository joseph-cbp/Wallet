import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../pages/Wallet.css';

class Header extends Component {
  render() {
    const { user, wallet } = this.props;
    const { sumTotal } = wallet;
    return (
      <div>
        <header className="header-menu">
          <div
            data-testid="header-currency-field"
            className="header-info"
          >
            Wallet
          </div>
          <div
            data-testid="total-field"
            className="header-info total-field"
          >
            {`Total de Despesas: ${sumTotal} BRL`}
          </div>
          <div
            data-testid="email-field"
            className="header-info"
          >
            {`E-mail: ${user.email}`}
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    sumTotal: PropTypes.string.isRequired,
  }).isRequired,
};
