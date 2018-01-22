import React, { Component } from 'react'

const pods = ['My pod', 'Another pod', 'Yet another']

class Userpage extends Component {

    render(){
       return <ul>
        {pods.map((pod, i) => {
            return <li key={i}> {pod}</li>
        })}
        </ul>
    }
}

export default Userpage