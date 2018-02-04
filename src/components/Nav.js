import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import '../styles/NavStyle.css'

class Nav extends Component {

renderLoginButton = () => {
  return localStorage.getItem('token') ? this.logoutButton() : this.loginButton()
}
renderSignUp = () => {
  if(!localStorage.getItem('token')) {
    return this.signUpBtn()
  }
}

signUpBtn = () => {
  return <li><Link to='/signup'>sign up</Link></li>
}

loginButton = () => {
  return  <li><Link to='/login'>log in</Link></li>
}
logoutButton = () => {
  return <li onClick={this.logout}> log out</li>
}

myPodcastsButton = () => {
  let id = localStorage.getItem('data')
  return id ? <li> <Link to ={`/${id}`}> my podcasts </Link></li> : null
}

searchButton = () => {
  let id = localStorage.getItem('data')
  return id ? <li><Link to={`/${id}/discover`}>
    <i className="material-icons medium">search</i></Link></li> : null 
}

dashButton = () => {
  let id = localStorage.getItem('data')
  return id ? <li><Link to={`/${id}/dash`}>
    <i className="material-icons medium">account_circle</i></Link></li> : null 
}

logout = (e) => {
  localStorage.clear()
  this.forceUpdate()
  this.props.history.push('/')
}

  render(){
    return <nav className="nav-bar">
              <div className="blue nav-wrapper">
                  <a href="/" className="brand-logo center"><i className="material-icons">headset</i>podspeak</a> 
                              
                  <ul className="right hide-on-small-and-down">
                  {localStorage.getItem('data') && this.myPodcastsButton()}
                  {localStorage.getItem('data') && this.searchButton()}
                  {localStorage.getItem('data') && this.dashButton()}
                  {this.renderLoginButton()}
                  {this.renderSignUp()}
                  </ul>              
               <Menu width={ '30%'}>
                  {localStorage.getItem('data') && this.myPodcastsButton()}
                  {localStorage.getItem('data') && this.searchButton()}
                  {localStorage.getItem('data') && this.dashButton()} 
                  {this.renderLoginButton()}
                </Menu>
                </div>
              </nav>   
  }

}

export default withRouter(Nav)