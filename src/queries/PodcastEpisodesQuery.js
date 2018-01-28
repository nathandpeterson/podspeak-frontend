import gql from 'graphql-tag'

export default gql`query PodcastQuery($id: ID!, $page: Int!){
    podcast(id:$id, page:$page){
      id
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


