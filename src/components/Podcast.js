import React, { Component } from 'react'
import { Card, CardTitle, Collection, CollectionItem, Row, Col } from 'react-materialize'
import { graphql } from 'react-apollo'
import PodcastQuery from '../queries/PodcastQuery'

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
        return <Row>
                    <Col s={6}>
                        <Card
                            className="one-pod-card"
                            header={<CardTitle 
                            reveal 
                            image={image_URL}
                            waves='light'/>}
                            title={title}
                            reveal={<p>{description}</p>}>
                            <p>More...</p>
                        </Card>
                    </Col>
                    <Col s={6}>    
                        <Card className="one-pod-card">
                            <Collection>
                                {episodes.map(episode =>{
                                    return <CollectionItem 
                                                href={`/play/${episode.id}`} 
                                                key={episode.id}>
                                            <h6>{episode.title}</h6>
                                            <p>{episode.pub_date}</p>
                                            <p>{episode.description}</p>
                                            <p>{episode.duration}</p>
                                            </CollectionItem>
                                        })
                                    }
                            </Collection>
                        </Card>
                    </Col>
                </Row>

    }
}

export default graphql(PodcastQuery, {
    options: (props) => { return { variables: {id:  props.match.params.id } } }
})(Podcast)

