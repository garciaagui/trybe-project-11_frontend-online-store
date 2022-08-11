import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCartItems } from '../services/localStorage';

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      fullName: '',
      email: '',
      CPF: '',
      phone: '',
      CEP: '',
      address: '',
      paymentMethod: '',
      btnDisabled: true,
    };
  }

  componentDidMount = () => {
    const productResult = getCartItems();
    console.log(productResult);
    this.setState({ product: productResult });
  }

  OnInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    this.setState({ [name]: value }, () => {
      const {
        fullName, email, CPF, phone,
        CEP, address,
        paymentMethod,
      } = this.state;
      const fullNameIsTrue = fullName.length === 0; // true ou false;
      const emailIsTrue = email.length === 0;
      const cpfIsTrue = CPF.length === 0;
      const phoneIsTrue = phone.length === 0;
      const cepIsTrue = CEP.length === 0;
      const addressIsTrue = address.length === 0;

      const paymentMethodIsTrue = paymentMethod.length === 0;

      const buttonIsDisabled = fullNameIsTrue || emailIsTrue || cpfIsTrue || phoneIsTrue
      || cepIsTrue || addressIsTrue
      || paymentMethodIsTrue;

      this.setState({ btnDisabled: buttonIsDisabled });
    });
  }

  checkoutFinished = (event) => {
    event.preventDefault();
    const { history } = this.props;
    localStorage.removeItem('cart_items');
    history.push('/');
  }

  render() {
    const {
      product,
      fullName, email, CPF, phone,
      CEP, address, btnDisabled,
    } = this.state;
    return (
      <div>
        {
          product.reduce((acc, curr) => {
            if (!acc.some((e) => e.id === curr.id)) acc.push(curr);
            return acc;
          }, [])
            .map((p) => (
              <div key={ p.id }>
                <p data-testid="shopping-cart-product-name">{ p.title }</p>
                <p>{ p.price }</p>
                <p data-testid="shopping-cart-product-quantity">
                  { product.filter((pro) => pro.id === p.id).length }
                </p>
              </div>
            ))
        }
        <form>
          <label htmlFor="checkout-fullname">
            Full Name:
            { ' ' }
            <input
              id="checkout-fullname"
              data-testid="checkout-fullname"
              name="fullName"
              type="text"
              value={ fullName }
              onChange={ this.OnInputChange }
            />
          </label>
          <label htmlFor="checkout-email">
            Email:
            { ' ' }
            <input
              id="checkout-email"
              data-testid="checkout-email"
              name="email"
              type="text"
              value={ email }
              onChange={ this.OnInputChange }
            />
          </label>
          <label htmlFor="checkout-cpf">
            CPF:
            { ' ' }
            <input
              id="checkout-cpf"
              data-testid="checkout-cpf"
              name="CPF"
              type="text"
              value={ CPF }
              onChange={ this.OnInputChange }
            />
          </label>
          <label htmlFor="checkout-phone">
            Phone Number:
            { ' ' }
            <input
              id="checkout-phone"
              data-testid="checkout-phone"
              name="phone"
              type="text"
              value={ phone }
              onChange={ this.OnInputChange }
            />
          </label>
          <label htmlFor="checkout-cep">
            CEP:
            { ' ' }
            <input
              id="checkout-cep"
              data-testid="checkout-cep"
              name="CEP"
              type="text"
              value={ CEP }
              onChange={ this.OnInputChange }
            />
          </label>
          <label htmlFor="checkout-address">
            Address:
            { ' ' }
            <input
              id="checkout-address"
              data-testid="checkout-address"
              name="address"
              type="text"
              value={ address }
              onChange={ this.OnInputChange }
            />
          </label>

          <label htmlFor="ticket-payment">
            <input
              id="ticket-payment"
              data-testid="ticket-payment"
              type="radio"
              name="paymentMethod"
              value="boleto"
              onChange={ this.OnInputChange }
            />
            Boleto
          </label>
          <label htmlFor="visa-payment">
            <input
              id="visa-payment"
              data-testid="visa-payment"
              type="radio"
              name="paymentMethod"
              value="visa"
              onChange={ this.OnInputChange }
            />
            Visa
          </label>
          <label htmlFor="master-payment">
            <input
              id="master-payment"
              data-testid="master-payment"
              type="radio"
              name="paymentMethod"
              value="masterCard"
              onChange={ this.OnInputChange }
            />
            MasterCard
          </label>
          <label htmlFor="elo-payment">
            <input
              id="elo-payment"
              data-testid="elo-payment"
              type="radio"
              name="paymentMethod"
              value="elo"
              onChange={ this.OnInputChange }
            />
            Elo
          </label>

          <button
            type="submit"
            data-testid="checkout-btn"
            disabled={ btnDisabled }
            onClick={ this.checkoutFinished }
          >
            Enviar
          </button>
        </form>
        { btnDisabled && <span data-testid="error-msg">Campos inválidos</span> }
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
