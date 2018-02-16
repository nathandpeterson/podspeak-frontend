import React, { Component } from 'react'
import UserQuery from '../../queries/UserQuery'
import { graphql } from 'react-apollo'
import PodcastBrowser from '../PodcastBrowser/PodcastBrowser'
import { Button } from 'react-materialize'

class Userpage extends Component {

    componentDidMount = () => {
        this.props.data.refetch()
    }

    clickNewPod = (e) =>{
        e.preventDefault()
        this.props.history.push(`/${this.props.match.params.id}/discover`)
    }
    render(){
        if(!this.props.data.user) return <div />
        const { podcasts } = this.props.data.user
        return <div className="animated fadeInDown">
                    <PodcastBrowser podcasts={ podcasts }/>
                    <div className="center">
                        <Button onClick={this.clickNewPod} floating large className='red' waves='light' icon='add' />
                    </div>
                </div>
    }
}

export default graphql(UserQuery, {
    options: (props) => { return { variables: {id:  props.match.params.id } } }
})(Userpage)
