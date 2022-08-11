import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Product from '../components/ProductCard';
import { getProductsFromCategoryAndQuery, getProductsByCategory } from '../services/api';
import { getCartItems } from '../services/localStorage';
import Aside from '../components/Aside';

class ProductList extends Component {
  state = {
    valueInput: '',
    dataReturned: [],
    category: '',
    products: [],
  }

  componentDidMount = () => {
    const result = getCartItems();
    this.setState({ products: result });
  }

  setValueInput = (event) => {
    const { value } = event.target;
    this.setState({ valueInput: value });
  }

  handleCategory = ({ target }) => {
    this.setState({ dataReturned: [] }, () => {
      this.setState({ category: target.value }, async () => {
        const { category } = this.state;
        const data = await getProductsByCategory(category);
        const fetchFail = data.results.length === 0;
        this.setState({
          dataReturned: data.results,
          fetchFail,
          valueInput: '' });
      });
    });
  }

  searchQuery = async () => {
    const { valueInput } = this.state;
    this.setState({ dataReturned: [] }, async () => {
      const data = await getProductsFromCategoryAndQuery(valueInput);
      const fetchFail = data.results.length === 0;
      this.setState({
        dataReturned: data.results,
        fetchFail,
        category: '' });
    });
  }

  handleNumbCart = () => {
    const result = getCartItems();
    this.setState({ products: result });
  }

  render() {
    const { valueInput, dataReturned, fetchFail, products, category } = this.state;
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
          <Aside
            handleNumbCart={ this.handleNumbCart }
            isThisCategory={ category }
            handleCategory={ this.handleCategory }
          />
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
                    id={ item.id }
                    name={ item.title }
                    price={ item.price }
                    image={ item.thumbnail }
                    item={ item }
                    handleNumbCart={ this.handleNumbCart }
                  />))
              ) }
            </div>
          </div>
        </main>
        <Link data-testid="shopping-cart-button" to="/shopping-cart">
          <button type="button">
            Carrinho de Compras
          </button>
          {products === null
            ? <p>0</p> : (<p data-testid="shopping-cart-size">{ products.length }</p>)}
        </Link>
      </div>
    );
  }
}

export default ProductList;
