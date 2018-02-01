import gql from 'graphql-tag'

export default gql`mutation EpisodeQuery($id: ID!, $timestamp: String){
                    episode(id:$id, timestamp: $timestamp){
                    id
                    title
                    description
                    audio_URL
                    description
                            reactions{
                                        id
                                        user_id
                                        episode_timestamp
                                        content
                                        userInfo
                        }
                    }
                }`