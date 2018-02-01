import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

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
  return  <li><Link to='/login'>log in</Link></li>
}
logoutButton = () => {
  return <li onClick={this.logout}> log out</li>
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
                {this.renderLoginButton()}
              </ul>
      
              </div>
              </nav>   
  }

}

export default withRouter(Nav)