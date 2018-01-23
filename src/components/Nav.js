import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'
import { withRouter , Link } from 'react-router-dom'


class Nav extends Component {
    constructor(){
        super()
    }

    renderNavButtons(){
      if(this.props.login){
        return <NavItem onClick={this.logout}> log out </NavItem>
      } else {
        return (<Link to={'/login'}> 
                log in 
                </Link>)
      }
    }

  logout = (e) => {
    e.preventDefault()
    this.setState({
      token: ''
    }, () => {
      localStorage.removeItem('token')
    })
  }

  loginClick = (e) => {
        e.preventDefault()
    }

    render () {
      console.log('nav props',this.props)
        return (
            <Navbar className="light-blue lighten-2" right brand="podspeak">
                {this.renderNavButtons(this.props.login)}
            </Navbar>
        )
    }
}

export default withRouter(Nav)