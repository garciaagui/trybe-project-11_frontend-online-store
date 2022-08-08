import React, { Component } from 'react';
import { getProductsById } from '../services/api';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
  }

  componentDidMount = async () => {
    const id = localStorage.getItem('product');
    console.log(id);
    const products = await getProductsById(id);
    this.setState({ product: [products] });
  }

  render() {
    const { product } = this.state;
    const quantity = product.length;
    if (product.length === 0) {
      return (
        <div>
          <span
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </span>
        </div>
      );
    }
    return (
      <div>
        <p data-testid="shopping-cart-product-name">{ product[0].title }</p>
        <p>{ product[0].price }</p>
        <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
      </div>
    );
  }
}

export default ShoppingCart;
