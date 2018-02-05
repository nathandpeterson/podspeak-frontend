import React, { Component } from 'react'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Homepage from './components/Homepage'
import Userpage from './components/Userpage'
import Login from './components/Login'
import Podcast from './components/Podcast'
import PlayerContainer from './components/PlayerContainer'
import Signup from './components/Signup'
import Dash from './components/Dash'
import requireAuth from './components/requireAuth'
import DiscoverPodcast from './components/DiscoverPodcast'
const API = `https://podspeak.herokuapp.com/graphql`

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
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

  render() {
    return ( <ApolloProvider client={ client } >      
                  <BrowserRouter>     
                  <div>
                    <Nav />
                    <div className="main-content">         
                      <Switch>                
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/signup' component={Signup}/>
                        <Route exact path='/:id' component={requireAuth(Userpage)}/>
                        <Route exact path='/:id/discover' component ={requireAuth(DiscoverPodcast)}/>
                        <Route exact path='/:id/dash' component={requireAuth(Dash)}/>
                        <Route exact path='/podcasts/:id' component={Podcast}/>
                        <Route exact path='/episodes/:id' component={PlayerContainer}/>
                        <Route path='/' component={Homepage}/>      
                      </Switch>
                      </div>
                    </div>
                  </BrowserRouter>
              </ApolloProvider>
    )
  }
}

export default App
