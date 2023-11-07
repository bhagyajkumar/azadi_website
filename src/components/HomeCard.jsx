import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import HandLogo from "../assets/hand.png"
import Azlogo from "../assets/logo2.png"

function HomeCard() {
  return (
        <Card>
            <Card.Body>
                <Row style={{marginTop: "60px", marginBottom: "60px"}}>
                    <Col className='sm-hidden'> 
                        <img alt= "logo" style={{width: "380px", maxWidth: "80vw"}} src={HandLogo}></img>
                    </Col>
                    <Col style={{minWidth: "50px"}}>
                        <img alt='logo2' src={Azlogo} style={{width: "380px", maxWidth: "80vw"}}></img>
                        <p style={{fontWeight: 400, fontSize: "19px"}}>
                        At AAZADI CUCEK, we are committed to providing comprehensive academic support, fostering competitive exam preparation, offering invaluable placement assistance, and guiding you through the intricate process of pursuing education abroad. Our dedicated team, backed by the esteemed SFI CUCEK community, aims to empower and equip you with the tools you need to excel in your educational journey.

With a passion for learning and a drive for success, AAZADI CUCEK is here to accompany you every step of the way. Whether you're seeking guidance for exams, aiming to secure your dream job, or exploring opportunities for international education, we are your partners in progress. Join us and embark on a transformative educational experience.

Your success story begins with AAZADI CUCEK – where knowledge meets opportunity.
                        </p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
  )
}

export default HomeCard 