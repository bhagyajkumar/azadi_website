import { useState } from "react";
import { Button, Container } from "react-bootstrap"
import { storage, firestore } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore"; 
import { Timestamp } from "@firebase/firestore";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL 
} from "firebase/storage";
import { Card } from "react-bootstrap"
import { v4 as uuidv4 } from 'uuid';

const UploadPage = () => {

    const [title, setTitle] = useState("");
    const [year, setYear] = useState(1);
    const [file, setFile] = useState("");
    const [keyWords, setKeyWords] = useState([])

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
                                const percent = Math.round(
                                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                );
                     
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
                                        uploaded_on: uploadTimeStamp
                                      }
                                    console.log(doc);
                                    addDoc(collection(firestore, "question_papers"), doc)
                                      .then((val)=>{
                                        console.log(val);
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