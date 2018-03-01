import gql from 'graphql-tag'

export default gql` query EpisodeTime ($id:ID!, $timestamp: String){
    timedReactions (id: $id, timestamp: $timestamp) {
      id
      content
      user_id
      episode_timestamp
      user {
        id
        first_name
        avatar
      }
    }
  }`
