import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import EpisodeQuery from '../queries/EpisodeQuery'
import { Row, Col } from 'react-materialize'
import Player from './Player'
import ReactionFeed from './ReactionFeed'
import PlayerReactionUpdater from './PlayerReactionUpdater'
import PubSub from 'pubsub-js'
import '../styles/PlayerStyle.css'

class PlayerContainer extends Component {
    constructor(){
        super()

        this.state = {  currentMinute: 0,
                        currentReactions: [],
                        updateReactions: ''}
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
    subscriber = (msg, data) => {
        // This function passes a random number to state as a way of triggering the reaction updater to refetch.
        // I call this in ReactionFeed mutation, after a new comment is submitted.
        this.setState({updateReactions: Math.random()})
    }
    componentDidMount(){
        this.token = PubSub.subscribe('UPDATE_REACTIONS', this.subscriber)
    }
    
    componentWillUnmount(){
        PubSub.unsubscribe('UPDATE_REACTIONS', this.subscriber)
    }

    render(){
       
        if(this.props.data.loading) return <div />
        const { title, audio_URL, podcast_name, duration } = this.props.data.episode
        return <div>
            <PlayerReactionUpdater  id={ this.props.match.params.id } 
                                    timestamp={ this.state.currentMinute }
                                    updateCurrentReactions={ this.updateCurrentReactions }
                                    updateReactions = {this.state.updateReactions} />
            <Row>
                <Col s={1}>
                    <i className="material-icons medium player-arrow" onClick={this.props.history.goBack} >arrow_back</i>
                </Col>
                <Col s={10}>
                    <div className="text-card-style">
                            <h4>{podcast_name}</h4>
                            <h5> {title}</h5>
                            <p> {duration} </p>                     
                    </div>
                </Col>
                <Col s={1}></Col>
            </Row>
            <ReactionFeed   episode={ this.props.data.episode } 
                            reactions={ this.state.currentReactions } />
            <Player audioSource={audio_URL} 
                    updateMinutes = { this.updateMinutes }
                    setTimeStamp = { this.setTimeStamp }
                    currentMinute = {this.state.currentMinute } />
        </div>
    }
}

export default graphql(EpisodeQuery, {
    options: (props) => { return { variables: { id: props.match.params.id} } }
})(PlayerContainer)