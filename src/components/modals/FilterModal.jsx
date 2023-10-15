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
    const [subjects, setSubjects] = useState([{ name: "test" }, { name: "test2" }]);
    const { currentModal } = useModalStore()

    useEffect(() => {
        getDocs(collection(firestore, "branches"))
            .then((snap) => {
                const resp = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                setBranches([...resp])
                console.log(branches);
            })
    }, [currentModal])

    const fetchSubjects = () => {
        getDocs(query(collection(firestore, "subjects")))
            .then(
                (snap) => {
                    const resp = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                    setSubjects([...resp])
                    console.log(subjects);
                }
            )
    }

    return (
        <div>
            <InputGroup>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="branch-dropdown">
                        {currentBranch?.short || "Select Branch"}
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
                                        }>{item.short}</Dropdown.Item>
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
                            [1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
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
                <Button disabled={currentSemester === null || currentBranch === null} variant="success" onClick={fetchSubjects}>Fetch Subjects</Button>
            </InputGroup>
            <br />

            {subjects.map(
                (sub) => {
                    {
                        <>sub.name</>
                    }
                }
            )}

            <Dropdown>
                <Dropdown.Toggle variant="primary" id="subject-dropdown">
                    {currentSubject || "Select Subject"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        subjects.map(
                            (sub) => {
                                return (
                                    <Dropdown.Item>
                                        {sub.name}
                                    </Dropdown.Item>
                                )
                            }
                        )
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default FilterModal