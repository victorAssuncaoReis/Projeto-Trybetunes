import React from 'react';
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
      </header>
    );
  }
}

export default Header;
