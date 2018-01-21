import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
query{
    users{
        id
        first_name
    }
}`

class Homepage extends Component {

    render(){
        console.log(this.props)
        return <div> test </div>
    }
}

export default graphql(query)(Homepage)