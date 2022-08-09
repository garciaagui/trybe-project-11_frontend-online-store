import React, { Component } from 'react';
import { getCartItems } from '../services/localStorage';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
  }

  componentDidMount = async () => {
    const productResult = await getCartItems();
    this.setState({ product: productResult });
  }

  render() {
    const { product } = this.state;
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
      product.map((p) => (
        <div key={ p.id }>
          <p data-testid="shopping-cart-product-name">{ p.title }</p>
          <p>{ p.price }</p>
          <p data-testid="shopping-cart-product-quantity">
            { product.filter((pro) => pro.id === p.id).length }
          </p>
        </div>
      ))
    );
  }
}

export default ShoppingCart;
