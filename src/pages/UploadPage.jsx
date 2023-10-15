import { useState } from "react";
import { Button, Container } from "react-bootstrap"
import { storage, firestore } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore"; 
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
    const [subject, setSubject] = useState("");
    const [year, setYear] = useState(1);
    const [file, setFile] = useState("");
    const [keyWords, setKeyWords] = useState([])
    const [branch, setBranch] = useState("CSE")

    const { setUploadPercent, closeModal, openModal } = useModalStore()

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

                    <label for="branch-select">Select Branch</label>

                    <select onChange={(e) => {
                        setBranch(e.target.value)
                    }} class="form-control" id="branch-select">
                        <option>CSE</option>
                        <option>IT</option>
                        <option>ECE</option>
                        <option>MECH</option>
                        <option>CIVIL</option>
                        <option>EEE</option>
                    </select>
                    <br />

                    <input onChange={(e)=>{
                        setSubject(e.target.value)
                    }} placeholder="subject" className="form-control" value={subject}></input>

                    <br />
                    <label for="exampleFormControlSelect1">Select Year</label>

                    <select onChange={(e) => {
                        setYear(e.target.value)
                    }} class="form-control" id="year-select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                    <br />
                    <input type="file" accept="*.pdf" onChange={(e) => {
                        setFile(e.target.files[0])
                    }} />
                    <br />
                    <br />
                    <input onChange={(e)=>{
                        setKeyWords(e.target.value.split(" "))
                    }} className="form-control" placeholder="keywords"></input>
                    <br />
                    <Button onClick={()=>{
                        
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
                                        title: title,
                                        keywords: [...keyWords],
                                        file_location: fileLoc,
                                        year: year,
                                        uploaded_on: uploadTimeStamp,
                                        subject: subject,
                                        branch: branch,
                                        user_id: auth.currentUser.uid
                                      }
                                    console.log(doc);
                                    addDoc(collection(firestore, "question_papers"), doc)
                                      .then((val)=>{
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