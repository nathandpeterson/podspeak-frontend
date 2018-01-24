import React, { Component } from 'react'
import { Row, Input, Button } from 'react-materialize'
import { graphql } from 'react-apollo'
import LoginMutation from '../queries/LoginMutation'
import ErrorMessage from './ErrorMessage'


class Login extends Component {
    constructor(){
        super()
        this.state = {email: '', password: '', errorMessage: ''}
    }

    submitForm = (e) => {
        e.preventDefault()
        this.props.mutate({variables :{
         email: this.state.email,
         password: this.state.password   
            }
        }).catch(err => {
            console.log('in the catch', err)
        })
        .then(result => {
            const { token, error, email, id } = result.data.login
            token ? localStorage.setItem('token', token) : this.setState({errorMessage: error})
                // this.props.history.push('/:id')
            console.log(id)
                // Just hard-coded an id for test
            token ?  this.props.history.push(`/${id}`) : null
        })
    }

    displayErrorMessage(message){
        return <h3> {message}</h3>
    }

    signupForm = (e) => {
        e.preventDefault()
        this.props.history.push('/signup')
    }

    changeHandler = (e) => {
        const key = e.target.type
        this.setState({[key]: e.target.value})
    }

    render(){
        return  (<div>
                {this.state.errorMessage && this.displayErrorMessage(this.state.errorMessage)}
                    <form>
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
                    </form>
                </div>)
    }
}

export default graphql(LoginMutation)(Login)