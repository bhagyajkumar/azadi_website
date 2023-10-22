import { Card, Button } from "react-bootstrap"


const HomeContents = () => {

    return (
        <>
        <br />
            <Card>
                <Card.Header>
                    <h1>Notes</h1>
                </Card.Header>
                <Card.Body>
                    <Button>Browse Notes</Button>
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