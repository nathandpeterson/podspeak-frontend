import React from 'react'
import { Chip } from 'react-materialize'

const renderText = (data) => {
    return   <div key={data.id} className='grey lighten-3 reaction-item text-card-style animated fadeIn'>
                <p>{data.content}</p>
            <div className="card-chips">
                <Chip>{data.episode_timestamp}</Chip>
                <Chip>{data.avatar} {data.first_name}</Chip>
            </div>
            </div>

}

const Reactions = ({ reactions }) => {
    return <div className="reaction-feed-container">
                <div className="reaction-feed">
                        {reactions.map(reaction => {
                            return renderText(reaction)
                                })
                            }
                    </div>
                </div>
}

export default Reactions
