import React, { Component } from 'react'
import Nav from './components/Nav'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql'} ),
  cache: new InMemoryCache()
})

class App extends Component {
  render() {
    return ( <ApolloProvider client={ client } >
        <Nav />
      </ApolloProvider>
    )
  }
}

export default App
