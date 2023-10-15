import { Modal } from "react-bootstrap"
import { useModalStore } from "../lib/zustand"
import SigninModal from "../components/modals/SigninModal"
import UploadModal from "./modals/UploadModal"
import FilterModal from "./modals/FilterModal"

const Modals = () => {
    const { currentModal, isModalVisible, closeModal } = useModalStore()
    
    return (
        <Modal show={isModalVisible} onHide={()=>closeModal()}>
            <Modal.Header closeButton>
                <Modal.Title>{ currentModal }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    currentModal === "" ? "Nothing much going on the modal" :
                    currentModal === "login" ? <SigninModal /> : 
                    currentModal === "upload" ? <UploadModal /> : 
                    currentModal === "filter" ? <FilterModal /> : ""
                }

            </Modal.Body>
        </Modal>
    )
}

export default Modals