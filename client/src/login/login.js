class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: ''
    };
    this.updateUser = this.updateUser.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  updateUser(e) {
    this.setState({user: e.target.value});
  }

  updatePassword(e) {
    this.setState({password: e.target.value});
  }

  login(e) {
    e.preventDefault();
    Auth.login(this.state.user, this.state.password)
      .catch(function(err) {
          console.log("Error logging in", err);
      });
  }

  render() {
     return (
       <form className="pure-form" method="post" action="/login">
         <fieldset>
           <legend className="legend">Manage your teams...</legend>
           <input value= {this.state.user} onChange= {this.updateUser} type="text"  placeholder="Username" />
           <input value= {this.state.password} onChange= {this.updatePassword} type="password" placeholder="Password" />
           <div className="remb">
               <input type="checkbox" /> Remember me
           </div>
           <div className="login"><button type="submit" onClick={this.login.bind(this)} className="pure-button pure-button-primary">Sign in</button></div>
           <div className="register"><a type="submit" className="pure-button pure-button-primary" href="register.html">Register</a></div>
         </fieldset>
       </form>
     );
  }
}

ReactDOM.render(<Login />, document.getElementById('login'));
