import React, { Component } from 'react'
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
import EpisodeContainer from './components/EpisodeContainer'
import Signup from './components/Signup'
import authService from './components/authService'

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
                    <Switch>
                      <Route exact path='/login' component={Login}/>
                      <Route exact path='/signup' component={Signup}/>
                      <Route exact path='/:id' component={authService(Userpage)}/>
                      <Route exact path='/podcasts/:id' component={Podcast}/>
                      <Route exact path='/episodes/:id' component={EpisodeContainer}/>
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
