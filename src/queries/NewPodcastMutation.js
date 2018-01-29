import gql from 'graphql-tag'

export default gql`mutation 
                    Subscribe(  $title: String!, 
                                $description: String!, 
                                $rss_feed: String!, 
                                $image_URL: String!,
                                $user_id: ID!){
                                    newSubscription(title: $title,
                                    description: $description,
                                    rss_feed:$rss_feed,
                                    image_URL: $image_URL,
                                    user_id: $user_id) {
                                                            id
                                                         }
                                                 }`