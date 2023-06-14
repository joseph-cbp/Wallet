import React from 'react';
import WalletForm from '../components/WalletForm';

class Login extends React.Component {
  render() {
    return (
      <div>
        Login
        <input
          type="button"
          value="console"
          onClick={ () => console.log(this.props) }
        />
        <WalletForm history={ this.props.history } />
      </div>
    );
  }
}

export default Login;
