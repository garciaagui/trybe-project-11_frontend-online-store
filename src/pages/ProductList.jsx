import React, { Component } from 'react';
import Aside from '../components/Aside';

class ProductList extends Component {
  render() {
    return (
      <div>
        <span
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>
        <Aside />
      </div>
    );
  }
}

export default ProductList;
