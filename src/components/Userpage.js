import React, { Component } from 'react'
import Nav from './Nav';
import UserQuery from '../queries/UserQuery'
import { graphql } from 'react-apollo'
import PodcastBrowser from './PodcastBrowser'
import { withRouter } from 'react-router-dom'

class Userpage extends Component {

    render(){
        if(!this.props.data.user) return <div />
        const { podcasts } = this.props.data.user
        return <div>
                    <PodcastBrowser podcasts={ podcasts }/>   
                </div>
    }
}

export default graphql(UserQuery, {
    options: (props) => { return { variables: {id:  props.match.params.id } } }
})(Userpage)