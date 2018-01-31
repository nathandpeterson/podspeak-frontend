import gql from 'graphql-tag'

export default gql`     mutation Reaction($content:String!, $user_id:ID!, 
  $episode_id: ID!, $episode_timestamp: String!, $reaction_id: ID) {
    createReaction(content: $content, user_id: $user_id, 
    	episode_id: $episode_id, episode_timestamp:$episode_timestamp, reaction_id: $reaction_id){
      	id
  			episode_timestamp
    }
  }`