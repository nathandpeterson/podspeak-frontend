import React, { Component } from 'react'
import { Button, Row, Col, Input } from 'react-materialize'
import { graphql } from 'react-apollo'
import DiscoverQuery from '../queries/DiscoverQuery'
import DiscoverResults from './DiscoverResults'

class DiscoverPodcast extends Component {
    constructor(){
        super()
        // this.offset can increment with each repetition of a search to produce new results
        this.state = {query: '', genre: '', offset: 0, results: ''}
    }

    handleChange = (e) => {
        this.setState({query: e.target.value})
    }
    submitQuery = (e) => {
        e.preventDefault()
        this.props.mutate({
            variables: { query: this.state.query }
        }).catch(err => {
            console.log('in the catch', err)
        })
        .then(results => {
            this.setState({results})
        })
    }

    render(){
    
        return  <div>
                    <div className="center">
                        <h3>Search for Podcasts</h3>
                    </div>
                    <div className="center">
                        <Row>
                            <Col>
                                <Input onChange={this.handleChange} value={this.state.query} />
                            </Col>
                        </Row>
                    </div>
                    <div className="center">
                        <Row>
                            <Col>
                                <Input onChange={this.selectHandler} 
                                    value={this.state.genre}
                                    type="select" 
                                    label="genre">
                                    <option value="Technology">Technology</option>
                                    <option value="Music">Music</option>
                                    <option value="Sports & Recreation">Sports & Recreation</option>
                                    <option value="News">News</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Philosophy">Philosophy</option>
                                    <option value="Video Games">Video Games</option>
                                    <option value="Fitness & Nutrition">Fitness & Nutrition</option>
                                    <option value="Business">Business</option>
                                    <option value="Literature">Literature</option>
                                    <option value="Investing">Investing</option>
                                    <option value="TV & Film">TV & Film</option>
                                </Input>
                            </Col>
                        </Row>
                    </div>
                    <div className="center">
                        <Row>
                            <Col>
                                <Button onClick={this.submitQuery}>SEARCH </Button>
                            </Col>
                        </Row>
                    </div>
                    <div className="center">
                        <Row>
                            <Col s={1}></Col>
                            <Col s={10}>
                            {this.state.results && <DiscoverResults results={this.state.results}/>}
                            </Col>
                            <Col s={1}></Col>
                        </Row>
                    </div>
                </div>
       
    }
}

export default graphql(DiscoverQuery)(DiscoverPodcast)