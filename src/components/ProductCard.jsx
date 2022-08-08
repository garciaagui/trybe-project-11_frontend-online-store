import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Product extends Component {
  render() {
    const { name, price, image, id } = this.props;
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
      </div>
    );
  }
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
