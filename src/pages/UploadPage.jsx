import { useEffect, useState } from "react";
import { Button, Container, Dropdown } from "react-bootstrap"
import { storage, firestore } from "../lib/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Timestamp } from "@firebase/firestore";
import { auth } from "../lib/firebase";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import { Card } from "react-bootstrap"
import { v4 as uuidv4 } from 'uuid';
import { useModalStore } from "../lib/zustand";

const UploadPage = () => {

    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [keyWords, setKeyWords] = useState([])
    const [currentBranch, setCurrentBranch] = useState();
    const [branches, setBranches] = useState([]);
    const [currentSemester, setCurrentSemester] = useState(null);
    const [currentSubject, setCurrentSubject] = useState(null)
    const { setUploadPercent, closeModal, openModal } = useModalStore()


    useEffect(
        () => {
            getDocs(collection(firestore, "branches"))
                .then((snap) => {
                    const resp = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                    setBranches([...resp])
                    console.log(branches);
                })
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return (
        <Container>
            <Card>
                <Card.Header>
                    <h1>Upload Material</h1>
                </Card.Header>
                <Card.Body>
                    <input onChange={(e) => {
                        setTitle(e.target.value)
                    }} placeholder="title" className="form-control" value={title}></input>
                    <br />

                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="branch-dropdown">
                            {currentBranch?.id || "Select Branch"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                branches.map((item) => {
                                    return (
                                        <>
                                            <Dropdown.Item onClick={
                                                () => {
                                                    setCurrentBranch(item);
                                                }
                                            }>{item.id}</Dropdown.Item>
                                        </>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <br />

                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="semester-dropdown">
                            {currentSemester || "Select Semester"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {

                                currentBranch &&

                                Object.keys(currentBranch.subjects).map((sem) => {
                                    return (
                                        <Dropdown.Item key={sem} onClick={
                                            () => {
                                                setCurrentSemester(sem)
                                            }
                                        }>{sem}</Dropdown.Item>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <br />

                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="subject-dropdown">
                            {currentSubject || "Select Subject"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                currentBranch?.subjects[currentSemester]?.map(
                                    (sub) => {
                                        return (
                                            <Dropdown.Item onClick={
                                                () => setCurrentSubject(sub)
                                            }>
                                                {sub}
                                            </Dropdown.Item>
                                        )
                                    }
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>

                    <br />

                    <input type="file" accept="*.pdf" onChange={(e) => {
                        setFile(e.target.files[0])
                    }} />
                    <br />
                    <br />
                    <input onChange={(e) => {
                        setKeyWords(e.target.value.split(" "))
                    }} className="form-control" placeholder="keywords"></input>
                    <br />
                    <Button onClick={() => {

                        const fileId = uuidv4()
                        const fileLoc = `/question_papers/${fileId}`

                        const storageRef = ref(storage, fileLoc)
                        const uploadTask = uploadBytesResumable(storageRef, file);
                        let uploadTimeStamp = Timestamp.fromDate(new Date());

                        uploadTask.on(
                            "state_changed",
                            (snapshot) => {
                                openModal("upload");

                                const percent = Math.round(
                                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                );

                                setUploadPercent(percent)

                                console.log(percent);
                            },
                            (err) => console.log(err),
                            () => {
                                // download url
                                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                                    const doc = {
                                        TopicName: title,
                                        Keywords: [...keyWords],
                                        FileLocation: fileLoc,
                                        Semester: currentSemester,
                                        uploaded_on: uploadTimeStamp,
                                        SubjectName: currentSubject,
                                        BranchName: currentBranch.id,
                                        UserId: auth.currentUser.uid
                                    }
                                    console.log(doc);
                                    addDoc(collection(firestore, "Notes"), doc)
                                        .then((val) => {
                                            closeModal();
                                            alert("The material was successfully uploaded..")
                                        })
                                });
                            }
                        );
                    }}>Upload</Button>
                </Card.Body>
            </Card>


        </Container>
    )
}

export default UploadPage