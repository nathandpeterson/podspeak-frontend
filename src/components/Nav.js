import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'
import { withRouter , Link } from 'react-router-dom'
import { compose, withApollo } from 'react-apollo'
import jwtDecode from 'jwt-decode'

class Nav extends Component {
    constructor(){
        super()
        this.state = {login: false, avatar: '', firstName: ''}
    }

    renderNavButtons(){
      if(this.state.login){
        return <NavItem onClick={this.logout}> log out </NavItem>
      } else {
        return (<Link to={'/login'}> 
                log in 
                </Link>)
      }
    }

  logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    this.setState({login: false})
    this.props.history.push('/')
  }
  componentDidMount(){
    const decodeToken = this.checkForToken()
    decodeToken ? this.setState({login: true}) : null
  }
  checkForToken(){
    if(!localStorage.getItem('token')) return null
    const token = localStorage.getItem('token').slice(8)
    token ? this.setState({login: true}) : this.setState({login: false})
    const decoded = jwtDecode(token)
    return decoded
  }

    render () {
      
        return (
            <Navbar className="light-blue lighten-2" right brand="podspeak">
                {this.renderNavButtons()}
            </Navbar>
        )
    }
}

export default compose(withApollo, withRouter)(Nav)