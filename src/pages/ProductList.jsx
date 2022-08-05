import React, { Component } from 'react';

class ProductList extends Component {
  render() {
    return (
      <div>
        <span
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>
      </div>
    );
  }
}

export default ProductList;
