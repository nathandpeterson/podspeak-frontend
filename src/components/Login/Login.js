import React, { Component } from 'react'
import { Row, Input, Button } from 'react-materialize'
import { compose, graphql, withApollo } from 'react-apollo'
import LoginMutation from '../../queries/LoginMutation'
import { withRouter } from 'react-router-dom'
import './Login.css'

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
            console.log('Error Message:', err)
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
        return <div className="center"><h5 className="error">{message}</h5></div>
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
                    <div className="center">
                        <Row>
                                <Input  onChange={this.changeHandler}
                                        value={this.state.email}
                                        type="email"
                                        s={6}
                                        label="email"
                                        style={{minWidth:'20rem'}} />
                        </Row>
                        </div>
                    <div className="center">
                        <Row>
                                <Input  onChange={this.changeHandler}
                                        value={this.state.password}
                                        type="password"
                                        s={6}
                                        label="password"
                                        style={{minWidth:'20rem'}} />
                        </Row>
                    </div>
                    <div className="center">
                        <Row>
                            <Button     onClick={this.submitForm}
                                        className="pink"> submit </Button>

                            <Button     onClick={this.signupForm}
                                        className="pink"> signup </Button>
                        </Row>
                    </div>
                    </form>
                </div>)
    }
}

export default graphql(LoginMutation)(
    compose(withApollo, withRouter)(Login)
  )
