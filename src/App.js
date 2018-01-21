import React, { Component } from 'react'
import Nav from './components/Nav'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Homepage from './components/Homepage'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('accessToken')
  console.log('authlink..................', token)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
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
                <div>
                <Nav />
                <Homepage />
                </div>
              </ApolloProvider>
    )
  }
}

export default App
