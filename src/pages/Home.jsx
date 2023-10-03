import { useEffect, useState } from "react"
import { Alert, Badge, Card, Container, Row, Col, Button } from "react-bootstrap"
import { firestore, storage } from "../lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { getStorage, ref, getDownloadURL } from "firebase/storage";


const Home = () => {

    const [recentPosts, setRecentPosts] = useState([{ "College Name": "sdnfsdfkskdjfh" }])

    const fetchRecentPosts = async () => {
        getDocs(collection(firestore, "Question Papers"))
            .then((snap) => {
                const resp = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                setRecentPosts(resp)
                console.log(recentPosts);
            })
    }

    useEffect(
        () => {
            fetchRecentPosts()
        }, []
    )

    const getDownloadLink = (id)=>{
        return getDownloadURL(ref(storage, `${id}.pdf`)).then(
            (val)=>{
                return val
            }
        )
    }

    return (
        <Container>
            <Alert className="text-light" variant="success">
                <h1>Aazadi CUCEK</h1>
            </Alert>

            <Card>
                <Card.Header>
                    <h3>Recent Uploads</h3>
                </Card.Header>
                <Card.Body>
                    <hr />
                    {
                        recentPosts.map(
                            (item) => {
                                return (
                                    <Card>
                                        <Card.Header>
                                            <h3>{item["College Name"]}</h3><br />
                                            {
                                                item["Keywords"]?.map((keyword) => {
                                                    return (
                                                        <Badge className="mx-1">{keyword}</Badge>
                                                    )
                                                })
                                            }
                                        </Card.Header>
                                        <Card.Body>
                                            <Row>
                                                <Col style={{ flex: 0 }}>
                                                    <img width={50} src="https://png.pngtree.com/png-clipart/20220612/original/pngtree-pdf-file-icon-png-png-image_7965915.png"></img>
                                                </Col>
                                                <Col style={{ paddingLeft: "0%", flex: 1 }}>
                                                    <h3>
                                                        {item["Subject Name"]}
                                                    </h3>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Row>
                                                <Col>
                                                    <a className="btn btn-primary" href={""} target="_blank" rel="noopener noreferrer">Download</a>
                                                </Col>
                                            </Row>
                                        </Card.Footer>
                                    </Card>)
                            }
                        )
                    }
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Home