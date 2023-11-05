import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const HomeContents = () => {
    return (
        <>
        <br />
            <Card>
                <Card.Header>
                    <h1>Notes</h1>
                </Card.Header>
                <Card.Body>
                    <Link to="/notes" className="btn btn-primary">Browse Notes</Link>
                    <Link to="/notes/upload" className="btn btn-secondary mx-2">Contribute Notes</Link>
                </Card.Body>
            </Card>
            <br />
            <Card>
                <Card.Header>
                    <h1>Question Papers</h1>
                </Card.Header>
                <Card.Body>
                <Link to="/qp" className="btn btn-primary">Browse Question Papers</Link>
                    <Link to="/qp/upload" className="btn btn-secondary mx-2">Contribute Question Papers</Link>
                </Card.Body>
            </Card>
        </>
    )
}

export default HomeContents