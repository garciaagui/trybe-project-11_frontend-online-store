import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ProductList from './pages/ProductList';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={ ProductList } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
