import React, { Component } from 'react'
import { Button, Row, Col, CardPanel, Chip, Input } from 'react-materialize'
import { graphql, withApollo } from 'react-apollo'
import CreateReaction from '../queries/CreateReaction'
import '../styles/ReactionStyle.css'
import ReactTransitions from 'react-transitions'
import 'react-transitions/dist/animations.css'

class ReactionFeed extends Component {
    constructor(){
        super()

        this.state = {textComment: '', commentForm: false}
    }

    formatUserInfo = (data) => {
        const { userInfo } = data
        const [ id, avatar , first_name, last_name ] = userInfo.split(',')
        return { id, avatar, first_name, last_name }
    }

    renderText = (data) => {
        const userInfo = this.formatUserInfo(data)
        return   <div key={data.id} className='grey lighten-3 reaction-item text-card-style'>
                <Chip>{data.episode_timestamp}</Chip>
                <div className="text-style">
                    <p>{data.content}</p>
                </div>
                <Chip>{userInfo.avatar} {userInfo.first_name}</Chip>
                </div>
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
        let time = this.props.getTimeStamp()
        console.log('in the mutation',time)
        // I need content, user_id, episode_id, podcast_id, episode_timestamp, category, ?reaction_id
        let user_id = localStorage.getItem('data')
        if(!user_id) console.log('handle err, you are not logged in')
        this.props.mutate({variables : {
            content: this.state.textComment,
            user_id,
            episode_id: this.props.episode.id,
            episode_timestamp: '00:00:10'}
        }).then(res => {
            // Need to refetch here!!!!!
            console.log('find method for refetching in here',this.props)
            return res
        })
    }

    getTimeStamp = () => {

    }
    openCommentForm = () => {
        this.setState({commentForm: !this.state.commentForm})
    }
    
    render(){
        if(!this.props.reactions) return <div />
        const { reactions } = this.props
        return <div>
            <ReactTransitions
                    transition="move-to-left-move-from-right"
                    width={ 600 }
                    height={ 300 }
                    >
                <h1>hello world</h1>
            </ReactTransitions>
                  <div className="center">
                    <Row>
                        <Col s={1}></Col>
                        <Col s={10}>
                        <div className="reaction-feed-container">
                            <div className="reaction-feed">
                                    {reactions.map(reaction => {
                                        return this.renderText(reaction)
                                            })
                                        }
                                </div>
                            </div>
                        </Col>
                        <Col s={1}></Col>
                    </Row>
                    </div>
                    <div className="center">
                        <Button onClick={this.openCommentForm} className='blue'>+ COMMENT +</Button>
                                        
                    </div>
                    <div className="center">
                        {this.state.commentForm && this.renderTextCommentForm()}
                    </div>
                
                        </div>
    }
}

export default graphql(CreateReaction)(withApollo(ReactionFeed))