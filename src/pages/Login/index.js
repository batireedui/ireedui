import React, { useContext, useState } from 'react'
import { MyContext } from '../../context/MyContext'
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import Switch from "react-switch";
const Login = () => {
    //const { loginUser, isLoggedIn } = useContext(MyContext);
    const [phone, setphone] = useState("");
    const [password, setpassword] = useState("")
    const [teach, setteach] = useState(false)
    const state = useContext(MyContext);
    const submitForm = async (event) => {
        event.preventDefault();
        state.loginUser(phone, password);
    }

    const check = () => {
        setteach(teach => !teach);
    }
    console.log(teach);
    return (
        <Container fluid="md">
            <Row  style={{ marginTop: 30}}>
                <Col></Col>
                <Col>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Form>
                            <Form.Group className="mb-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Form.Label style={{ paddingRight: 15 }}>Багш/Сургалтын алба</Form.Label>
                                <Switch onChange={() => check()} checked={teach} checkedIcon={false} uncheckedIcon={false} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Утасны дугаар</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" value={phone} onChange={e => setphone(e.target.value)} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Нууц үг</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setpassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Text style={{ color: '#d60003' }}>{state.msg}</Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={submitForm}>
                                Нэвтрэх
                            </Button>
                        </Form>
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default Login;