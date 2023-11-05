import { useEffect, useState } from "react"
import { Badge, Card, CloseButton, Container } from "react-bootstrap"
import { firestore } from "../lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import PostCard from "../components/PostCard";
import { useModalStore } from "../lib/zustand"
import { Button } from "react-bootstrap";
import filterIcon from "../assets/filter.svg"

const QuestionPapers = () => {

    const [recentPosts, setRecentPosts] = useState([])
    const [filteredQuestionPapers, setFilteredQuestionPapers] = useState([])
    const { openModal, filterSubject, setFilterSubject } = useModalStore();

    const fetchRecentPosts = async () => {
        getDocs(collection(firestore, "QuestionPapers"))
            .then((snap) => {
                const resp = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                setRecentPosts(resp)
                console.log(recentPosts);
            })

    }

    useEffect(() => {
        let temp = []
        console.log(recentPosts);
        recentPosts.forEach((item) => {
            console.log(item);
            if (item.SubjectName === filterSubject) {
                temp = [...temp, item]
            }
        })

        if (filterSubject === null) {
            setFilteredQuestionPapers([...recentPosts])
        } else {
            setFilteredQuestionPapers([...temp])
        }
    }, [filterSubject, recentPosts])


    useEffect(
        () => {
            fetchRecentPosts()
            setFilteredQuestionPapers([...recentPosts])
            console.log(filteredQuestionPapers);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []
    )

    return (
        <Container>
            <br />
            <div>

            </div>
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
            {
                filterSubject !== null &&
                <>
                    Applied filters:
                    <Badge className="badge-primary"> {filterSubject} <CloseButton onClick={
                        () => {
                            setFilterSubject(null)
                        }
                    } /></Badge>
                    <br />
                    <br />
                </>

            }

            <Card >
                <Card.Header>
                    <h3>QuestionPapers</h3>
                </Card.Header>
                <Card.Body>
                    {
                        filteredQuestionPapers.map(
                            (item) => {
                                return (
                                    <PostCard
                                        key={item.id}
                                        SubjectName={item["SubjectName"]}
                                        title={item["TopicName"]}
                                        fileLocation={item["FileLocation"]}
                                        id={item["id"]}
                                    />
                                )
                            }
                        )
                    }
                </Card.Body>
            </Card>
        </Container>
    )
}

export default QuestionPapers