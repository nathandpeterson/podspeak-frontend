import React, { Component} from 'react'
import { Row, Input, Button } from 'react-materialize'
import { graphql } from 'react-apollo'
import SignupMutation from '../queries/SignupMutation'

const avatars = ["😀","👻", "💩", "👽", "🤡", "🤖", "😀", "😺", "👾", "💋", "🐶", "🐸", "🦉", "🦄", "🦖", 
"🐙","🐠", "🦍", "🐉"]

class Signup extends Component {
    constructor(){
        super()
        this.state = {  email: '', 
                        password: '', 
                        first_name: '', 
                        last_name: '', 
                        avatar: '😀', 
                        errorMessage: ''}
    }

    emailHandler = (e) => {
        this.setState({email: e.target.value})
    }
    passwordHandler = (e) => {
        this.setState({password: e.target.value})
    }
    firstNameHandler = (e) => {
        this.setState({first_name: e.target.value})
    }
    lastNameHandler = (e) => {
        this.setState({last_name: e.target.value})
    }
    avatarHandler = (e) => {
        this.setState({avatar: e.target.value})
    }
    displayErrorMessage = () => {
        return this.state.errorMessage.map((error, i) => {
            return <h4 key={i}>{error}</h4>
        }) 
    }
    verifyFields = () => {
        let errors = []
        if(!this.state.email) errors = [...errors, 'You must enter an email']
        if(!this.state.first_name) errors = [...errors, 'You must enter your first name']
        if(!this.state.last_name) errors = [...errors, 'You must enter your last name']
        if(!this.state.password) errors = [...errors, 'You must choose a password']
        this.setState({errorMessage: errors})
        // returns truthy with error string if errors
        return errors.length ? 'Error' : null
    }

    submitForm = (e) => {
        e.preventDefault()
        // if the return is truthy, do nothing, else send the form
        if(!this.verifyFields()) this.props.mutate({
            variables: {
                email: this.state.email,
                password: this.state.password,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                avatar: this.state.avatar,
            }
        }).then(result => {
            console.log(result)
            // also should grant a token here?
            if (result.data.signup.error ) {
                this.setState({errorMessage: result.data.signup.error})
                } else {
                    const { id } = result.data.signup
                    this.props.history.push(`/login`)
                }
        }).catch(err => console.log('catch error: ', err))
    }
    render(){
        return <div>
                  {this.state.errorMessage && this.displayErrorMessage(this.state.errorMessage)}
                    <form>
                    <Row>
                        <Input  onChange={this.emailHandler}
                                value={this.state.email} 
                                type="email" 
                                s={6} 
                                label="email" />
                        <Input  onChange={this.passwordHandler} 
                                value={this.state.password}
                                type="password" 
                                s={6} 
                                label="password" />
                    </Row>
                    <Row>
                        <Input onChange={this.firstNameHandler} 
                                value={this.state.first_name}
                                type="text" 
                                s={6} 
                                label="first name" />
                        <Input onChange={this.lastNameHandler} 
                                value={this.state.last_name}
                                type="text" 
                                s={6} 
                                label="last name" />
                    </Row>
                    <Row>
                         <Input onChange={this.avatarHandler}
                                value={`${this.state.avatar}`}
                                type="select" 
                                s={6} 
                                label="avatar">
                                {avatars.map((avatar, i) => {
                                    return  <option key={i} 
                                                    value={avatar} 
                                                    className="avatar-option">{avatar}
                                            </option>
                                })}      
                        </Input>
                            
                    </Row>
                    <Row>
                    <Button     onClick={this.submitForm} 
                                className="pink"> submit </Button>
                    </Row>
                 </form>
                 </div>
    }
}

export default graphql(SignupMutation)(Signup)