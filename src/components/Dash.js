import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import DashQuery from '../queries/DashQuery'
import UserQuery from '../queries/UserQuery'
import DashProfile from './DashProfile'
import { CSSTransitionGroup } from 'react-transition-group'

class Dash extends Component {

    render(){
        if(!this.props.data.user) return <div />
      
        const { email , avatar,  first_name, id, podcasts } = this.props.data.user 
    
        return <div className="center">
            <CSSTransitionGroup
                transitionName="anim"
                transitionAppear={true}
                transitionLeave={true}
                transitionAppearTimeout={500}
                transitionLeaveTimeout={500}
                transitionEnterTimeout={500}>
               
               
            <DashProfile avatar={ avatar } first_name = { first_name } podcasts={ podcasts } />
            </CSSTransitionGroup>

         </div>
    }
}

export default graphql(UserQuery, {
    options: (props) => { return { variables: { id: props.match.params.id} } }
})(Dash)