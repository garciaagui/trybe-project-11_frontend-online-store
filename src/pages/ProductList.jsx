import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Aside from '../components/Aside';

class ProductList extends Component {
  render() {
    return (
      <div>
        <span data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>
        <Aside />
        <Link data-testid="shopping-cart-button" to="/shopping-cart">
          <button type="button">
            Carrinho de Compras
          </button>
        </Link>
      </div>
    );
  }
}

export default ProductList;
