import gql from 'graphql-tag'

export default gql` query GetUser($id: ID!){
    user(id: $id){
      first_name
      last_name
      avatar
      token
      error
      podcasts{
          id
          title
      }
    }
  }
`