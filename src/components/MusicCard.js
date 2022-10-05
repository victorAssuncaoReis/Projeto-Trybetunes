import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
    };
  }

  saveFavorites = async ({ target }) => {
    const { tracks } = this.props;
    const { favorites } = this.state;
    this.setState({
      loading: true,
      favorites: [...favorites, target.value],
    });
    await addSong(tracks);
    this.setState({
      loading: false,
    });
  };

  render() {
    const { trackId, trackName, previewUrl } = this.props;
    const { loading, favorites } = this.state;
    return (
      <div data-testid="page-MusicCard">
        {!loading
          ? (
            <div>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>

              <label htmlFor="favorite">
                Favorita
                <input
                  type="checkbox"
                  id="favorite"
                  data-testid={ `checkbox-music-${trackId}` }
                  value={ trackId }
                  checked={ favorites.some((favorite) => Number(favorite) === trackId) }
                  onChange={ this.saveFavorites }
                />
              </label>
            </div>) : <Carregando />}
      </div>
    );
  }
}

MusicCard.propTypes = ({
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}).isRequired;

export default MusicCard;
