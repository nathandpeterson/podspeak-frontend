import React from 'react'
import { Row, Col, Button, Icon } from 'react-materialize'

const ReactionButtons = () => {
    return <Row>
                <Col s={1}></Col>
                <Col s={2}>
                    <Button waves="light" className="pink" >
                        <Icon>insert_comment</Icon>
                    </Button>
                </Col>
                <Col s={2}>
                    <Button className="pink">
                        <Icon large>face</Icon>
                    </Button>
                </Col>
                <Col s={2}>
                    <Button className="pink">
                        <Icon large>insert_link</Icon>
                    </Button>
                </Col>
                <Col s={2}>
                    <Button className="pink" >
                        <Icon large>photo</Icon>
                    </Button>
                </Col>
                <Col s={1}> </Col>
            </Row>
}

export default ReactionButtons