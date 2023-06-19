import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user, wallet } = this.props;
    const { sumTotal } = wallet;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            {user.email}
          </p>
          <p data-testid="total-field">
            {sumTotal}
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
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
