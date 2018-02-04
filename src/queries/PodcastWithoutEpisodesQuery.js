import gql from 'graphql-tag'

export default gql`query PodcastWithoutEpisodes($id: ID!, $page: Int!){
    podcast(id:$id, page:$page){
      id
      title
      description
      rss_feed
      image_URL
      website
    }
  }
`
