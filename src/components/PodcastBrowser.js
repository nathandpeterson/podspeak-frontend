import React, { Component } from 'react'
import { Card, CardTitle, Button } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import Parser from 'html-react-parser'

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
                const { id, title, description, image_URL } = podcast
                return <div key={id} className="pod-card-container"> 
                            <Card       className="pod-card"
                                        header={<CardTitle 
                                        reveal 
                                        image={image_URL} 
                                        waves='light'/>}
                                        title={Parser(title)}
                                reveal={<p>{Parser(description)}</p>}>
                                <Button className="blue" id={`${id}`} 
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
