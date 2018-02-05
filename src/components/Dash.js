import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import UserQuery from '../queries/UserQuery'
import DashProfile from './DashProfile'

class Dash extends Component {

    refetch = () => {
        this.props.data.refetch()
    }

    render(){
        if(!this.props.data.user) return <div />
      
        const { avatar,  first_name, id, podcasts } = this.props.data.user 

        return  <div className="center animated fadeInDown">
                    <DashProfile    id ={ id } 
                                    avatar={ avatar } 
                                    first_name = { first_name } 
                                    podcasts={ podcasts } 
                                    refetch = { this.refetch }/>       
                </div>
    }
}

export default graphql(UserQuery, {
    options: (props) => { return { variables: { id: props.match.params.id} } }
})(Dash)