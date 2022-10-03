import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  userValidation = async () => {
    const { history } = this.props;
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    history.push('/search');
  };

  render() {
    const { name, loading } = this.state;
    const loginLength = 3;
    return (
      <div>
        { loading
          ? <Carregando />
          : (
            <div data-testid="page-login">
              <label htmlFor="loginName">
                <input
                  id="name"
                  name="name"
                  data-testid="login-name-input"
                  minLength="3"
                  required
                  onChange={ this.handleChange }
                  value={ name }
                />
              </label>
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ name.length < loginLength }
                onClick={ this.userValidation }
              >
                Entrar
              </button>
            </div>
          )}
      </div>
    );
  }
}

Login.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}).isRequired;

export default Login;
