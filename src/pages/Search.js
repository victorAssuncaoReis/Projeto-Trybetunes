import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { artist } = this.state;
    const dois = 2;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <label htmlFor="artist">
            <input
              id="artist"
              name="artist"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
              value={ artist }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artist.length < dois }
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}

export default Search;
