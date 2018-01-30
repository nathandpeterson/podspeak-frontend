import gql from 'graphql-tag'

export default gql`
mutation NewPod($query: String!, $genre: String!){
    newPod(query: $query, genre: $genre) {
     results{
        title
        description
        rss_feed
        image_URL
            }
        }
    }`