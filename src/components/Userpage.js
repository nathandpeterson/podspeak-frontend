import React, { Component } from 'react'
import UserQuery from '../queries/UserQuery'
import { graphql } from 'react-apollo'
import PodcastBrowser from './PodcastBrowser'
import { Button } from 'react-materialize'

class Userpage extends Component {

    render(){
        if(!this.props.data.user) return <div />
        const { podcasts } = this.props.data.user
        return <div>
                    <PodcastBrowser podcasts={ podcasts }/>
                    <div className="center">
                        <Button floating large className='red' waves='light' icon='add' />
                    </div>   
                </div>
    }
}

export default graphql(UserQuery, {
    options: (props) => { return { variables: {id:  props.match.params.id } } }
})(Userpage)