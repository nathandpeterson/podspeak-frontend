import React from 'react'
import { Chip } from 'react-materialize'
import CSSTransitionGroup from 'react-transition-group'

const formatUserInfo = (data) => {
    const { userInfo } = data
    const [ id, avatar , first_name, last_name ] = userInfo.split(',')
    return { id, avatar, first_name, last_name }
}

const renderText = (data) => {
    const userInfo = formatUserInfo(data)
    return   <div key={data.id} className='grey lighten-3 reaction-item text-card-style'>
                <p>{data.content}</p>
            <div className="card-chips">
                <Chip>{data.episode_timestamp}</Chip>
                <Chip>{userInfo.avatar} {userInfo.first_name}</Chip>
            </div>
            </div>
         
}

const Reactions = ({reactions }) => {
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