import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { artistName, artworkUrl100, collectionName, collectionId } = this.props;
    return (
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <div>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <p data-testid="album-name">{collectionName}</p>
          <p data-testid="artist-name">{artistName}</p>
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = ({
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
  collectionId: PropTypes.string,
}).isRequired;

export default AlbumCard;
