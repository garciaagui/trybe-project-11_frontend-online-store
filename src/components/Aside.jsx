import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    const { handleCategory, isThisCategory } = this.props;
    return (
      <div>
        {
          categories.map((category) => (
            <div key={ category.id }>
              <label data-testid="category" htmlFor={ category.id }>
                <input
                  id={ category.id }
                  type="radio"
                  value={ category.id }
                  checked={ isThisCategory === category.id }
                  onChange={ handleCategory }
                />
                {category.name}
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}

Aside.propTypes = {
  handleCategory: PropTypes.func.isRequired,
  isThisCategory: PropTypes.string.isRequired,
};

export default Aside;
