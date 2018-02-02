import React from 'react'
import { Card } from 'react-materialize'

const ReactionPlaceholder = ({ episode }) => {
    if(!episode) return <div />
    return <div>
        <Card>
            <p> Nobody has left any comments...</p>
        </Card>
           
        </div>
}

export default ReactionPlaceholder