import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import UserQuery from '../queries/UserQuery'
import { withRouter } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

export default (WrappedComponent) => {
    class RequireAuth extends Component {
        componentWillUpdate(nextProps){
            if(!localStorage.getItem('token')){
                this.props.history.push('/')
            } else {
                // validate token here
                const token = localStorage.getItem('token')
                const decoded = jwtDecode(token.slice(8))
                // Route param is a string, convert to a number to compare it to userID
                let routeParam = parseInt(this.props.match.params.id)
                if(routeParam !== decoded.id) this.props.history.push('/')
            }
        }
            render(){
                return <WrappedComponent {...this.props} />            
            }
        }
    return graphql(UserQuery, {
        options: (props) => { return { variables: {id:  props.match.params.id } } }
    })(RequireAuth)
}


