import React, { Component } from 'react'
import { Row, Input, Button } from 'react-materialize'

class Login extends Component {
    constructor(){
        super()
        this.state = {email: '', password: ''}
    }

    submitForm = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    changeHandler = (e) => {
        const key = e.target.type
        this.setState({[key]: e.target.value})
    }

    render(){
        return  (<form>
                    <Row>
                        <Input  onChange={this.changeHandler} 
                                type="email" 
                                s={6} 
                                label="email" />
                    </Row>
                    <Row>
                        <Input  onChange={this.changeHandler} 
                                type="password" 
                                s={6} 
                                label="password" />
                    </Row>
                    <Button     onClick={this.submitForm} 
                                className="pink"> submit </Button>
                </form>)
    }
}

export default Login