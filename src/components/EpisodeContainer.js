import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import EpisodeQuery from '../queries/EpisodeQuery'
import { CardPanel, Row, Col, Input, Chip } from 'react-materialize'
import Player from './Player'
import ReactionButtons from './ReactionButtons'

class EpisodeContainer extends Component {

    render(){
        // The back button should go back to podcast, not back to homepage
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
            <Player audioSource={audio_URL}/>
            <Row>
                <Col s={1}></Col>
                <Col s={10}>
                <Row>
                        {reactions.map(reaction =>{
                            return <Col
                                        key={reaction.id}>
                                    <CardPanel>
                                    <p>{reaction.content}</p>
                                    <Chip> <span role="img" aria-label="emoji">🦁</span> Nathan</Chip>
                                    </CardPanel>
                                    </Col>
                                })
                            }
                </Row>
                </Col>
                <Col s={1}></Col>
            </Row>
           
            <ReactionButtons />
            <Input type="text" />
        </div>
    }
}

export default graphql(EpisodeQuery, {
    options: (props) => { return { variables: { id: props.match.params.id} } }
})(EpisodeContainer)