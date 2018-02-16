import gql from 'graphql-tag'

export default gql`mutation DeletePod($user_id: ID!, $podcast_id: ID!){
    deleteUserPodcast(user_id: $user_id, podcast_id:$podcast_id){
      id
    }
  }`