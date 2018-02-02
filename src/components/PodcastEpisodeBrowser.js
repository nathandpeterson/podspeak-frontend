import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PodcastQuery from '../queries/PodcastQuery'
import { Button, Card } from 'react-materialize'
import Parser from 'html-react-parser'
import { Link } from 'react-router-dom'
import '../styles/EpisodeBrowseStyle.css'

class PodcastEpisodeBrowser extends Component {

    componentWillReceiveProps(nextProps){
        nextProps.data.refetch()
    }

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
                                <Button floating large className='green' waves='light' icon='play_arrow' />
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