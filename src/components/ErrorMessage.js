import React, { Component } from 'react'

class ErrorMessage extends Component {
    constructor(){
        super()
        this.state = {message: ''}
    }
    componentWillUpdate(props){
       this.setState({message: props.error})
       this.renderMessage()
    }
    renderMessage(){
        return <h3>{this.state.message}</h3>
    }

    render(){
        console.log('errmessage render',this.state)
        return <div> {this.renderMessage()} </div>
    }
}

export default ErrorMessage