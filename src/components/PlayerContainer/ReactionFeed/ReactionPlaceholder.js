import React, { Component } from 'react'
import { Col, Row, Card } from 'react-materialize'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './Reaction.css'


const query = gql`query GetImage($id: ID!, $page: Int!) {
    podcast(id:$id, page: $page){
      image_URL
    }
  }`


class ReactionPlaceholder extends Component{

render (){
    if(!this.props.data.podcast) return <div />
    const { image_URL } = this.props.data.podcast
    return<div>
            <Row>
                <Col s={1}></Col>
                <Col s={10}>
                <Card className="placeholder-card" >
                    <img className="placeholder-image" alt='podcast cover' src={image_URL}/>
                    <p> Nobody has left any comments...</p>
                </Card>
                </Col>
                <Col s={1}></Col>
            </Row>
        </div>
    }
}

export default graphql(query, {
    options: (props) => { return { variables: {id:  props.episode.podcast_id, page: 1 } } }
})(ReactionPlaceholder)
