import React, { Component } from 'react'
import { Button } from 'react-materialize'
import { withRouter } from 'react-router-dom'
// import UserQuery from '../queries/UserQuery'
// import { graphql, withApollo, compose } from 'react-apollo'

class Nav extends Component {

  constructor(){
    super()
    this.state = {login: 'false'}
  }

handleLogin = (e) => {
  e.preventDefault()
  this.setState({login: true})
  }
renderLoginButton = () => {
  return localStorage.getItem('token') ? this.logoutButton() : this.loginButton()
}
loginButton = () => {
  return  <li><a href='/login'>log in</a></li>
}
logoutButton = () => {
  return <Button onClick={this.logout}> log out</Button>
}
logout = (e) => {
  localStorage.clear()
  this.forceUpdate()
  this.props.history.push('/')
}

  render(){
    return <nav>
              <div className="blue nav-wrapper">
              <a href="/" className="brand-logo center"><i className="material-icons">headset</i>podspeak</a>              
      
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {/* <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">JavaScript</a></li> */}
                {this.renderLoginButton()}
              </ul>
      
              </div>
              </nav>   
  }

}

export default withRouter(Nav)