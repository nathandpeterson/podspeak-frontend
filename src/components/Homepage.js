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
        if(!this.props.data.podcasts) return <div />
        const { podcasts } = this.props.data
        return <div className="main-container">
            {podcasts.map(podcast => {
                return <div key={podcast.id} className="pod-card-container"> 
                            <Card 
                                    className="pod-card"
                                    header={<CardTitle 
                                    reveal 
                                    image={podcast.image_URL} 
                                    waves='light'/>}
                title={podcast.title}
                reveal={<p>{podcast.description}</p>}>
                <p>>More...</p>
                </Card>
                </div>
            })}
        </div>
    }
}

export default graphql(query)(Homepage)