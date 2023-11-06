import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Notifications from "./Notifications"

const HomeContents = () => {

    const newsArticles = [
        {
            imageUrl: 'https://placehold.co/600x400/EEE/31343C',
            title: 'Article 1',
            subtitle: 'This is the subtitle for article 1',
            description: 'This is a short description of article 1.',
            url: 'https://example.com/news/article-1',
        },
        {
            imageUrl: 'https://placehold.co/600x400/EEE/31343C',
            title: 'Article 2',
            subtitle: 'This is the subtitle for article 2',
            description: 'This is a short description of article 2.',
            url: 'https://example.com/news/article-2',
        },
        {
            imageUrl: 'https://placehold.co/600x400/EEE/31343C',
            title: 'Article 3',
            subtitle: 'This is the subtitle for article 3',
            description: 'This is a short description of article 3.',
            url: 'https://example.com/news/article-3',
        },
    ];
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
                    <Link to="/qp" className="btn btn-primary my-3 mx-1">Browse Question Papers</Link>
                    <Link to="/qp/upload" className="btn btn-secondary mx-1">Contribute Question Papers</Link>
                </Card.Body>
            </Card>
            <br />
            <Card>
                <Card.Header><h1>Notifications</h1></Card.Header>
                <Card.Body>
                    <Notifications news={newsArticles} />
                </Card.Body>
            </Card>
        </>
    )
}

export default HomeContents