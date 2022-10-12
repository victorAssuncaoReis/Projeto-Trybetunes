import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({
      loading: true,
    });
    const favoritesList = await getFavoriteSongs();

    this.setState({
      favorites: favoritesList,
      loading: false,
    }, () => this.searchFavorites());
  };

  searchFavorites = () => {
    const { trackId } = this.props;
    const { favorites } = this.state;

    return favorites.some((favorite) => favorite.trackId === trackId);
  };

  saveFavorites = async ({ target }) => {
    const { name, checked } = target;
    const { music } = this.props;

    this.setState({
      loading: true,
      [name]: checked,
    });

    if (this.searchFavorites()) {
      await removeSong(music);
    } else {
      await addSong(music);
    }
    this.setState({
      loading: false,
    });
    this.getFavorites();
  };

  render() {
    const { trackId, previewUrl, trackName } = this.props;
    const {
      loading,
    } = this.state;

    return (
      !loading
        ? (
          <div className="album-music">
            <p>
              {trackName}
            </p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <br />
              <code>audio</code>
              .
            </audio>

            <label htmlFor="favorites">
              <input
                data-testid={ `checkbox-music-${trackId}` }
                name="favorites"
                id={ trackId }
                type="checkbox"
                checked={ this.searchFavorites() }
                onChange={ this.saveFavorites }
              />
              Favorita
            </label>
          </div>) : <Carregando />
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf(),
}.isRequired;

export default MusicCard;

// Requisito 09/10/11 e refatoramento do código feito com a ajuda de Gabriela Ventura
