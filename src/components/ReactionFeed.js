import React, { Component } from 'react'
import { Row, Col, CardPanel, Chip } from 'react-materialize'

const styles = {
    display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'
}

class ReactionFeed extends Component {

    renderText = (data) => {
        return <CardPanel className='amber lighten-1' style={{height: '100%', color:'teal'}}>
                {data.episode_timestamp}    
               <p>{data.content}</p>
                <Chip>Name</Chip>
                </CardPanel>
    }

    renderEmoji = (data) => {
        return <CardPanel className="indigo" style={{minHeight: '10rem'}}>
                    <h1 style={{fontSize: '4rem' }}>{data.content}</h1>
                    {data.episode_timestamp}
                    <Chip>Name</Chip>
                </CardPanel>
    }

    renderImage = (data) => {
        return <CardPanel className="grey darken-1"  > 
                    <img style={{maxHeight: '10rem' }} src={data.content}/>
                    {data.episode_timestamp}
                    <Chip>Name</Chip>
                </CardPanel>
    }


    render(){
        if(!this.props.reactions) return <div />
        const { reactions } = this.props
        console.log(reactions)
        return <Row>
        <Col s={1}></Col>
        <Col s={10}>
        <div className="center" style={styles}>
                {reactions.map(reaction =>{
                    const { category, id, content } = reaction
                    if(category == 1) return this.renderText(reaction)
                    if(category == 2) return this.renderEmoji(reaction)
                    if(category == 3) return this.renderImage(reaction)
                    return <Col
                                key={id}>
                            <CardPanel>
                            <p>{content}</p>
                            <Chip> <span role="img" aria-label="emoji">🦁</span> Nathan</Chip>
                            </CardPanel>
                            </Col>
                        })
                    }
        </div>
        </Col>
        <Col s={1}></Col>
    </Row>
    }
}

export default ReactionFeed