import { graphql } from 'react-apollo'
import React, { Component }  from 'react'
import EpisodeTime from '../../../queries/EpisodeTime'

// This component sends queries to get reactions for a particular timestamp
// e.g. at 00:00:00, it fetches reactions for 00:00:00-00:00:59
// The interval can be customized in the API, in the reactionModel

class ReactionUpdater extends Component {

    componentWillReceiveProps(nextProps){
        if(nextProps.updateReactions) this.props.data.refetch()
        const { timedReactions } = nextProps.data
        nextProps.updateCurrentReactions(timedReactions)
    }

    render(){
        if(!this.props.data) return null
        return <div />
    }
}

export default graphql(EpisodeTime, {
    options: (props) => { return { variables: { id: props.id, timestamp: props.timestamp} } }
})(ReactionUpdater)
