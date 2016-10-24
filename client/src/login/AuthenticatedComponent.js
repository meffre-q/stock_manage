import React from 'react';

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {

    static willTransitionTo(transition) {
      if (!LoginStore.isLogged()) {
        transition.redirect('/login');
      }
    }

    constructor(props) {
      super(props)
      this.state = this._getLoginState();
    }

    _getLoginState() {
      return {
        userLoggedIn: LoginStore.isLoggedIn(),
        user: LoginStore.user,
        jst: LoginStore.jwt
      };
    }

    componentDidMount() {
      LoginStore.addChangeListener(this._onChange.bind(this));
    }

    _onChange() {
      this.setState(this._getLoginState);
    }

    componentWillUnmount() {
      LoginStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {
      return (
        <ComposedComponent
          {...this.props
            }
          user = {
            this.state.user
          }
          jwt = {
            this.state.jwt
          }
          userLoggedIn = {
            this.state.userLoggedIn
          }
        />
      );
    }
  }
};
