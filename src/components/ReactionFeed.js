import React, { Component } from 'react'
import { Button, Row, Col, CardPanel, Chip, Input } from 'react-materialize'
import { graphql, withApollo } from 'react-apollo'
import CreateReaction from '../queries/CreateReaction'
import '../styles/ReactionStyle.css'

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
        return <div key={data.id} className='grey lighten-3 reaction-item text-card-style'>
                <Chip>{data.episode_timestamp}</Chip>
                <div className="text-style">
                    <p>{data.content}</p>
                </div>
                <Chip>{userInfo.avatar} {userInfo.first_name}</Chip>
                </div>
    }

    renderEmoji = (data) => {
        const userInfo = this.formatUserInfo(data)
        return <CardPanel key={data.id} className="image-container-style reaction-item grey lighten-3" >
                    <Chip>{userInfo.avatar} {userInfo.first_name}</Chip>
                    <div className="reaction-emoji"><span style={{fontSize: '3rem' }}>{data.content}</span></div>
                    <Chip>{data.episode_timestamp}</Chip>
                </CardPanel>
    }

    renderImage = (data) => {
        const userInfo = this.formatUserInfo(data)
        return <CardPanel key={data.id} className="grey lighten-3 reaction-item image-container-style"  > 
                    <img alt={data.content} className="reaction-image" src={data.content}/>
                    <span style={{display:'block'}}>
                    <Chip>{userInfo.avatar} {userInfo.first_name}</Chip>
                        <Chip>{data.episode_timestamp}</Chip>
                       
                    </span>
                </CardPanel>
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
        // I need content, user_id, episode_id, podcast_id, episode_timestamp, category, ?reaction_id
        let user_id = localStorage.getItem('data')
        if(!user_id) console.log('handle err, you are not logged in')
        this.props.mutate({variables : {
            content: this.state.textComment,
            user_id,
            episode_id: this.props.episode.id,
            episode_timestamp: '00:10'}
        }).then(res => {
            // Need to refetch here!!!!!
            return res
        })
    }
    openCommentForm = () => {
        this.setState({commentForm: !this.state.commentForm})
    }
    
    render(){
        if(!this.props.reactions) return <div />
        const { reactions } = this.props
        return <div> 
                  <div className="center">
                        <div className="reaction-feed-container">
                            <div className="reaction-feed">
                                    {reactions.map(reaction => {
                                        return this.renderText(reaction)
                                            })
                                        }
                                </div>
                            </div>
                    </div>
                    <div className="center">
                     <Button onClick={this.openCommentForm} className='blue'>+ COMMENT +</Button>
               
                    {this.state.commentForm && this.renderTextCommentForm()}
                    </div>
                
                        </div>
    }
}

export default graphql(CreateReaction)(withApollo(ReactionFeed))