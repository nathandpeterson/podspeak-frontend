import React, { Component } from 'react'
import Auth0Lock from 'auth0-lock'
import { setContext } from 'apollo-link-context';


class AuthService extends Component {

    // static defaultProps = {
    //     clientId: 'hXQR6COgtLrGmaV5NUJJdwufjZpmxQC5',
    //     domain: 'natperson.auth0.com'
    //   }
      static check(){
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
        this.getData()
      }

      getData(){
        if(localStorage.getItem('accessToken') != null){
          this.setState({
            accessToken: localStorage.getItem('accessToken'),
            profile: JSON.parse(localStorage.getItem('profile'))
          }, ()=>{
            console.log(this.state)
          })
        }
      }

      static authLink(){
        setContext((_, { headers }) => {
            // get the authentication token from local storage if it exists
            const token = localStorage.getItem('token')
            // return the headers to the context so httpLink can read them
            return {
              headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : null,
              }
            }
          })
      }
      render() {
          return <div></div>
      }
}

export default AuthService
  