import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from "../../axios-url";
import ModalDelete from "../../components/ModalDelete";
import Spinner from "../../components/Spinner";
const TeacherLesson = props => {
    const [irc, setirc] = useState([]);
    const [load, setLoad] = useState(false);
    const [addload, setAddLoad] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [addner, setaddner] = useState("");
    const [addcag, setaddcag] = useState(0);
    const [addnertext, setaddnertext] = useState("");
    const [text, setText] = useState("");
    const [textid, setTextid] = useState("");

    useEffect(() => {
        setLoad(true);
        axios.post("/teacherlesson.php", {
            "tid": 1,
        })
            .then(data => { setirc(data.data); setLoad(false); })
            .catch(err => { console.log(err); setLoad(false); });
        return () => {

        }
    }, [addload]);
    let aa = 1;
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    const sendlesson = () => {
        if (addner.trim().length < 1)
            setaddnertext("Хичээлийн нэрийг оруулна уу");
        else {
            axios.post("/teacherlessonadd.php", {
                "tid": 1,
                "lname": addner
            })
                .then(data => {
                    setAddLoad(addload => !addload);
                    setModalShow(false);
                    setaddnertext("");
                    setaddner("");
                })
                .catch(err => { console.log(err); setLoad(false); });
        }

    }
    
    const deletelesson = () => {
        axios.post("/deletetlesson.php", {
            "lid": textid,
        })
            .then(data => {
                console.log(data.data);
                setAddLoad(addload => !addload);
                setModalDelete(false);
            })
            .catch(err => { console.log(err); });
    }
    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: 10 }}>
                <Button variant="primary" onClick={handleShow}>
                    Хичээл нэмэх
                </Button>

                <ModalDelete 
                    show={modalDelete} 
                    onHide={() => setModalDelete(false)} 
                    onClick = {deletelesson}
                    text = {text} 
                    textid = {textid}/>

                <Modal show={modalShow} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Заадаг хичээл нэмэх</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Хичээлийн нэр</Form.Label>
                                <Form.Control type="input" placeholder="Монгол хэл" value={addner} onChange={(e) => setaddner(e.target.value)} required />
                                <Form.Text style={{ color: "red", padding: 5 }}>
                                    {addnertext}
                                </Form.Text>
                                <div></div>
                                <Form.Label>Хичээлийн цаг</Form.Label>
                                <Form.Control type="number" placeholder="36" value={addcag} onChange={(e) => setaddcag(e.target.value)} required />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Хаах
                        </Button>
                        <Button variant="primary" onClick={sendlesson}>
                            Хадгалах
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
            {load && <Spinner />}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Нэр</th>
                        <th>Цаг</th>
                        <th>Төлөв</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { irc !== "nodata" ?
                        irc.map((e, index) => <tr key={index}>
                            <td>{aa++}</td><td>{e.lessonName}</td>
                            <td>{e.cag}</td><td>{e.tuluv}</td>
                            <td><Button>Засах</Button></td>
                            <td><Button variant="danger" onClick={() => {setText(e.lessonName + " - Хичээлийг утсгахдаа итгэлтэй байна уу?"); setTextid(e.id); setModalDelete(true)}}>Устгах</Button></td></tr>)
                            : null
                        }
                </tbody>
            </Table>
            
        </>
    )
}
export default TeacherLesson;