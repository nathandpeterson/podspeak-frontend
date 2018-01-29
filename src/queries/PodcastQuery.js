import gql from 'graphql-tag'

export default gql`query PodcastQuery($id: ID!, $page: Int!){
    podcast(id:$id, page:$page){
      id
      title
      description
      rss_feed
      image_URL
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
