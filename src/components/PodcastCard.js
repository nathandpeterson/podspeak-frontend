import React from 'react'
import Parser from 'html-react-parser'
import { Card, CardTitle, Button } from 'react-materialize'
import '../styles/Podcast.css'

const PodcastCard = ({ podcast, episodeButtonHandler, episodeButton }) => {
    const { id, title, description, image_URL } = podcast
    return <div key={id} className="pod-card-container"> 
                <Card       className="pod-card"
                            header={<CardTitle 
                            reveal 
                            image={image_URL} 
                            waves='light'/>}
                            title={Parser(title)}
                    reveal={<p>{Parser(description)}</p>}>
                 {episodeButton &&  <Button className="blue" id={`${id}`} 
                            onClick={episodeButtonHandler}>
                        EPISODES
                    </Button>}
                </Card>
    </div>
}

export default PodcastCard