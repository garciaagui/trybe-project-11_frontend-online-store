import React, { Component } from 'react';
import './Reviews.css';

export default class Reviews extends Component {
  state={
    star1: 'inactive',
    star2: 'inactive',
    star3: 'inactive',
    star4: 'inactive',
    star5: 'inactive',
    rating: 0,
    isSaveButtonDisabled: true,
    comments: '',
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

  render() {
    const { star1, star2, star3, star4,
      star5, rating, isSaveButtonDisabled, comments, email } = this.state;
    console.log(comments);
    console.log(rating);
    console.log(email);

    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="email"
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
          />
        </label>
        <br />
        <button
          type="button"
          data-testid="submit-review-btn"
          disabled={ isSaveButtonDisabled }
        >
          Enviar
        </button>
      </form>
    );
  }
}
