import ReactMixin from 'react-mixin';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password : ''
    };
  }

  register(e) {
    e.preventDefault();
    Auth.register(this.state.user, this.state.password1, this.state.password2)
  }

  render() {
    return (
      <form className="pure-form" method="post" action="/register" />
        <fieldset>
          <div className="pure-control-group">
            <input id="name" type="text" valueLink={this.linkState('user')}placeholder="Username" />
          </div>

          <div className="pure-control-group">
            <input id="name" type="password" valueLink={this.linkState('password')}placeholde="Password" />
          </div>

          <div className="pure-control-group">
            <input id="password" type="password" valueLink={this.linkState('password')}placeholder="Password again" />
          </div>
          <div className="pure-controls">
            <input id="cb" type="checkbox" /> I''ve read the terms and conditions
            <div className="ok"><button type="submit" onClick={this.login.bind(this)} className="pure-button pure-button-primary">Submit</button></div>
            <div className="back"><a type="submit" className="pure-button pure-button-primary" href="login.html">Back to login</a></div>
          </div>
        </fieldset>
      </form>
    );
  }
}
