import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PodcastQuery from '../queries/PodcastQuery'
import { Card, Icon } from 'react-materialize'
import Parser from 'html-react-parser'
import { Link } from 'react-router-dom'

class PodcastEpisodeBrowser extends Component {

    render(){
        if(!this.props.episodes) return null
        const { episodes } = this.props
        return <div className="episode-container">
        {episodes.map(episode =>{
            return <Card key={episode.id} className=' blue episode-list' 
                        textClassName='white-text'>
                    <h5>{episode.title}</h5>
                    <p>{episode.pub_date.slice(0,16)}</p>
                    {Parser(episode.description)}
                    <Link to={`/episodes/${episode.id}`}>
                        <div className="center">
                            <div style={{marginTop: '5%'}} className="player-btn">
                                <Icon large>play_arrow</Icon>
                            </div>
                        </div>
                    </Link>
                    </Card>
                })
            }
    </div>
    }

}

export default graphql((PodcastQuery), {
    options: (props) => { return { variables: {id:  props.episodeId, page: props.page } } }
})(PodcastEpisodeBrowser)