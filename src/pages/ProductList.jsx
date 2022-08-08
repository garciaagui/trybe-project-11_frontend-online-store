import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Product from '../components/ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Aside from '../components/Aside';

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
          <Aside />
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
        <Link data-testid="shopping-cart-button" to="/shopping-cart">
          <button type="button">
            Carrinho de Compras
          </button>
        </Link>
      </div>
    );
  }
}

export default ProductList;
