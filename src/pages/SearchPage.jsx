import { Container, Button } from "react-bootstrap"
import filterIcon from "../assets/filter.svg"
import { useModalStore } from "../lib/zustand"


const SearchPage = ()=>{

    const { openModal, filterSubject } = useModalStore();

    return(
        <Container>
            <div className="input-group">
                <input placeholder="Search.." className="form-control" type="text"/>
                <Button>Search</Button>
                <Button variant="warning" onClick={
                    ()=>{
                        openModal("filter");
                    }
                }> <img alt="filter" src={filterIcon}></img> Filter</Button>
                
            </div>

            { filterSubject }
        </Container>
    )
}

export default SearchPage