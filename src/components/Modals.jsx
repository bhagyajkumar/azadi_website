import { Modal } from "react-bootstrap"
import { useModalStore } from "../lib/zustand"
import SigninModal from "../components/modals/SigninModal"

const Modals = () => {
    const { currentModal, isModalVisible, closeModal } = useModalStore()
    
    return (
        <Modal show={isModalVisible} onHide={()=>closeModal()}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    currentModal === "" ? "Nothing much going on the modal" :
                    currentModal === "login" ? <SigninModal /> : ""
                }

            </Modal.Body>
        </Modal>
    )
}

export default Modals