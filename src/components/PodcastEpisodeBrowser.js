import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PodcastQuery from '../queries/PodcastQuery'
import { Button, Card } from 'react-materialize'
import Parser from 'html-react-parser'
import { Link } from 'react-router-dom'
import PodcastSpinner from './PodcastSpinner'
import '../styles/EpisodeBrowseStyle.css'

class PodcastEpisodeBrowser extends Component {

    // componentWillReceiveProps(nextProps){
    //     nextProps.data.refetch()
    // }

    render(){
        console.log('in the browser', this.props)
        if(!this.props.data.podcast) return <PodcastSpinner />
    
        const { episodes } = this.props.data.podcast
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