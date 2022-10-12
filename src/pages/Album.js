import React from 'react';
import Proptypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from '../components/Carregando';
/* import AlbumCard from '../components/AlbumCard'; */
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      album: [],
      musics: [],
    };
  }

  componentDidMount() {
    this.getAlbumSongs();
  }

  getAlbumSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const album = data[0];
    const musics = data.filter((_music, index) => index !== 0);
    /*     await console.log(id, data, album, musics); */
    this.setState(({
      album,
      musics,
      loading: false,
      // Feito com a ajuda de Josiel
    }));
  };

  render() {
    const { album, musics, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album" />
        {loading ? <Carregando />
          : (
            <div>
              <div>
                <p data-testid="artist-name">{album.artistName}</p>
                <p data-testid="album-name">{album.collectionName}</p>
              </div>
              {musics.map((music) => (<MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                music={ music }
              />))}
            </div>
          )}
      </>
    );
  }
}

Album.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.objectOf(Proptypes.string),
  }).isRequired,
};

export default Album;
