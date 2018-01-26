import React, { Component } from 'react'
import { Card, CardTitle, Button } from 'react-materialize'
import { withRouter } from 'react-router-dom'

class PodcastBrowser extends Component {
    
    episodeButtonHandler = (e) => {
        e.preventDefault()
        this.props.history.push(`/podcasts/${e.target.id}`)
    }

    render(){
        if(!this.props.podcasts) return <div />
        const { podcasts } = this.props
        return  <div>
        <div className="main-container">
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
                                        onClick={this.episodeButtonHandler}>
                                    EPISODES
                                </Button>
                            </Card>
                </div>
            })}
        </div>
        </div>
    }
}

export default withRouter(PodcastBrowser)
