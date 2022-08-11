import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsById } from '../services/api';
import { addItem, getCartItems } from '../services/localStorage';
import Reviews from '../components/Reviews';

export default class ProductCardDetails extends Component {
  state = {
    product: {},
    cartNumb: [],
  }

  async componentDidMount() {
    const result = getCartItems();
    this.setState({ cartNumb: result });
    const { match: { params: { id } } } = this.props;
    const productResult = await getProductsById(id);
    this.setState({ product: productResult });
  }

  handleNumbCart = (product) => {
    addItem(product);
    const result = getCartItems();
    this.setState({ cartNumb: result });
  }

  render() {
    const { product, cartNumb } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <div>
        <div>
          <p>
            Detalhes do produto pesquisado:
          </p>
          <img
            data-testid="product-detail-image"
            src={ product.thumbnail }
            alt={ product.title }
          />
          <div data-testid="product-detail-name">
            { product.title }
          </div>
          <div data-testid="product-detail-price">
            { product.price }
          </div>
        </div>
        <Link data-testid="shopping-cart-button" to="/shopping-cart">
          <button
            type="button"
          >
            Carrinho de Compras
          </button>
        </Link>
        {cartNumb === null
          ? <p>0</p> : (<p data-testid="shopping-cart-size">{ cartNumb.length }</p>)}
        <br />
        <Reviews productId={ id } />
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.handleNumbCart(product) }
        >
          Adicionar ao Carrinho

        </button>
      </div>
    );
  }
}

ProductCardDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
