import React, { Component } from 'react'
import Nav from './components/Nav'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Homepage from './components/Homepage'
import Userpage from './components/Userpage'
import Login from './components/Login'
import Podcast from './components/Podcast'
import Signup from './components/Signup'
import { Button } from 'react-materialize'
import ErrorMessage from './components/ErrorMessage';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return !token ? null : {
    headers: {
      ...headers,
      authorization: `${token}`,
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

class App extends Component {
  constructor(){
    super()
    this.state = {login: false}
  }

  toggleLoginState = () => {
    this.setState({login: !this.state.login})
  }

  render() {
    return ( <ApolloProvider client={ client } >
                <div>
                  <BrowserRouter>
                  <div>
                    <Nav login={this.state.login}/>
                    <Switch>
                      <Route exact path='/login' 
                            component={()=> <Login updateNav={()=> this.updateNav} />}/>
                      <Route exact path='/signup' component={Signup}/>
                      <Route exact path='/:id' component={Userpage}/>
                      <Route exact path='/podcast/:id' component={Podcast}/>
                      <Route path='/' component={Homepage}/>
                    </Switch>
                    </div>
                  </BrowserRouter>
                </div>
              </ApolloProvider>
    )
  }
}

export default App
