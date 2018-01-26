import React, { Component } from 'react'
import Userpage from './Userpage'
import jwtDecode from 'jwt-decode'

const checkForToken = () => {
    if(!localStorage.getItem('token')) return null
    const token = localStorage.getItem('token').slice(8)
    const decoded = jwtDecode(token)
    return decoded
   }

const requireAuth = () => {
    if(!localStorage.getItem('token')){
        this.props.history.push('/')
    } else {
        // Verify token and redirect to Userpage
    }
}

export default requireAuth