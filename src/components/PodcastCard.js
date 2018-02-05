import React from 'react'
import Parser from 'html-react-parser'
import { Card, CardTitle, Button } from 'react-materialize'
import '../styles/Podcast.css'

const PodcastCard = ({ podcast, episodeButtonHandler, episodeButton }) => {

    const { id, title, description, image_URL } = podcast
    const backup_image = 'https://images.unsplash.com/photo-1505740106531-4243f3831c78?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0625118b738e3d3e2e7c4f2f4065ff19&auto=format&fit=crop&w=1050&q=80'
    return <div key={id} className="pod-card-container"> 
                <Card       className="pod-card"
                            header={<CardTitle 
                            reveal 
                            image={image_URL || backup_image} 
                            waves='light'/>}
                            title={Parser(title)}
                            reveal={<p>{Parser(description)}</p>}>
                 {episodeButton &&  
                 <Button    className="blue" id={`${id}`} 
                            onClick={episodeButtonHandler}> EPISODES
                </Button>}
                </Card>
    </div>
}

export default PodcastCard