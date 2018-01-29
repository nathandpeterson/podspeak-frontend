import React, { Component } from 'react'
import { Row, Col, Card, Button } from 'react-materialize'
import Parser from 'html-react-parser'
import { graphql } from 'react-apollo'

class DiscoverResults extends Component {
    addPodcastClick = (e) => {
        e.preventDefault()
        console.log('Add podcast to user collection', e.target)
    }

    render(){
        console.log('in the results', this.props)
        if(!this.props.results) return <div />
        const { results } = this.props.results.data.newPod
        return <div>
            {results.map((result, i) => {
                const { title, image_URL, description } = result
                return <Card key={i}>
                    <p className="discover-result">{Parser(title)}</p>   
                        <Row className="discover-info">    
                            <Col s={3}>
                                    <img src={image_URL} />
                            </Col>
                            <Col s={9}>
                            {Parser(description)}
                            </Col>
                        </Row>
                            <div className="center">
                                <Button id={i} onClick={this.addPodcastClick} floating large className='red' waves='light' icon='add' />
                            </div>
                        </Card>
            })}
            </div>
    }
}

export default DiscoverResults

