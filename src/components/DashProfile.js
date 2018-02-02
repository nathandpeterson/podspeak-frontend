import React from 'react'
import Parser from 'html-react-parser'
import { Card } from 'react-materialize'

const DashProfile = ({avatar, first_name, podcasts}) => {
    return  <Card>
                <h3>{avatar}{first_name}</h3>
                <h4>My podcasts:</h4>
                <ul>
                    {podcasts.map(podcast => {
                        return <li key={podcast.id}>{Parser(podcast.title)}</li>
                    })}
            </ul>
            <h4>My comments:</h4>
                    comments here
            </Card>
}

export default DashProfile