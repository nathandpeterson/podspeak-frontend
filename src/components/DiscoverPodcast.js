import React, { Component } from 'react'
import { Button, Row, Input } from 'react-materialize'
import { graphql } from 'react-apollo'
import DiscoverQuery from '../queries/DiscoverQuery'

class DiscoverPodcast extends Component {
    constructor(){
        super()

        this.state = {query: ''}
    }

    handleChange = (e) => {
        this.setState({query: e.target.value})
    }
    submitQuery = (e) => {
        e.preventDefault()
        console.log('clicked')
        this.props.mutate({
            variables: { query: this.state.query }
        }).catch(err => {
            console.log('in the catch', err)
        })
        .then(result => {
            console.log(result)
            return result
        })
    }

    render(){
        return <div className="center">
                    <Row>
                            <Input onChange={this.handleChange} value={this.state.query} />
                    </Row>
                    <Row>
                            <Button onClick={this.submitQuery}>SEARCH </Button>
                    </Row>
            
        </div>
    }
}

export default graphql(DiscoverQuery)(DiscoverPodcast)