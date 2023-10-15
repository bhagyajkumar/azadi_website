import { Container, Button } from "react-bootstrap"
import filterIcon from "../assets/filter.svg"

const SearchPage = ()=>{
    return(
        <Container>
            <div className="input-group">
                <input placeholder="Search.." className="form-control" type="text"/>
                <Button>Search</Button>
                <Button variant="warning"> <img alt="filter" src={filterIcon}></img> Filter</Button>
                
            </div>
        </Container>
    )
}

export default SearchPage