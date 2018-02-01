import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import EpisodeQuery from '../queries/EpisodeQuery'
import { Button, CardPanel, Row, Col } from 'react-materialize'
import Player from './Player'
import ReactionFeed from './ReactionFeed'
import PlayerReactionUpdater from './PlayerReactionUpdater'

class PlayerContainer extends Component {
    constructor(){
        super()

        this.state = {  currentMinute: 0,
                        timeStamp: '', 
                        currentReactions: []}
    }

    updateMinutes = (val) => {
        this.setState({currentMinute: val})
    }
    setTimeStamp = (timeStamp) => {
        this.setState({timeStamp})
    }
    updateCurrentReactions = (reactions) => {
        this.setState({currentReactions: reactions})
    }
    getTimeStamp = () => {
        console.log('in the playercontainer',this.state.timeStamp)
        return this.state.timeStamp
    }


    render(){
        if(this.props.data.loading) return <div />

        const { title, audio_URL, reactions } = this.props.data.episode
    
        return <div>
            <PlayerReactionUpdater  id={this.props.match.params.id} 
                                    timestamp={this.state.currentMinute}
                                    updateCurrentReactions={this.updateCurrentReactions} />
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
            <ReactionFeed   episode={ this.props.data.episode } 
                            reactions={ this.state.currentReactions }
                            getTimeStamp={ this.getTimeStamp }
                            />
            <Player audioSource={audio_URL} 
                    updateMinutes = { this.updateMinutes }
                    setTimeStamp = { this.setTimeStamp }
                    currentMinute = {this.state.currentMinute }/>
        </div>
    }
}

export default graphql(EpisodeQuery, {
    options: (props) => { return { variables: { id: props.match.params.id} } }
})(PlayerContainer)