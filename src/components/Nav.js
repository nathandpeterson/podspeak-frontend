import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'

class Nav extends Component {
    render () {
        return (
            <Navbar right brand="podspeak">
                <NavItem> Log In </NavItem>
            </Navbar>
        )
    }
}

export default Nav