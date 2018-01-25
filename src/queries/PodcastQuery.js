import gql from 'graphql-tag'

export default gql`query PodcastQuery($id: ID!){
    podcast(id:$id){
      id
      title
      description
      rss_feed
      image_URL
      latest_pub_date
      website
      episodes{
        id
        title
        pub_date
        duration
        description
      }
    }
  }
`