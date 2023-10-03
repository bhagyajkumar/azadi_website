import { useState } from "react"
import { Button, Form, FormControl } from "react-bootstrap"
import { auth } from "../../lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useModalStore } from "../../lib/zustand"

const SigninModal = ()=>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {setCurrentUsername, closeModal} = useModalStore()
    return(
        <div>
            <Form>
                <FormControl onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" type="email" value={email} />
                <FormControl onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" type="password" value={password} />
                <Button onClick={()=>{
                    signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                      // Signed in 
                      const user = userCredential.user;
                      closeModal()
                      
                      // ...
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                    });
                  
                }}>Login</Button>
            </Form>
        </div>
    )
}

export default SigninModal