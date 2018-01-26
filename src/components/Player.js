import React, { Component } from 'react'
import { Row, Col, Icon, ProgressBar, Button } from 'react-materialize'

class Player extends Component {
    
    render(){
        return <div>
                    <Row>
                        <Col s={1}></Col>
                        <Col s={10}>
                            <ProgressBar progress={25}/>
                        </Col>
                        <Col s={1}></Col>
                    </Row>
                    <Row>
                        <Col s={1}></Col>
                        <Col s={2}>
                            <Button className="player-btn">
                                <Icon large>replay_10</Icon>
                            </Button>
                        </Col>
                        <Col s={2}>
                            <Button className="player-btn">
                                <Icon large>replay_30</Icon>
                            </Button>
                        </Col>
                        <Col s={2}>
                            <Button className="player-btn">
                                <Icon large>play_arrow</Icon>
                            </Button>
                        </Col>
                        <Col s={2}>
                            <Button className="player-btn">
                                <Icon large>forward_10</Icon>
                            </Button>
                        </Col>
                        <Col s={2}>
                            <Button className="player-btn">
                                <Icon >forward_30</Icon>
                            </Button>
                        </Col>
                        <Col s={1}></Col>
                     </Row>
                </div>
    }
}

export default Player