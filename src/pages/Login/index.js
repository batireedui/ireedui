import React, { useContext, useState } from 'react'
import { MyContext } from '../../context/MyContext'
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
const Login = () => {
    //const { loginUser, isLoggedIn } = useContext(MyContext);
    const [phone, setphone] = useState("");
    const [password, setpassword] = useState("")
    const [err, setrr] = useState("")
    const state = useContext(MyContext);
    const submitForm = async (event) => {
        event.preventDefault();
        state.loginUser(phone, password);
    }

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" value={phone} onChange={e => setphone(e.target.value)} required />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setpassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Text>{err}</Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={submitForm}>
                            Submit
                        </Button>
                    </Form></Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default Login;