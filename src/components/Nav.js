import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'
import { withRouter , Link } from 'react-router-dom'


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
        return (<Link to={'/login'}> 
                <NavItem> 
                log in </NavItem> 
                </Link>)
      }
    }

    componentDidMount(){
       
    }


  // setData = (accessToken, profile) => {
  //   localStorage.setItem('accessToken', accessToken)
  //   localStorage.setItem('profile', JSON.stringify(profile))
  //   this.setState({
  //     accessToken: localStorage.getItem('accessToken'),
  //     profile: JSON.parse(localStorage.getItem('profile'))
  //   })
  // }

  // getData = () => {
  //   if(localStorage.getItem('accessToken') != null){
  //     this.setState({
  //       accessToken: localStorage.getItem('accessToken'),
  //       profile: JSON.parse(localStorage.getItem('profile'))
  //     }, ()=>{
  //       console.log('GETDATA',this.state)
  //     })
  //   }
  // }

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
    }

    render () {
      console.log('NAV',this.props)
        return (
            <Navbar className="light-blue lighten-2" right brand="podspeak">
                {this.renderNavButtons()}
            </Navbar>
        )
    }
}

export default withRouter(Nav)