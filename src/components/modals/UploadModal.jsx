import { ProgressBar } from "react-bootstrap"
import { useModalStore } from "../../lib/zustand"


const UploadModal = ()=>{

    const { uploadPercent} = useModalStore()

    return(
        <div>
            <h3>Uploading...</h3>
            <ProgressBar now={uploadPercent}/>
        </div>
    )
}

export default UploadModal