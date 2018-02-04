import React, { Component } from 'react'
import Parser from 'html-react-parser'
import { Card, Collection, CollectionItem } from 'react-materialize'
import '../styles/DashStyle.css'
import { graphql } from 'react-apollo'
import DeleteUserPodcast from '../queries/DeleteUserPodcast'


class DashProfile extends Component  {

unsubscribe = (e) => {
        this.props.mutate({
            variables: {
                user_id: localStorage.getItem('data'),
                podcast_id: e.target.id
            }
        }).then(result => {
            this.props.refetch()
        })
    }

render() {
    const {avatar, id, first_name, podcasts} = this.props
    return  <Card>
                <h3 >{avatar}{first_name}</h3>
                <h4 >My podcasts:</h4>
                <Collection >
                    {podcasts.map(podcast => {
                        return <CollectionItem className="dash-podcast" key={podcast.id}>{Parser(podcast.title)}
                                 <i id={podcast.id} 
                                    data={id}
                                    onClick={this.unsubscribe}
                                    className="material-icons dash-trash">delete</i>
                                </CollectionItem>
                    })}
                 </Collection>
            </Card>
    }
}

export default graphql(DeleteUserPodcast)(DashProfile)