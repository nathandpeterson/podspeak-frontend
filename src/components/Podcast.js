import React, { Component } from 'react'
import { Button, Card, CardTitle, Row, Col, Link } from 'react-materialize'
import { graphql } from 'react-apollo'
import PodcastQuery from '../queries/PodcastQuery'
import Nav from './Nav'

class Podcast extends Component{

    render(){
        if(this.props.data.loading) return <div/>
        const { image_url, 
                title, 
                description, 
                rss_feed, 
                image_URL, 
                latest_pub_date, 
                episodes,
                website} = this.props.data.podcast
        return  <div>
                <Nav />
                <Row>
                    <Col s={2}></Col>
                    <Col s={8}>
                        <Card
                            className="small"
                            header={<CardTitle 
                            image={image_URL}
                            waves='light'>
                            <a href={website}>{title}</a>
                            </CardTitle>}
                             actions={[<a href={website}>LEARN MORE</a>]}>
                            {description}
                        </Card>
                    </Col>
                    <Col s={2}></Col>
                </Row>
                <Row>
                    <Col s={2}></Col>
                    <Col s={8}>    
                        <Card className="one-pod-card">
                            <div>
                                {episodes.map(episode =>{
                                    return <Card className='blue-grey darken-1 episode-list' 
                                                textClassName='white-text'
                                                key={episode.id}>
                                            <h5>{episode.title}</h5>
                                            <p>{episode.pub_date.slice(0,16)}</p>
                                            <p>{episode.description}</p>
                                            <a href={`/episodes/${episode.id}`}>
                                                <Button>LISTEN</Button>
                                            </a>
                                            </Card>
                                        })
                                    }
                            </div>
                        </Card>
                    </Col>
                    <Col s={2}></Col>
                </Row>
                </div>
    }
}

export default graphql(PodcastQuery, {
    options: (props) => { return { variables: {id:  props.match.params.id } } }
})(Podcast)

