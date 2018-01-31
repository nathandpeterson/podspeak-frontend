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

    renderText = (data) => {
        return <CardPanel key={data.id} className='grey lighten-3 text-card-style'>
                <Chip>Name</Chip>
                <div className="text-style"><p>{data.content}</p></div>
                <Chip>{data.episode_timestamp}</Chip>
                </CardPanel>
    }

    renderEmoji = (data) => {
        return <CardPanel key={data.id} className="image-container-style grey lighten-3" >
                    <Chip>Name</Chip>
                    <div className="reaction-emoji"><span style={{fontSize: '3rem' }}>{data.content}</span></div>
                    <Chip>{data.episode_timestamp}</Chip>
                </CardPanel>
    }

    renderImage = (data) => {
        return <CardPanel key={data.id} className="grey lighten-3 image-container-style"  > 
                    <img alt={data.content} className="reaction-image" src={data.content}/>
                    <span style={{display:'block'}}>
                        <Chip>Name</Chip>
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
        // if I have the episode, I can find the podcast_id on the backend
        let user_id = localStorage.getItem('data')
        if(!user_id) console.log('handle err, you are not logged in')
        this.props.mutate({variables : {
            content: this.state.textComment,
            user_id,
            episode_id: this.props.episode.id,
            episode_timestamp: '00:10',
            category: 1}
        }).then(res => {
            console.log('in the results',this.props)
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
                    <Row>
                        <Col s={1}></Col>
                        <Col s={10}>
                        <div className="center reaction-feed-container">
                                {reactions.map(reaction => {
                                    console.log(reaction)
                                    const { category } = reaction
                                    if(category === 1) return this.renderText(reaction)
                                    if(category === 2) return this.renderEmoji(reaction)
                                    return this.renderImage(reaction)
                                        })
                                    }
                        </div>
                        </Col>
                        <Col s={1}></Col>
                    </Row>
                    <div className="center">
                     <Button onClick={this.openCommentForm} className='blue'>+ COMMENT +</Button>
                     </div>
                    {this.state.commentForm && this.renderTextCommentForm()}
                    
                    </div>
  
    }
}

export default graphql(CreateReaction)(withApollo(ReactionFeed))