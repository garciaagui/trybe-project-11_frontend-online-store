import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addItem } from '../services/localStorage';

export default class Product extends Component {
  addToCart = () => {
    const { item, handleNumbCart } = this.props;
    addItem(item);
    handleNumbCart();
  }

  render() {
    const { name, price, image, id, item } = this.props;
    return (
      <div>
        <Link
          data-testid="product-detail-link"
          to={ `/product-details/${id}` }
        >
          <div data-testid="product">
            <img src={ image } alt={ name } />
            <p>{ name }</p>
            <p>{ price }</p>
          </div>
        </Link>
        <button
          id={ id }
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.addToCart }
        >
          Adicionar ao Carrinho
        </button>
        {item.shipping.free_shipping && <p data-testid="free-shipping">Frete grátis</p>}
      </div>
    );
  }
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  handleNumbCart: PropTypes.func.isRequired,
};
