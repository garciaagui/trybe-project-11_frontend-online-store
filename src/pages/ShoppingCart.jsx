import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCartItems,
  addItem,
  removeItem,
  decreaseItem } from '../services/localStorage';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
  }

  componentDidMount = () => {
    const productResult = getCartItems();
    console.log(productResult);
    this.setState({ product: productResult });
  }

  increaseQuantity = (item) => {
    const { available_quantity: availableQuantity } = item;
    const { product } = this.state;
    const itemsQuantity = product.filter((i) => i.id === item.id).length;
    if (itemsQuantity < availableQuantity) {
      addItem(item);
      this.setState((prevState) => ({
        product: [...prevState.product, item],
      }));
    }
  }

  decreaseQuantity = (item) => {
    const { product } = this.state;
    const itemsQuantity = product.filter((i) => i.id === item.id).length;
    if (itemsQuantity > 1) {
      const itemIndex = product.lastIndexOf(product.find((i) => i.id === item.id));
      decreaseItem(item);
      this.setState((prevState) => ({
        product: prevState.product
          .filter((_, index) => itemIndex !== index),
      }));
    }
  }

  removeFromCart = (item) => {
    removeItem(item);
    this.setState((prevState) => ({
      product: prevState.product
        .filter((el) => el.id !== item.id),
    }));
  }

  render() {
    const { product } = this.state;
    if (!product) {
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
      // Explicação de como utilizei o Reduce:
      // 1o: Defini um array como valor inicial do acumulador (acc);
      // 2o: Para cada elemento de product, verifiquei se havia um semelhante no array do acumulador, utilizando o atributo "id" para comparação. Caso não houvesse, o elemento em questão é acrescentado no array do acc via método push.
      // 3o: Ao final da iteração, temos um array sem produtos repetidos no qual podemos replicar a estrutura e lógica existentes.
      <div>
        {
          product.reduce((acc, curr) => {
            if (!acc.some((e) => e.id === curr.id)) acc.push(curr);
            return acc;
          }, [])
            .map((p) => (
              <div key={ p.id }>
                <p data-testid="shopping-cart-product-name">{ p.title }</p>
                <p>{ p.price }</p>
                <p data-testid="shopping-cart-product-quantity">
                  { product.filter((pro) => pro.id === p.id).length }
                </p>
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  onClick={ () => this.increaseQuantity(p) }
                >
                  +1
                </button>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ () => this.decreaseQuantity(p) }
                >
                  -1
                </button>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={ () => this.removeFromCart(p) }
                >
                  Remover do Carrinho
                </button>
              </div>
            ))
        }
        <div>
          <Link data-testid="checkout-products" to="/checkout">
            <button type="button">
              Finalizar Compras
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
