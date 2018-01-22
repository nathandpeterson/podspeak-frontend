import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Card, CardTitle } from 'react-materialize'

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
        console.log(this.props)
        if(!this.props.data.podcasts) return <div />
        const { podcasts } = this.props.data
        console.log('PODVASTS',podcasts)
        return <div className="main-container"> wtf
            {podcasts.map(podcast => {
                return <div className="pod-card-container"> <Card key={podcast.id}
                header={<CardTitle reveal image={podcast.image_URL} waves='light'/>}
                title={podcast.title}
                reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
                <p><a href="#">More...</a></p>
                </Card>
                </div>
            })}
        </div>
    }
}

export default graphql(query)(Homepage)