import gql from 'graphql-tag'

export default gql`     mutation Reaction($content:String!, $user_id:ID!, 
  $episode_id: ID!, $episode_timestamp: String! ) {
    createReaction(content: $content, user_id: $user_id, 
    	episode_id: $episode_id, episode_timestamp:$episode_timestamp){
      	id
  			episode_timestamp
    }
  }`