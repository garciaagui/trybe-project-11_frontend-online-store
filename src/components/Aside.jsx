import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories, getProductsByCategory } from '../services/api';
import Product from './ProductCard';

class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      resultsFromCategory: [],
    };
  }

  //

  componentDidMount = async () => {
    const category = await getCategories();
    this.setState({ category });
  }

  listCategory = async (cat) => {
    const list = await getProductsByCategory(cat.id);
    this.setState({ resultsFromCategory: list.results });
  }

  render() {
    const { category, resultsFromCategory } = this.state;
    const { handleNumbCart } = this.props;
    return (
      <div>
        { resultsFromCategory.length === 0
          ? category.map((cat) => (
            <div key={ cat.id }>
              <label data-testid="category" htmlFor={ cat.id }>
                <input
                  id={ cat.id }
                  type="radio"
                  onChange={ () => this.listCategory(cat) }
                />
                {cat.name}
              </label>
              <br />
            </div>
          ))
          : resultsFromCategory.map((product) => (
            <Product
              key={ product.id }
              id={ product.id }
              name={ product.title }
              price={ product.price }
              image={ product.thumbnail }
              item={ product }
              handleNumbCart={ handleNumbCart }
            />
          ))}
      </div>
    );
  }
}

Aside.propTypes = {
  handleNumbCart: PropTypes.func.isRequired,
};

export default Aside;
