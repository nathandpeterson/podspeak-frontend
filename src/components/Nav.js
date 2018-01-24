import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'
import { withRouter , Link } from 'react-router-dom'
import { compose, withApollo } from 'react-apollo'
import jwtDecode from 'jwt-decode'
import { Button } from 'react-materialize'
import gql from 'graphql-tag'
import LoginMutation from '../queries/LoginMutation'
import { graphql } from 'react-apollo'

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
    decodeToken ? this.setState({login: true}) : this.setState({login: false})
  }
  checkForToken(){
    if(!localStorage.getItem('token')) return null
    const token = localStorage.getItem('token').slice(8)
    const decoded = jwtDecode(token)
    return decoded
  }
  testCacheMethod = () => {
    // const { client } = this.props
    // client.readFragment({id: 1, fragment: gql` user{ first_name}`
    //  }).then(res => console.log(res))
  }

    render () {
    
        return (
          <div>
            <Navbar className="light-blue lighten-2" right brand="podspeak">
                {this.renderNavButtons()}
            </Navbar>
            <Button onClick={this.testCacheMethod} floating large className='red' waves='light' icon='add' />
            </div>
        )
    }
}

export default graphql(LoginMutation)(
  compose(withApollo, withRouter)(Nav)
) 