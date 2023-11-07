import { Container } from "react-bootstrap"
import HomeContents from "../components/HomeContents"
import HomeCard from "../components/HomeCard"


const Home = () => {
    return (
        <Container>
            
            <HomeCard />
            <HomeContents />
        </Container>
    )
}

export default Home