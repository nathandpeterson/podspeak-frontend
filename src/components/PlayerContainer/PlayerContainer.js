import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import EpisodeQuery from '../../queries/EpisodeQuery'
import Player from './Player/Player'
import ReactionFeed from './ReactionFeed/ReactionFeed'
import PlayerReactionUpdater from './Player/PlayerReactionUpdater'
import PubSub from 'pubsub-js'
import './Player.css'

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
        const { title, audio_URL, duration } = this.props.data.episode
        const podcast_title = this.props.data.episode.podcast.title || null
        return <div>
            <PlayerReactionUpdater  id={ this.props.match.params.id }
                                    timestamp={ this.state.currentMinute }
                                    updateCurrentReactions={ this.updateCurrentReactions }
                                    updateReactions = {this.state.updateReactions} />

            <div className="player-header">
                <i className="material-icons medium player-arrow" onClick={this.props.history.goBack} >arrow_back</i>
                <div className="player-header-info">
                    <h4>{podcast_title}</h4>
                    <h5> {title}</h5>
                    <h5> {duration} </h5>
                </div>
            </div>
            <ReactionFeed   episode={ this.props.data.episode }
                            reactions={ this.state.currentReactions } />

            <Player         audioSource={audio_URL}
                            updateMinutes = { this.updateMinutes }
                            setTimeStamp = { this.setTimeStamp }
                            currentMinute = {this.state.currentMinute } />
        </div>
    }
}

export default graphql(EpisodeQuery, {
    options: (props) => { return { variables: { id: props.match.params.id} } }
})(PlayerContainer)
