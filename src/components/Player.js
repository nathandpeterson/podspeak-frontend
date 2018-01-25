import React, { Component } from 'react'
import { Row, Col, Icon, ProgressBar, Button } from 'react-materialize'

class Player extends Component {
    
    render(){
        return <div>
                    <Row>
                        <ProgressBar progress={25}/>
                    </Row>
                    <Row>
                        <Col s={1}></Col>
                        <Col s={2}>
                            <Button>
                                <Icon large>replay_10</Icon>
                            </Button>
                        </Col>
                        <Col s={2}>
                            <Button>
                                <Icon large>replay_30</Icon>
                            </Button>
                        </Col>
                        <Col s={2}>
                            <Button>
                                <Icon large>play_arrow</Icon>
                            </Button>
                        </Col>
                        <Col s={2}>
                            <Button>
                                <Icon large>forward_10</Icon>
                            </Button>
                        </Col>
                        <Col s={2}>
                            <Button>
                                <Icon >forward_30</Icon>
                            </Button>
                        </Col>
                        <Col s={1}></Col>
                     </Row>
                </div>
    }
}

export default Player