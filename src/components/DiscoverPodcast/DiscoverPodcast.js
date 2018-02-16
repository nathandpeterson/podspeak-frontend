import React, { Component } from 'react'
import { Button, Row, Col, Input } from 'react-materialize'
import { graphql } from 'react-apollo'
import DiscoverQuery from '../../queries/DiscoverQuery'
import DiscoverResults from './DiscoverResults/DiscoverResults'
import './Discover.css'

const genres = ["Technology", "Music", "Sports & Recreation", "News & Politics", "Comedy", "Philosophy",
"Video Games", "Fitness & Nutrition", "Business", "Literature", "Investing", "TV & Film",
"Religion & Spirituality", "Food", "Software How-To"]

class DiscoverPodcast extends Component {
    constructor(){
        super()
        // this.offset can increment with each repetition of a search to produce new results
        this.state = {query: '', genre: 'Technology', offset: 0, results: ''}
    }

    handleChange = (e) => {
        this.setState({query: e.target.value})
    }
    selectHandler = (e) => {
        this.setState({genre: e.target.value})
    }

    submitQuery = (e) => {
        e.preventDefault()
        this.props.mutate({
            variables: {    query: this.state.query,
                            genre: this.state.genre }
        }).catch(err => {
            console.log('Error message:', err)
        })
        .then(results => {
            this.setState({results})
        })
    }

    render(){

        return  <div className="animated fadeInDown">
                    <div className="center">
                        <h3>Search for Podcasts</h3>
                    </div>
                    <div className="center">
                        <Row>
                            <Col s={6}>
                                <Input onChange={this.handleChange} value={this.state.query} />
                            </Col>
                            <Col s={6}>
                                <Input onChange={this.selectHandler}
                                    value={this.state.genre}
                                    type="select"
                                    label="genre">
                                    {genres.map((genre, i) => {
                                        return <option key={i} value={genre}>{genre}</option>
                                    })}
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
