import { Card, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

const HomeContents = () => {
    const navigate = useNavigate()
    return (
        <>
        <br />
            <Card>
                <Card.Header>
                    <h1>Notes</h1>
                </Card.Header>
                <Card.Body>
                    <Link to="/notes" className="btn btn-primary">Browse Notes</Link>
                    <Button variant="secondary" className="mx-2">Contribute</Button>
                </Card.Body>
            </Card>
            <br />
            <Card>
                <Card.Header>
                    <h1>Question Papers</h1>
                </Card.Header>
                <Card.Body>
                    <Button>Browse Question Papers</Button>
                    <Button variant="secondary" className="mx-2">Contribute</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default HomeContents