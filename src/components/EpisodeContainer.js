import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import EpisodeQuery from '../queries/EpisodeQuery'
import { Link } from 'react-router-dom'
import { Button, CardPanel, Row, Col, Input, Chip } from 'react-materialize'
import Player from './Player'
import Nav from './Nav'
import ReactionButtons from './ReactionButtons'

class EpisodeContainer extends Component {

    render(){
        // The back button should go back to podcast, not back to homepage
        if(this.props.data.loading) return <div />
        const { id, title, description, audio_URL, reactions} = this.props.data.episode

        return <div>
            <Row>
                <Col s={1}></Col>
                <Col s={10}>
                    <CardPanel>
                        <h4>{title}</h4>
                    </CardPanel>
                </Col>
                <Col s={1}></Col>
            </Row>
            <Row>
                <Col s={1}></Col>
                <Col s={10}>
                <Row>
                        {reactions.map(reaction =>{
                            return <Col
                                        key={reaction.id}>
                                    <CardPanel className="teal lighten-4 black-text">
                                    <p>{reaction.content}</p>
                                    <Chip> 🦁 Nathan</Chip>
                                    </CardPanel>
                                    </Col>
                                })
                            }
                </Row>
                </Col>
                <Col s={1}></Col>
            </Row>
            <Player />
            <ReactionButtons />
            <Input type="text" />
        </div>
    }
}

export default graphql(EpisodeQuery, {
    options: (props) => { return { variables: { id: props.match.params.id} } }
})(EpisodeContainer)