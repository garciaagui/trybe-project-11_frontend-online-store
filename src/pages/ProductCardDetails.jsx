import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsById } from '../services/api';

export default class ProductCardDetails extends Component {
  state = {
    product: {},
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productResult = await getProductsById(id);
    this.setState({ product: productResult });
  }

  render() {
    const { product } = this.state;
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
          <button type="button">
            Carrinho de Compras
          </button>
        </Link>
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
