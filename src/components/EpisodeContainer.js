import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import EpisodeQuery from '../queries/EpisodeQuery'
import { Button, CardPanel, Row, Col, Input, Chip } from 'react-materialize'
import Player from './Player'
import ReactionButtons from './ReactionButtons'
import ReactionFeed from './ReactionFeed'

class EpisodeContainer extends Component {

    render(){
        if(this.props.data.loading) return <div />
        const { title, audio_URL, reactions} = this.props.data.episode
        console.log(this.props.data.episode)

        return <div>
            <Row>
                <Col s={1}></Col>
                <Col s={10}>
                    <CardPanel>
                        <h5>{title}</h5>
                    </CardPanel>
                </Col>
                <Col s={1}></Col>
            </Row>
            <ReactionFeed episode={ this.props.data.episode } reactions={ reactions } />
            <Player audioSource={audio_URL}/>
           
            {/* <ReactionButtons /> */}
        </div>
    }
}

export default graphql(EpisodeQuery, {
    options: (props) => { return { variables: { id: props.match.params.id} } }
})(EpisodeContainer)