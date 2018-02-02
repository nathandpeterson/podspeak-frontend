import gql from 'graphql-tag'

export default gql` mutation NewUserPod($id: ID!, $podcast_id: ID!){
    newUserPod(id: $id, podcast_id: $podcast_id){
      id
    }
  }`