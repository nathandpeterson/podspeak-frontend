import React, { Component } from 'react'
import { Row, Col, CardPanel, Chip } from 'react-materialize'

const containerStyle = {
    display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'
}

const imageContainerStyle = {verticalAlign: 'center', display: 'inline-block', textAlign: 'center'}

const imageStyle = {maxHeight: '10rem',  boxShadow: '10px 10px 20px 0px rgba(0,0,0,0.36)' }

const textStyle = {
    backgroundColor: 'white', margin: '3%', borderRadius:'5%', padding: '2.5%',
    boxShadow: '10px 10px 20px 0px rgba(0,0,0,0.36)'
}

const emojiStyle = { backgroundColor: 'grey', borderRadius: '5%', padding: '2.5%', margin: '5%',
                    boxShadow: '10px 10px 20px 0px rgba(0,0,0,0.36)'}

const textCardStyle = {height: '100%', color:'black'}


class ReactionFeed extends Component {

    renderText = (data) => {
        return <CardPanel className='amber lighten-1' style={textCardStyle}>
                <Chip>Name</Chip>
                <div style={textStyle}><p>{data.content}</p></div>
                <Chip>{data.episode_timestamp}</Chip>
                </CardPanel>
    }

    renderEmoji = (data) => {
        return <CardPanel stye={imageContainerStyle} className="green" >
                    <Chip>Name</Chip>
                    <div style={emojiStyle}><span style={{fontSize: '3rem' }}>{data.content}</span></div>
                    <Chip>{data.episode_timestamp}</Chip>
                </CardPanel>
    }

    renderImage = (data) => {
        return <CardPanel style={imageContainerStyle} className="grey darken-1"  > 
        
                    <img style={imageStyle} src={data.content}/>
                    <span style={{display:'block'}}>
                        <Chip>Name</Chip>
                        <Chip>{data.episode_timestamp}</Chip>
                       
                    </span>
                </CardPanel>
    }

    render(){
        if(!this.props.reactions) return <div />
        const { reactions } = this.props
        return <Row>
        <Col s={1}></Col>
        <Col s={10}>
        <div className="center" style={containerStyle}>
                {reactions.map(reaction =>{
                    const { category, id, content } = reaction
                    if(category == 1) return this.renderText(reaction)
                    if(category == 2) return this.renderEmoji(reaction)
                    if(category == 3) return this.renderImage(reaction)
                        })
                    }
        </div>
        </Col>
        <Col s={1}></Col>
    </Row>
    }
}

export default ReactionFeed