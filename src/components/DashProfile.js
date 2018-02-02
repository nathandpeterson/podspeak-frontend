import React from 'react'
import Parser from 'html-react-parser'
import { Card, Collection, CollectionItem } from 'react-materialize'
import '../styles/DashStyle.css'

const unsubscribe = (e) => {
    console.log('delete this podcast ',e.target.id, 'for this user', localStorage.getItem('data'))
}


const DashProfile = ({avatar, id, first_name, podcasts}) => {
    return  <Card>
                <h3 >{avatar}{first_name}</h3>
                <h4 >My podcasts:</h4>
                <Collection >
                    {podcasts.map(podcast => {
                        return <CollectionItem className="dash-podcast" key={podcast.id}>{Parser(podcast.title)}
                                 <i id={podcast.id} 
                                    data={id}
                                    onClick={unsubscribe}
                                    className="material-icons dash-trash">delete</i>
                            </CollectionItem>
                    })}
            </Collection>
            </Card>
}

export default DashProfile