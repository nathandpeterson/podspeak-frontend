import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'
import Auth0Lock from 'auth0-lock'


class Nav extends Component {
    constructor(){
        super()
        this.state = {}
    }

    static defaultProps = {
          clientId: 'hXQR6COgtLrGmaV5NUJJdwufjZpmxQC5',
          domain: 'natperson.auth0.com'
        }

    componentDidMount(){
        this.lock = new Auth0Lock(this.props.clientId, this.props.domain)
        this.lock.on('authenticated', (authResult)=>{
            this.lock.getUserInfo(authResult.accessToken, (error, profile)=>{
                if(error) {
                  console.log(error)
                  return
                }
            this.setData(authResult.accessToken, profile)
         })
        })
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
        console.log(this.state)
      })
    }
  }

  logout(){
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
        return (
            <Navbar right brand="podspeak">
                <NavItem onClick={this.loginClick}>log in</NavItem>
            </Navbar>
        )
    }
}

export default Nav