import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            {user.email}
          </p>
          <p data-testid="total-field">
            0
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user,
    wallet: state.wallet,
  };
};

export default connect(mapStateToProps)(Header);
