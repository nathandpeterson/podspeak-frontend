import React from 'react'
import { Card } from 'react-materialize'

const ReactionPlaceholder = ({ episode }) => {
    if(!episode) return <div />
    console.log('wtf', episode)
    return <div>
        <Card>
            <p> Nobody has left any comments...</p>
        </Card>
           
        </div>
}

export default ReactionPlaceholder