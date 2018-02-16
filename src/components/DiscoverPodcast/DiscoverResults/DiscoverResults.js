import React, { Component } from 'react'
import { Row, Col, Card } from 'react-materialize'
import Parser from 'html-react-parser'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import NewPodcastMutation from '../../../mutations/NewPodcastMutation'

class DiscoverResults extends Component {

    addPodcastClick = (e) => {
        e.preventDefault()
        let user_id = localStorage.getItem('data')
        const { title,
                description,
                rss_feed,
                image_URL } = this.props.results.data.newPod.results[e.target.id]
        this.props.mutate({variables : {
            user_id,
            title,
            description,
            rss_feed,
            image_URL
                }
           }).then(response => {
               this.props.history.push(`/${user_id}`)
           })
    }

    render(){
        if(!this.props.results) return <div />
        const { results } = this.props.results.data.newPod
        return <div>
            {results.map((result, i) => {
                const { title, image_URL, description } = result
                return <Card key={i}>
                    <p className="discover-result">{Parser(title)}</p>
                        <Row className="discover-info">
                            <Col s={3}>
                                    <img alt={title} src={image_URL} />
                            </Col>
                            <Col s={9}>
                            {Parser(description)}
                            </Col>
                        </Row>
                            <div className="center">
                                <div style={{height:'3rem'}} onClick={this.addPodcastClick} >
                                    <i id={i} className="medium material-icons add-new-podcast">add_circle</i>
                                </div>
                            </div>
                        </Card>
            })}
            </div>
    }
}

export default graphql(NewPodcastMutation)(withRouter(DiscoverResults))
