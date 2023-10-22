import { useEffect, useState } from "react"
import { Card, Container } from "react-bootstrap"
import { firestore } from "../lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import PostCard from "../components/PostCard";
import { useModalStore } from "../lib/zustand"
import { Button } from "react-bootstrap";
import filterIcon from "../assets/filter.svg"

const Notes = () => {

    const [recentPosts, setRecentPosts] = useState([])
    const { openModal } = useModalStore();

    const fetchRecentPosts = async () => {
        getDocs(collection(firestore, "Notes"))
            .then((snap) => {
                const resp = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                setRecentPosts(resp)
                console.log(recentPosts);
            })

    }

    useEffect(
        () => {
            fetchRecentPosts()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []
    )
    return (
        <Container>

            <br />
            <div className="input-group">
                <input placeholder="Search.." className="form-control" type="text" />
                <Button>Search</Button>
                <Button variant="warning" onClick={
                    () => {
                        openModal("filter");
                    }
                }> <img alt="filter" src={filterIcon}></img> Filter</Button>

            </div>
            <br />

            <Card >
                <Card.Header>
                    <h3>Recent Uploads</h3>
                </Card.Header>
                <Card.Body>
                    {
                        recentPosts.map(
                            (item) => {
                                return (
                                    <>
                                        <PostCard
                                            SubjectName={item["SubjectName"]}
                                            title={item["TopicName"]}
                                            fileLocation={item["FileLocation"]}
                                            id={item["id"]}
                                        />
                                    </>
                                )
                            }
                        )
                    }
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Notes