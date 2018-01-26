import React, { Component } from 'react'
import Nav from './Nav';

const pods = ['My pod', 'Another pod', 'Yet another']

class Userpage extends Component {

    render(){
       return <div>
           
                <ul>
        {pods.map((pod, i) => {
            return <li key={i}> {pod}</li>
            }
        )}
                </ul>  
        </div>
    }
}

export default Userpage