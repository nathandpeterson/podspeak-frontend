import React from 'react'
import { Card, Preloader } from 'react-materialize'

const PodcastSpinner = () => {
    return <Card class="pod-card"> 
        <div className="center">
            <Preloader size='big'/>
        </div>
        </Card>
}

export default PodcastSpinner