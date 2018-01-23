import React, { Component } from 'react'
import { Row, Input, Button } from 'react-materialize'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const mutation = gql` mutation login($email: String, $password: String) {
    login(email: $email, password: $password){
        email
        token
    }
}`

class Login extends Component {
    constructor(){
        super()
        this.state = {email: '', password: ''}
    }

    submitForm = (e) => {
        e.preventDefault()
        this.props.mutate({variables :{
         email: this.state.email,
         password: this.state.password   
            }
        }).then(result => {
            if(result.data.login){
                const { token }  = result.data.login
                localStorage.setItem('token', token)
                // redirect to custom homepage
                // this.props.history.push('/:id')
            } else {
                console.log('handle err')
            }
           
        })
    }

    signupForm = (e) => {
        e.preventDefault()
        this.props.history.push('/')
    }

    changeHandler = (e) => {
        const key = e.target.type
        this.setState({[key]: e.target.value})
    }

    render(){
        console.log('login props',this.props)
        return  (<form>
                <Row>
                        <Input  onChange={this.changeHandler}
                                value={this.state.email} 
                                type="email" 
                                s={6} 
                                label="email" />
                </Row>
                <Row>
                        <Input  onChange={this.changeHandler} 
                                value={this.state.password}
                                type="password" 
                                s={6} 
                                label="password" />
                </Row>
                <Row>
                    <Button     onClick={this.submitForm} 
                                className="pink"> submit </Button>
                </Row>
                <Row>
                    <Button     onClick={this.signupForm}
                                className="pink"> signup </Button>
                </Row>
                </form>)
    }
}

export default graphql(mutation)(Login)