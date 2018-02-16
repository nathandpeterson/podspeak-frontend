import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PodcastCard from './PodcastCard/PodcastCard'
import './Podcast.css'

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
            {podcasts.map((podcast, i) => {
               return  <PodcastCard key={i}
                                    episodeButtonHandler={ this.episodeButtonHandler}
                                    podcast ={ podcast }
                                    // Incude the episodeButton attribute to include the episode button, falsey for no btn
                                    episodeButton={true} />
            })}
        </div>
        </div>
    }
}

export default withRouter(PodcastBrowser)
