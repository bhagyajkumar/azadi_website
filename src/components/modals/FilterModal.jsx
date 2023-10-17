import { useEffect, useState } from "react"
import { firestore } from "../../lib/firebase"
import { collection, getDocs, query } from "firebase/firestore";
import { Button, Dropdown, DropdownButton, InputGroup } from "react-bootstrap";

import { useModalStore } from "../../lib/zustand";

const FilterModal = () => {

    const [branches, setBranches] = useState([]);
    const [currentSemester, setCurrentSemester] = useState(null);
    const [currentBranch, setCurrentBranch] = useState(null);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const { currentModal, setFilterSubject, closeModal } = useModalStore()

    useEffect(() => {
        getDocs(collection(firestore, "branches"))
            .then((snap) => {
                const resp = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                setBranches([...resp])
                console.log(branches);
            })
    }, [currentModal])

    useEffect(() => {
        console.log(currentBranch);
        if (currentBranch && currentSemester) {
            setSubjects(currentBranch.subjects[currentSemester])
        }
        console.log(subjects);
    }, [currentBranch, currentSemester])

    const fetchSubjects = () => {
        setSubjects(currentBranch.subjects[currentSemester])
    }

    return (
        <div>
            <InputGroup>
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

            </InputGroup>
            <br />
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="subject-dropdown">
                    {currentSubject || "Select Subject"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        subjects.map(
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
            <Button onClick={
                ()=>{
                    setFilterSubject(currentSubject);
                    closeModal();
                }
            } disabled={ currentSubject === null } variant="primary">Apply Filter</Button>    
        </div>
    )
}

export default FilterModal