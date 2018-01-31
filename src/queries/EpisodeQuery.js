import gql from 'graphql-tag'

export default gql`query EpisodeQuery($id: ID!){
                    episode(id:$id){
                    id
                    title
                    description
                    audio_URL
                    description
                            reactions{
                        id
                        user_id
                        reaction_id
                        episode_timestamp
                        category
                        content
                        userInfo
                    }
                    }
                }`