import React, { Component } from 'react'
import { Navbar, NavItem, Icon, Button } from 'react-materialize'
import { Link, withRouter } from 'react-router-dom'
import UserQuery from '../queries/UserQuery'
import { graphql, withApollo, compose } from 'react-apollo'


class Nav extends Component {
  componentWillReceiveProps(nextProps){
    console.log('LIFECYCLE', nextProps)
    // check for token and render user-specific content if logged in
  }
handleLogin = (e) => {
  e.preventDefault()
  this.props.history.push('/login')
}

  render(){
    console.log('RENDER NAV', this.props)
    if(this.props.data.loading) return <div></div>
    const { first_name, avatar } = this.props.data.user
    return <div>
              <Navbar className="teal" right > 
                  <Link to="/" className="brand-logo center" >  <Icon>headset</Icon>podspeak</Link>
                  <NavItem>{first_name}{avatar}</NavItem>
                  <Button onClick={this.handleLogin}> log in </Button> 
              </Navbar>
              </div>   }
}

 

export default graphql(UserQuery, {
  options: (props) => { return { variables: {id: 1 } } }
})(compose(withApollo, withRouter)(Nav)) 