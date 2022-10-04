import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Header.css';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        {user ? (
          <span data-testid="header-user-name">
            { user.name }
          </span>) : <Carregando />}
        <div className="navDiv">
          <ul>
            <Link to="/search" data-testid="link-to-search">
              <li>Pesquisar</li>
            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              <li>Favoritos</li>
            </Link>
            <Link to="/profile" data-testid="link-to-profile">
              <li>Perfil</li>
            </Link>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
