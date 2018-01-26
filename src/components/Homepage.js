import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Card, CardTitle, Button } from 'react-materialize'
import Nav from './Nav'
import PodcastBrowser from './PodcastBrowser'

const query = gql`
query{
    podcasts{
        id
        title
        description
        rss_feed
        latest_pub_date
        image_URL
        website
    }
}`

class Homepage extends Component {

   
    
    render(){
        if(!this.props.data.podcasts) return <div />
        const { podcasts } = this.props.data
        return  <div>
            <PodcastBrowser podcasts={podcasts}/>
        </div>
    }
}

export default graphql(query)(Homepage)