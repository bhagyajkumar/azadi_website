import {  Card, Row, Col, Button } from "react-bootstrap"
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase"

const PostCard = ({ SubjectName, title, fileLocation, id }) => {
    return (
        <Card className="border-info">
            <Card.Header>
                <h3>{SubjectName}</h3>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col style={{ flex: 0 }}>
                        <img alt="test" width={50} src="https://png.pngtree.com/png-clipart/20220612/original/pngtree-pdf-file-icon-png-png-image_7965915.png"></img>
                    </Col>
                    <Col style={{ paddingLeft: "0%", flex: 1 }}>
                        <h3>
                            {title}
                        </h3>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>
                        <Button onClick={() => {
                            getDownloadURL(ref(storage, fileLocation || `${id}.pdf`)).then(
                                (url) => {
                                    window.open(url, "_blank")
                                }
                            )

                        }}>Download</Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export default PostCard