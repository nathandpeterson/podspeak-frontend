import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Card, CardTitle, Button } from 'react-materialize'

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

    episodeButtonHandler = (e) => {
        e.preventDefault()
        console.log(e.target)
        this.props.history.push(`/podcasts/${e.target.id}`)
    }
    
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
                                <Button id={`${podcast.id}`} 
                                        onClick={this.episodeButtonHandler}
                                >EPISODES</Button>
                            </Card>
                </div>
            })}
        </div>
    }
}

export default graphql(query)(Homepage)