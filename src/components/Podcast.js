import React, { Component } from 'react'
import { Button, Badge, Card, Row, Col, } from 'react-materialize'
import { graphql } from 'react-apollo'
import PodcastQuery from '../queries/PodcastQuery'
import PodcastEpisodeBrowser from './PodcastEpisodeBrowser'
import Parser from 'html-react-parser'


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
        const { id,
                title, 
                description, 
                image_URL, 
                episodes } = this.props.data.podcast
        return  <div >
                <Row>
                    <Col s={1}></Col>
                    <Col s={10}>
                        <Card style={{backgroundImage: `url(${image_URL})`, backgroundSize: 'contain'}} className="podcast-container"> 
                            <Card>
                                <div className="center">
                                    <h4>{Parser(title)}</h4>
                                </div>
                                {Parser(description)}
                            </Card>
                                <PodcastEpisodeBrowser  episodeId={ id } 
                                                        page={ this.state.page }
                                                        episodes={ episodes } />
                                <Button onClick={this.loadOlderEpisodes}> OLDER </Button>
                                {this.state.page > 1 && <Button on onClick={this.loadNewerEpisodes}> NEWER</Button>}
                                <Badge> {this.state.page} </Badge>
                        </Card>
                    </Col>
                    <Col s={1}></Col>
                </Row>

                </div>
    }
}

export default graphql(PodcastQuery, {
     options: (props) => { return { variables: {id: props.match.params.id, page: 1 }, } }
})(Podcast)

