import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import UserQuery from '../queries/UserQuery'
import jwtDecode from 'jwt-decode'

export default (WrappedComponent) => {
    class RequireAuth extends Component {
        componentWillUpdate(nextProps){
            if(!localStorage.getItem('token')){
                this.props.history.push('/')
            } else {
                // Grab the token and decode it to get the userID
                const token = localStorage.getItem('token')
                const decoded = jwtDecode(token.slice(8))
                // Route parameter is a string; convert it to a number to compare it to userID
                let routeParam = parseInt(this.props.match.params.id, 10)
                if(routeParam !== decoded.id) this.props.history.push('/')
            }
        }
            render(){
                      // jwt is verified on the back end!
                return <WrappedComponent {...this.props} />            
            }
        }
    return graphql(UserQuery, {
        options: (props) => { return { variables: {id:  props.match.params.id } } }
    })(RequireAuth)
}


