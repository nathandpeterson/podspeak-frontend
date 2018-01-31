import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import EpisodeQuery from '../queries/EpisodeQuery'
import { Button, CardPanel, Row, Col } from 'react-materialize'
import Player from './Player'
import ReactionFeed from './ReactionFeed'

class PlayerContainer extends Component {

    render(){
        console.log('props in playercontainer',this.props)
        if(this.props.data.loading) return <div />
        const { title, audio_URL, reactions} = this.props.data.episode
    
        return <div>
            <Row>
                <Col s={1}></Col>
                <Col s={10}>
                    <CardPanel className="player-dash">
                        <Button onClick={this.props.history.goBack}
                                className="blue">back to podcast</Button>
                        <h5>{title}</h5>
                    </CardPanel>
                </Col>
                <Col s={1}></Col>
            </Row>
            <ReactionFeed episode={ this.props.data.episode } reactions={ reactions } />
            <Player audioSource={audio_URL}/>
        </div>
    }
}

export default graphql(EpisodeQuery, {
    options: (props) => { return { variables: { id: props.match.params.id} } }
})(PlayerContainer)