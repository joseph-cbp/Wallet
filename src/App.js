import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/Wallet"
          render={ (props) => <Login { ...props } /> }
        />
        <Route
          path="/Wallet/carteira"
          component={ Wallet }
        />
      </Switch>
    </div>
  );
}

export default App;
