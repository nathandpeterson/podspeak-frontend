import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import UserQuery from '../queries/UserQuery'
import DashProfile from './DashProfile'

class Dash extends Component {

    

    render(){
        if(!this.props.data.user) return <div />
      
        const { avatar,  first_name, id, podcasts } = this.props.data.user 
    
        return  <div className="center">
                    <DashProfile id ={ id } avatar={ avatar } first_name = { first_name } podcasts={ podcasts } />       
                </div>
    }
}

export default graphql(UserQuery, {
    options: (props) => { return { variables: { id: props.match.params.id} } }
})(Dash)