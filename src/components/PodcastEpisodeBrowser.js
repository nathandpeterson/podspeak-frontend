import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PodcastQuery from '../queries/PodcastQuery'
import { Button, Card } from 'react-materialize'
import Parser from 'html-react-parser'
import { Link } from 'react-router-dom'
import PodcastSpinner from './PodcastSpinner'
import '../styles/EpisodeBrowseStyle.css'

const EpisodeCard = (props) => {
    console.log(props)
    const {id, title, pub_date, description} = props.episode
    return <Card key={id} className='blue episode-list' 
            textClassName='white-text'>
                <h5>{title}</h5>
                <p>{pub_date.slice(0,16)}</p>
                {Parser(description)}
                <Link to={`/episodes/${id}`}>
                    <div className="center"> 
                            <Button floating large className='green' waves='light' icon='play_arrow' />
                    </div>
                </Link>
         </Card>
}

class PodcastEpisodeBrowser extends Component {

    render(){
        if(!this.props.data.podcast) return <PodcastSpinner />
        const { episodes } = this.props.data.podcast
        return <div className="episode-container">
        {episodes.map(episode => <EpisodeCard episode={episode} /> )}
    </div>
    }

}

export default graphql((PodcastQuery), {
    options: (props) => { return { variables: {id:  props.episodeId, page: props.page } } }
})(PodcastEpisodeBrowser)