import React, { Component } from 'react'
import { Navbar, NavItem, Icon, Button } from 'react-materialize'
import { Link, withRouter } from 'react-router-dom'
// import UserQuery from '../queries/UserQuery'
// import { graphql, withApollo, compose } from 'react-apollo'

class Nav extends Component {

  constructor(){
    super()
    this.state = {login: 'false'}
  }

componentWillReceiveProps(nextProps){
    // console.log('LIFECYCLE', nextProps)
    // check for token and render user-specific content if logged in
  }
handleLogin = (e) => {
  e.preventDefault()
  console.log(this.props)
  this.setState({login: true})
  }
renderLoginButton = () => {
  return localStorage.getItem('token') ? this.logoutButton() : this.loginButton()
}
loginButton = () => {
  return <Link to="/login">
      <Button> log in </Button>
    </Link>
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
    console.log(this.props)
    return <div>
              <Navbar className="teal" right > 
                  <Link to="/" className="brand-logo center" >  
                    <Icon>headset</Icon>podspeak
                  </Link>
                  {this.renderLoginButton()}
              </Navbar>
              </div>   
  }

}

export default withRouter(Nav)