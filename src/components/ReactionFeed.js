import React, { Component } from 'react'
import { Button, Row, Col, Input } from 'react-materialize'
import { graphql, withApollo } from 'react-apollo'
import CreateReaction from '../queries/CreateReaction'
import '../styles/ReactionStyle.css'
import PubSub from 'pubsub-js'
import Reactions from './Reactions.js'
import ReactionPlaceholder from './ReactionPlaceholder'


class ReactionFeed extends Component {
    constructor(){
        super()

        this.state = {textComment: '', commentForm: false, timeStamp: '', reactions: false}
    }
    componentDidMount(){
        this.token = PubSub.subscribe('TIMESTAMP', this.subscriber)
        this.token = PubSub.subscribe('ADD_COMMENT', this.subscriber)
    }

    componentWillUnmount(){
        PubSub.unsubscribe('TIMESTAMP', this.subscriber)
        PubSub.unsubscribe('ADD_COMMENT', this.subscriber)
    }

    componentWillReceiveProps(nextProps){
        nextProps.reactions.length === 0 ? this.setState({reactions: false}) : this.setState({reactions:true})
    }

    subscriber = (msg, data) => {
        console.log(msg,data)
        msg === 'TIMESTAMP' ? this.setState({timeStamp: data}) : null
        msg === 'ADD_COMMENT' ? this.setState({commentForm: !this.state.commentForm}) : null
    }

    renderTextCommentForm = () => {
        return <div > 
                    <form>
                        <Input  value={this.state.textComment} 
                                onChange={this.handleTextChange} 
                                type="text"/>
                        <div className="center">
                        <Button onClick={this.submitText} 
                                className="blue">Submit</Button>
                        </div>
                    </form>
                 </div>
    }

    handleTextChange = (e) => {
        this.setState({textComment: e.target.value})
    }
    submitText = (e) => {
        e.preventDefault()
        let user_id = localStorage.getItem('data')
        if(!user_id) console.log('handle err, you are not logged in')
        this.props.mutate({variables : {
            content: this.state.textComment,
            user_id,
            episode_id: this.props.episode.id,
            episode_timestamp: this.state.timeStamp}
        }).then(res => {
            PubSub.publish('UPDATE_REACTIONS', 'now')
            return res
        })
    }
    
    render(){
        if(!this.props.reactions) return <div />
        const { reactions, episode } = this.props
        return <div>
                  <div className="center">
                    <Row>
                        <Col s={1}></Col>
                        <Col s={10}>
                           {this.state.reactions && <Reactions reactions={ reactions }/>}
                           {!this.state.reactions && <ReactionPlaceholder episode={ episode }/>}
                        </Col>
                        <Col s={1}></Col>
                    </Row>
                    </div>
                    <div className="center">
                        {this.state.commentForm && this.renderTextCommentForm()}
                    </div>
                
                        </div>
    }
}

export default graphql(CreateReaction)(withApollo(ReactionFeed))