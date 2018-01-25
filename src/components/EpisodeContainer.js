import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import EpisodeQuery from '../queries/EpisodeQuery'
import { Link } from 'react-router-dom'
import { Collection, CollectionItem, Row, Col, Input } from 'react-materialize'
import Player from './Player'
import ReactionButtons from './ReactionButtons'

class EpisodeContainer extends Component {

    render(){
        if(this.props.data.loading) return <div />
        const { id, title, description, audio_URL, reactions} = this.props.data.episode

        return <div>
            <h3>{title}</h3>
            <Row>
                <Col s={1}></Col>
                <Col s={10}>
                <Collection>
                        {reactions.map(reaction =>{
                            return <CollectionItem 
                                        key={reaction.id}>
                                    <p>{reaction.content}</p>
                                    </CollectionItem>
                                })
                            }
                </Collection>
                </Col>
                <Col s={1}></Col>
            </Row>
            <Player />
            <ReactionButtons />
            <Input type="text" />
        </div>
    }
}

export default graphql(EpisodeQuery, {
    options: (props) => { return { variables: { id: props.match.params.id} } }
})(EpisodeContainer)