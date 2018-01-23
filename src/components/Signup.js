import React, { Component} from 'react'
import { Row, Input, Button } from 'react-materialize'
import { graphql } from 'react-apollo'
import SignupMutation from '../queries/SignupMutation'

const avatars = ["😀","👻", "💩", "👽", "🤡", "🤖", "😀", "😺", "👾", "💋", "🐶", "🐸", "🦉", "🦄", "🦖", 
"🐙","🐠", "🦍", "🐉"]

class Signup extends Component {
    constructor(){
        super()
        this.state = {email: '', password: '', first_name: '', last_name: '', avatar: '😀', privacy: '0'}
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
    privacyHandler = (e) => {
        this.setState({privacy: e.target.value})
    }
    submitForm = (e) => {
        e.preventDefault()
        console.log(this.state)
        this.props.mutate({
            variables: {
                email: this.state.email,
                password: this.state.password,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                avatar: this.state.avatar,
                privacy: this.state.privacy
            }
        }).then(result => {
            // get the id back and use it to push the user to custom page
            // also should grant a token here?
            console.log(result)
            this.props.history.push('/')
        })
    }
    render(){
        return  <form>
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
        return <option key={i} value={avatar} className="avatar-option">{avatar}</option>
                                })}      
                        </Input>
                            
                        <Input onChange={this.privacyHandler} 
                                value={this.state.privacy}
                                type="select" 
                                s={6} 
                                label="privacy">
                                    <option value="0">Share all my activity</option>
                                    <option value="1">Only share my activity with other users</option>
                                    <option value="2">Keep my activity private</option>
                        </Input>
                    </Row>
                    <Row>
                    <Button     onClick={this.submitForm} 
                                className="pink"> submit </Button>
                    </Row>
                 </form>
    }
}

export default graphql(SignupMutation)(Signup)