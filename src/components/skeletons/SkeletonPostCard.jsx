import {  Card, Row, Col } from "react-bootstrap"
import Skeleton from "react-loading-skeleton";

const SkeletonPostCard = () => {
    return (
        <Card className="border-info">
            <Card.Header>
                <Skeleton />
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col style={{ flex: 0 }}>
                        <Skeleton circle width={70} height={70}/>
                    </Col>
                    <Col style={{ paddingLeft: "0%", flex: 1 }}>
                        <h3>
                            <Skeleton />
                        </h3>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>
                        <Skeleton />
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export default SkeletonPostCard