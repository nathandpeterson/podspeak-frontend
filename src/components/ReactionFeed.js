import React, { Component } from 'react'
import { Button, Input } from 'react-materialize'
import { graphql } from 'react-apollo'
import CreateReaction from '../queries/CreateReaction'
import '../styles/ReactionStyle.css'
import PubSub from 'pubsub-js'
import Reactions from './Reactions.js'
import ReactionPlaceholder from './ReactionPlaceholder'


class ReactionFeed extends Component {
    constructor(){
        super()

        this.state = {  textComment: '', 
                        commentForm: false, 
                        timeStamp: '', 
                        reactions: false,
                        success: false}
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
        if(msg === 'TIMESTAMP') this.setState({timeStamp: data})
        if(msg === 'ADD_COMMENT') this.setState({commentForm: !this.state.commentForm})
    }

    renderTextCommentForm = () => {
        return <div > 
                    <form>
                       
                            <Input  value={this.state.textComment} 
                                    onChange={this.handleTextChange} 
                                    type="text"/>
                       
                        <div className="submit-reaction-btn-container center">
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
        this.props.mutate({variables : {
            content: this.state.textComment,
            user_id,
            episode_id: this.props.episode.id,
            episode_timestamp: this.state.timeStamp}
        }).then(res => {
            PubSub.publish('UPDATE_REACTIONS', 'now')
            this.setState({commentForm: false, textComment: '', success: true})
            setTimeout(() => {
                this.setState({success: false})
            }, 1000)
            return res
        })
    }
    successMessage = () => {
        return <h5 className="reaction-success">Message Posted</h5>
    }
    
    render(){
        if(!this.props.reactions) return <div />
        const { reactions, episode } = this.props
        return <div>
                    <div className="center">
                        {this.state.reactions && <Reactions reactions={ reactions }/>}
                        {!this.state.reactions && <ReactionPlaceholder episode={ episode }/>}
                        
                    </div>
                    <div className="center">
                         {this.state.success && this.successMessage()}
                        {this.state.commentForm && this.renderTextCommentForm()}
                    </div>
                </div>
    }
}

export default graphql(CreateReaction)(ReactionFeed)