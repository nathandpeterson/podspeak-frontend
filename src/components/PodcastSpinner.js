import React from 'react'
import { Card, Preloader } from 'react-materialize'

const PodcastSpinner = () => {
    return <div className="center">
            <div className="spinner-card"> 
              <Preloader size='big'/>           
            </div>
        </div>
}

export default PodcastSpinner