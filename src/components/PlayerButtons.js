import React, { Component } from 'react'
import { Row, Col, Icon } from 'react-materialize'



class PlayerButtons extends Component {
    constructor() {
        super()

        this.state = {width: ''}
    }
    renderPlayPause(){
        return this.props.playing ? 'pause' : 'play_arrow'
    }
    backTen = () => {
        this.props.seek(-10)
    }
    backThirty = () => {
        this.props.seek(-30)
    }
    forwardTen = () => {
        this.props.seek(10)
    }
    forwardThirty = () => {
        this.props.seek(30)
    }
    componentWillMount(){
        // Set the state to true if the screen width is larger than 800px
        const mediaQuery = window.matchMedia("(min-width: 800px)").matches
        this.setState({width: mediaQuery})
    }
    renderButtons = () => {
        // render large icons on the buttons if it is a full-sized screen
        return this.state.width ? "large" : "medium"
    }

    render(){
        return <div>
                    <Row>
                        <Col s={1}></Col>
                        <Col s={2}>
                            <div onClick={this.backTen} className="player-btn">
                                <i className={`material-icons ${this.renderButtons()}`}>replay_10</i>
                            </div>
                        </Col>
                        <Col s={2}>
                            <div onClick={this.backThirty} className="player-btn">
                                <i className={`material-icons ${this.renderButtons()}`}>replay_30</i>
                            </div>
                        </Col>
                        <Col s={2}>
                            <div onClick={this.props.togglePlay} className="player-btn">
                                <i className={`material-icons large`}>{`${this.renderPlayPause()}`}</i>
                            </div>
                        </Col>
                        <Col s={2}>
                            <div onClick={this.forwardTen} className="player-btn">
                                <i className={`material-icons ${this.renderButtons()}`}>forward_10</i>
                            </div>
                        </Col>
                        <Col s={2}>
                            <div onClick={this.forwardThirty} className="player-btn">
                                <i className={`material-icons ${this.renderButtons()}`}>forward_30</i>
                            </div>
                        </Col>
                        <Col s={1}></Col>
                     </Row>
                </div>
    }
}

export default PlayerButtons