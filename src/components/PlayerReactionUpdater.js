import { graphql, withApollo } from 'react-apollo'
import React   from 'react'
import EpisodeTime from '../queries/EpisodeTime'

// This component sends queries to get reactions for a particular timestamp
// e.g. at 00:00:00, it fetches reactions for 00:00:00-00:00:59
// The interval can be customized in the API, in the reactionModel

const ReactionUpdater = (props) => {
    if(!props) return null
    if(props.updateReactions) props.data.refetch()
    const { timedReactions } = props.data
    props.updateCurrentReactions(timedReactions)
    return <div />
}


export default graphql(EpisodeTime, {
    options: (props) => { return { variables: { id: props.id, timestamp: props.timestamp} } }
})(withApollo(ReactionUpdater))