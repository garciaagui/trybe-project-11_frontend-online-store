import React, { Component } from 'react';
import './Reviews.css';
import PropTypes from 'prop-types';
import { addReview, readSavedComments } from '../services/localStorage';

export default class Reviews extends Component {
  state={
    email: '',
    star1: 'inactive',
    star2: 'inactive',
    star3: 'inactive',
    star4: 'inactive',
    star5: 'inactive',
    rating: 0,
    isSaveButtonDisabled: true,
    comments: '',
    savedComments: [],
  }

  componentDidMount = () => {
    this.renderFromLocalStorage();
  }

  renderFromLocalStorage = () => {
    const { productId } = this.props;
    const getComments = readSavedComments(productId);
    if (getComments !== null) {
      this.setState({
        savedComments: getComments,
      });
    }
  }

  manageStars = (stars) => {
    if (stars === 'one') {
      this.setState({ star1: 'active',
        star2: 'inactive',
        star3: 'inactive',
        star4: 'inactive',
        star5: 'inactive',
        rating: 1,
      });
    }
    if (stars === 'two') {
      this.setState({ star1: 'active',
        star2: 'active',
        star3: 'inactive',
        star4: 'inactive',
        star5: 'inactive',
        rating: 2 });
    }
    if (stars === 'three') {
      this.setState({ star1: 'active',
        star2: 'active',
        star3: 'active',
        star4: 'inactive',
        star5: 'inactive',
        rating: 3 });
    }
    if (stars === 'four') {
      this.setState({ star1: 'active',
        star2: 'active',
        star3: 'active',
        star4: 'active',
        star5: 'inactive',
        rating: 4 });
    }
    if (stars === 'five') {
      this.setState({ star1: 'active',
        star2: 'active',
        star3: 'active',
        star4: 'active',
        star5: 'active',
        rating: 5 });
    }
  }

  getComments = ({ target }) => {
    this.setState({ comments: target.value });
  }

  getEmail = ({ target }) => {
    this.setState({ email: target.value }, this.checkEmail);
  }

  checkEmail = () => {
    const { email } = this.state;
    if (email.length > 0 && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ isSaveButtonDisabled: false });
    } else { this.setState({ isSaveButtonDisabled: true }); }
  }
  // Regex extraido de https://www.w3resource.com/javascript/form/email-validation.php

  resetForm = () => {
    this.setState({
      rating: 0,
      isSaveButtonDisabled: true,
      comments: '',
      email: '',
      star1: 'inactive',
      star2: 'inactive',
      star3: 'inactive',
      star4: 'inactive',
      star5: 'inactive',
    });
  }

  saveReview = () => {
    const { rating, comments, email } = this.state;
    const { productId } = this.props;
    const review = {
      emailInp: email,
      ratingInp: rating,
      commentsInp: comments,
    };
    addReview(productId, review);
    this.resetForm();
    this.renderFromLocalStorage();
  }

  render() {
    const { star1, star2, star3, star4, star5, email, comments,
      isSaveButtonDisabled, savedComments } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              data-testid="product-detail-email"
              type="email"
              value={ email }
              id="email"
              onChange={ this.getEmail }
            />
          </label>
          <div>
            <button
              type="button"
              className={ star1 }
              data-testid="1-rating"
              onClick={ () => this.manageStars('one') }
            >
              &#9733;
            </button>
            <button
              type="button"
              className={ star2 }
              data-testid="2-rating"
              onClick={ () => this.manageStars('two') }
            >
              &#9733;
            </button>
            <button
              type="button"
              className={ star3 }
              data-testid="3-rating"
              onClick={ () => this.manageStars('three') }
            >
              &#9733;
            </button>
            <button
              type="button"
              className={ star4 }
              data-testid="4-rating"
              onClick={ () => this.manageStars('four') }
            >
              &#9733;
            </button>
            <button
              type="button"
              className={ star5 }
              data-testid="5-rating"
              onClick={ () => this.manageStars('five') }
            >
              &#9733;
            </button>

          </div>
          <label htmlFor="comment">
            <textarea
              name="comment"
              id="comment"
              cols="30"
              rows="10"
              placeholder="Digite seu Comentário"
              data-testid="product-detail-evaluation"
              onChange={ this.getComments }
              value={ comments }
            />
          </label>
          <br />
          <button
            type="button"
            data-testid="submit-review-btn"
            disabled={ isSaveButtonDisabled }
            onClick={ this.saveReview }
          >
            Enviar
          </button>
        </form>
        <section>
          { savedComments.length === 0
            ? <span>Seja o primeiro a comentar</span>
            : savedComments.map((element) => (
              <div key={ element.key }>
                <h5 data-testid="review-card-email">{`Usuário: ${element.emailInp}`}</h5>
                <p data-testid="review-card-rating">{`Nota: ${element.ratingInp}`}</p>
                <p data-testid="review-card-evaluation">{ element.commentsInp }</p>
              </div>
            ))}
        </section>
      </div>
    );
  }
}

Reviews.propTypes = {
  productId: PropTypes.string.isRequired,
};
