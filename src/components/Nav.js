import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'
import Auth0Lock from 'auth0-lock'


class Nav extends Component {
    constructor(){
        super()
        this.state = {}
    }

    renderNavButtons(){
      console.log('render navButtons state.accessToken', this.state.accessToken)
      if(this.state.accessToken){
        return <NavItem onClick={this.logout}> log out </NavItem>
      } else {
        return <NavItem onClick={this.loginClick}> log in </NavItem>
      }
    }

    componentDidMount(){
        this.lock = new Auth0Lock('hXQR6COgtLrGmaV5NUJJdwufjZpmxQC5', 'natperson.auth0.com')
        this.lock.on('authenticated', (authResult)=>{
          this.lock.getUserInfo(authResult.accessToken, (error, profile)=>{
              if(error) {
                console.log(error)
                return
              }
          this.setData(authResult.accessToken, profile)
       })
      })
      console.log('fired')
      this.getData()
        this.getData()
    }

  setData = (accessToken, profile) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('profile', JSON.stringify(profile))
    this.setState({
      accessToken: localStorage.getItem('accessToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    })
  }

  getData = () => {
    if(localStorage.getItem('accessToken') != null){
      this.setState({
        accessToken: localStorage.getItem('accessToken'),
        profile: JSON.parse(localStorage.getItem('profile'))
      }, ()=>{
        console.log('GETDATA',this.state)
      })
    }
  }

  logout = (e) => {
    e.preventDefault()
    this.setState({
      accessToken: '',
      profile: ''
    }, () => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('profile')
    })
  }

    loginClick = (e) => {
        e.preventDefault()
        this.lock.show()
    }

    render () {
      console.log('NAVRENDER',this.state)
        return (
            <Navbar className="light-blue lighten-2" right brand="podspeak">
                {this.renderNavButtons()}
            </Navbar>
        )
    }
}

export default Nav