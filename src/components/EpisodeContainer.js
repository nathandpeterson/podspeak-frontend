import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import EpisodeQuery from '../queries/EpisodeQuery'
import { Button, CardPanel, Row, Col, Input, Chip } from 'react-materialize'
import Player from './Player'
import ReactionButtons from './ReactionButtons'
import ReactionFeed from './ReactionFeed'

class EpisodeContainer extends Component {

    render(){
        // The back button should go back to podcast, not back to homepage
        if(this.props.data.loading) return <div />
        const { title, audio_URL, reactions} = this.props.data.episode
        console.log(this.props.data.episode)

        return <div>
            <Row>
                <Col s={1}></Col>
                <Col s={10}>
                    <CardPanel>
                        <h5>{title}</h5>
                    </CardPanel>
                </Col>
                <Col s={1}></Col>
            </Row>
            <ReactionFeed reactions={ reactions } />
            <Player audioSource={audio_URL}/>
            <Button floating fab='horizontal' icon='mode_edit' className='red' large style={{bottom: '45px', right: '24px'}}>
                <Button floating icon='insert_comment' className='red'/>
                <Button floating icon='face' className='yellow darken-1'/>
                <Button floating icon='insert_link' className='green'/>
                <Button floating icon='photo' className='blue'/>
            </Button>
           
            {/* <ReactionButtons /> */}
        </div>
    }
}

export default graphql(EpisodeQuery, {
    options: (props) => { return { variables: { id: props.match.params.id} } }
})(EpisodeContainer)