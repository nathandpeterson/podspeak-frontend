import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PodcastQuery from '../queries/PodcastQuery'
import { Card, Button } from 'react-materialize'

class PodcastEpisodeBrowser extends Component {

    render(){
        if(!this.props.episodes) return null
        const { episodes } = this.props
        return <div>
        {episodes.map(episode =>{
            return <Card key={episode.id} className='blue-grey darken-1 episode-list' 
                        textClassName='white-text'>
                    <h5>{episode.title}</h5>
                    <p>{episode.pub_date.slice(0,16)}</p>
                    <p>{episode.description}</p>
                    <a href={`/episodes/${episode.id}`}>
                        <div className="center">
                            <Button>LISTEN</Button>
                        </div>
                    </a>
                    </Card>
                })
            }
    </div>
    }

}

export default graphql((PodcastQuery), {
    options: (props) => { return { variables: {id:  props.episodeId, page: props.page } } }
})(PodcastEpisodeBrowser)