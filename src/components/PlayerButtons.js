import React, { Component } from 'react'
import { Row, Col, Button } from 'react-materialize'



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
                            <a onClick={this.backTen} className="btn-floating btn-large waves-effect waves-light green">
                                <i className="material-icons large">replay_10</i>
                            </a>
                        </Col>
                        <Col s={2}>
                            <a onClick={this.backThirty} className="btn-floating btn-large waves-effect waves-light green">
                                <i className="material-icons large">replay_30</i>
                            </a>
                        </Col>
                        <Col s={2}>
                            <a onClick={this.props.togglePlay} className="btn-floating btn-large waves-effect waves-light green">
                                <i className="material-icons large">{`${this.renderPlayPause()}`}</i>
                            </a>
                        </Col>
                        <Col s={2}>
                            <a onClick={this.forwardTen} className="btn-floating btn-large waves-effect waves-light green">
                                <i className="material-icons large">forward_10</i>
                            </a>
                        </Col>
                        <Col s={2}>
                            <a onClick={this.forwardThirty} className="btn-floating btn-large waves-effect waves-light green">
                                <i className="material-icons large">forward_30</i>
                            </a>
                        </Col>
                        <Col s={1}></Col>
                     </Row>
                </div>
    }
}

export default PlayerButtons