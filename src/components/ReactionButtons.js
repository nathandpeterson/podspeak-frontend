import React from 'react'
import { Row, Col, Button, Icon } from 'react-materialize'

const ReactionButtons = () => {
    return <Row>
                <Col s={1}></Col>
                <Col s={2}>
                    <Button waves="light" className="pink reaction-btn" >
                        <Icon>insert_comment</Icon>
                    </Button>
                </Col>
                <Col s={2}>
                    <Button className="pink reaction-btn">
                        <Icon large>face</Icon>
                    </Button>
                </Col>
                <Col s={2}>
                    <Button className="pink reaction-btn">
                        <Icon large>insert_link</Icon>
                    </Button>
                </Col>
                <Col s={2}>
                    <Button className="pink reaction-btn" >
                        <Icon large>photo</Icon>
                    </Button>
                </Col>
                <Col s={2}>
                    <Button className="pink reaction-btn" >
                        <Icon large>volume_off</Icon>
                    </Button>
                </Col>
                <Col s={1}> </Col>
            </Row>
}

export default ReactionButtons