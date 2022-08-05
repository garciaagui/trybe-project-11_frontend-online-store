import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
    };
  }

  componentDidMount = async () => {
    console.log(getCategories());
    const category = await getCategories();
    this.setState({ category });
  }

  render() {
    const { category } = this.state;
    return (
      <div>
        {category.map((cat) => (
          <div key={ cat.id }>
            <label data-testid="category" htmlFor="input">
              <input id="input" type="radio" />
              {cat.name}
            </label>
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default Aside;
