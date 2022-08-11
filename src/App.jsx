import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Checkout from './pages/Checkout';
import ProductCardDetails from './pages/ProductCardDetails';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ ProductList } />
            <Route exact path="/shopping-cart" component={ ShoppingCart } />
            <Route
              exact
              path="/product-details/:id"
              render={ (props) => <ProductCardDetails { ...props } /> }
            />
            <Route
              exact
              path="/checkout"
              render={ (props) => <Checkout { ...props } /> }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
