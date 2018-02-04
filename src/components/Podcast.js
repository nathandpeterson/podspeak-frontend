import React, { Component } from 'react'
import { Button, Card } from 'react-materialize'
import { graphql } from 'react-apollo'
import PodcastQuery from '../queries/PodcastWithoutEpisodesQuery'
import PodcastEpisodeBrowser from './PodcastEpisodeBrowser'
import Parser from 'html-react-parser'
import '../styles/Podcast.css'

class Podcast extends Component{
    constructor(){
        super()

        this.state = {page: 1 }
    }
    loadOlderEpisodes = () => {
        this.setState({page: this.state.page + 1})
    }
    loadNewerEpisodes = () => {
        this.setState({page: this.state.page - 1})
    }

    render(){
        if(!this.props.data.podcast) return <div/>
        const { id, title, description, image_URL } = this.props.data.podcast
        return  <div >
                    <Card style={{backgroundImage: `url(${image_URL})`, backgroundSize: 'contain', opacity: '.9'}} className="podcast-container"> 
                        <Card>
                            <div className="center">
                                <h4>{Parser(title)}</h4>
                            </div>
                            <div> {Parser(description)} </div>
                        </Card>
                            <PodcastEpisodeBrowser  episodeId={ id } 
                                                    page={ this.state.page } />
                            <div className="center">
                                <Button className="blue" onClick={this.loadOlderEpisodes}> OLDER </Button>
                                {this.state.page > 1 && <Button className="blue" 
                                                                onClick={this.loadNewerEpisodes}> NEWER</Button>}
                            </div>
                            <div className="center">
                                <div className="page-card"> {this.state.page} </div>
                            </div>
                        </Card>
                </div>
    }
}

export default graphql(PodcastQuery, {
     options: (props) => { return { variables: {id: props.match.params.id, page: 1 }, } }
})(Podcast)

