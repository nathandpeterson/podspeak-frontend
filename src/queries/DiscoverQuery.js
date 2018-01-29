import gql from 'graphql-tag'

export default gql`
mutation NewPod($query: String!){
    newPod(query: $query) {
     results{
        title
        description
        rss_feed
        image_URL
            }
        }
    }`