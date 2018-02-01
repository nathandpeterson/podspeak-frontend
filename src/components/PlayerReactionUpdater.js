import { graphql } from 'react-apollo'
import React from 'react'
import EpisodeTime from '../queries/EpisodeTime'

const ReactionUpdater = (props) => {
    if(!props) return null
    const { timedReactions } = props.data
    props.updateCurrentReactions(timedReactions)
    return <div />
}

export default graphql(EpisodeTime, {
    options: (props) => { return { variables: { id: props.id, timestamp: props.timestamp} } }
})(ReactionUpdater)