import React, { Component } from 'react'
import { Row, Input, Button } from 'react-materialize'
import { compose, graphql, withApollo } from 'react-apollo'
import LoginMutation from '../queries/LoginMutation'
import { withRouter } from 'react-router-dom'

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
            const { token, error, id } = result.data.login
            if(error){
                this.setState({errorMessage: error})
            } else {
                localStorage.setItem('token', token,)
                localStorage.setItem('data', id)
                this.props.history.push(`/${id}`)
            }
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

export default graphql(LoginMutation)(
    compose(withApollo, withRouter)(Login)
  ) 
