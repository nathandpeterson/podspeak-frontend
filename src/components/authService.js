import React, { Component } from 'react'
import Userpage from './Userpage'
import jwtDecode from 'jwt-decode'
import { withRouter } from 'react-router-dom'

const checkForToken = () => {
    const token = localStorage.getItem('token').slice(8)
    const decoded = jwtDecode(token)
    return decoded
   }

const requireAuth = () => {
    if(!localStorage.getItem('token')){
        // this.props.history.push('/')
        console.log('no token props',this.props)
    } else {
        // Verify token and redirect to Userpage
        const token = localStorage.getItem('token')
        const decoded = jwtDecode(token.slice(8))
        this.props.history.push('/')
    }
}

export default withRouter(requireAuth)