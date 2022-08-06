import React, { Component } from 'react';
import Product from '../Components/ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';

class ProductList extends Component {
  state ={
    valueInput: '',
    dataReturned: [],
  }

  setValueInput = (event) => {
    const { value } = event.target;
    this.setState({ valueInput: value });
  }

  searchQuery = async () => {
    const { valueInput } = this.state;
    const data = await getProductsFromCategoryAndQuery(valueInput);
    const fetchFail = data.results.length === 0;
    this.setState({ dataReturned: data.results, fetchFail });
  }

  render() {
    const { valueInput, dataReturned, fetchFail } = this.state;
    return (
      <div>
        <main>
          <label htmlFor="query-input">
            Pesquise aqui:
            { ' ' }
            <input
              id="query-input"
              data-testid="query-input"
              type="text"
              value={ valueInput }
              onChange={ this.setValueInput }
            />
          </label>
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.searchQuery }
          >
            BUSCAR
          </button>
          <div id="search-list">
            { valueInput.length === 0 ? (
              <span
                data-testid="home-initial-message"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.
              </span>
            ) : '' }
            <div>
              { fetchFail && 'Nenhum produto foi encontrado' }
              { dataReturned && (
                dataReturned.map((item) => (
                  <Product
                    key={ item.id }
                    name={ item.title }
                    price={ item.price }
                    image={ item.thumbnail }
                  />))
              ) }
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default ProductList;
