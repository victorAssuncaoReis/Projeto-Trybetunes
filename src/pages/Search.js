import React from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import MusicCards from '../components/MusicCards';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      loading: false,
      artistName: '',
      albums: [],
      didFind: false,
      noResult: false,
    };
  }

  handleSearch = async () => {
    const { artist } = this.state;
    this.setState(({ loading: true }));
    const data = await searchAlbumsAPI(artist);
    if (data.length <= 0) {
      this.setState(({ noResult: true }));
    }
    this.setState(({ loading: false }));
    this.setState(
      ({ albums: data, artistName: artist }),
      () => this.setState(({ artist: '', didFind: true })),
    );
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { artist, loading, didFind,
      albums, artistName, noResult } = this.state;
    const dois = 2;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Carregando /> : (
          <div>
            <input
              data-testid="search-artist-input"
              name="artist"
              id="artist"
              value={ artist }
              onChange={ this.handleChange }
            />

            <button
              disabled={ artist.length < dois }
              type="button"
              data-testid="search-artist-button"
              onClick={ this.handleSearch }
            >
              Pesquisar
            </button>
          </div>
        ) }
        {didFind
        && (
          <p>
            Resultado de álbuns de:
            {' '}
            {artistName}
          </p>
        )}
        {noResult ? <p>Nenhum álbum foi encontrado</p>
          : albums.map((album) => (
            <MusicCards
              key={ album.collectionId }
              artistName={ album.artistName }
              artworkUrl100={ album.artworkUrl100 }
              collectionName={ album.collectionName }
              collectionId={ album.collectionId }
            />))}
      </div>
    );
  }
}

export default Search;
