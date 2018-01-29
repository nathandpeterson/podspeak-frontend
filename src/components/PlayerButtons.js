import React, { Component } from 'react'
import { Row, Col, Icon } from 'react-materialize'



class PlayerButtons extends Component {
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
    render(){
        return <div>
                    <Row>
                        <Col s={1}></Col>
                        <Col s={2}>
                            <div onClick={this.backTen} className="player-btn">
                                <Icon large>replay_10</Icon>
                            </div>
                        </Col>
                        <Col s={2}>
                            <div onClick={this.backThirty} className="player-btn">
                                <Icon large>replay_30</Icon>
                            </div>
                        </Col>
                        <Col s={2}>
                            <div onClick={this.props.togglePlay} className="player-btn">
                                <Icon large>{`${this.renderPlayPause()}`}</Icon>
                            </div>
                        </Col>
                        <Col s={2}>
                            <div onClick={this.forwardTen} className="player-btn">
                                <Icon large>forward_10</Icon>
                            </div>
                        </Col>
                        <Col s={2}>
                            <div onClick={this.forwardThirty} className="player-btn">
                                <Icon large>forward_30</Icon>
                            </div>
                        </Col>
                        <Col s={1}></Col>
                     </Row>
                </div>
    }
}

export default PlayerButtons