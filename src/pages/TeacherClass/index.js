import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from "../../axios-url";
import ModalDelete from "../../components/ModalDelete";
import Spinner from "../../components/Spinner";
const TeacherClass = props => {
    const [myclass, setmyclass] = useState([]);
    const [classlist, setclasslist] = useState([]);
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
        axios.post("/classlist.php")
            .then(data => { console.log(data); setclasslist(data.data); setLoad(false); })
            .catch(err => { console.log(err); setLoad(false); });
        return () => {

        }
    }, []);
    useEffect(() => {
        setLoad(true);
        axios.post("/teacherclass.php")
            .then(data => { console.log(data); setmyclass(data.data); setLoad(false); })
            .catch(err => { console.log(err); setLoad(false); });
        return () => {

        }
    }, [addload]);
    let aa = 1;
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    const sendlesson = () => {
        const options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
        };
        console.log(addner.trim().length);
        if (addner.trim().length < 1)
            setaddnertext("Хичээлийн нэрийг оруулна уу");
        else {
            axios.post("/teacherlessonadd.php", {
                "tid": 1,
                "lname": addner
            }, options)
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
        const options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
        };
        axios.post("/deletetlesson.php", {
            "lid": textid,
        }, options)
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
                    onClick={deletelesson}
                    text={text}
                    textid={textid} />

                <Modal show={modalShow} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Заадаг хичээл нэмэх</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">

                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Анги</th>
                                            <th>Жил</th>
                                            <th></th>e
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classlist.map((e, index) => <tr key={index}>
                                            <td>{aa++}</td><td>{e.name}</td>
                                            <td>{e.hugacaa}</td>
                                            <td><Button variant="success" onClick={() => { setText(e.lessonName); setTextid(e.id); setModalDelete(true) }}>Нэмэх</Button></td></tr>)}
                                    </tbody>
                                </Table>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>

            </div>
            {load && <Spinner />}
            <Table striped bordered hover>
                <thead>e
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
                    {myclass !== "nodata" ?
                        myclass.map((e, index) => <tr key={index}>
                            <td>{aa++}</td><td>{e.lessonName}</td>
                            <td>{e.cag}</td><td>{e.tuluv}</td>
                            <td><Button>Засах</Button></td>
                            <td><Button variant="danger" onClick={() => { setText(e.lessonName); setTextid(e.id); setModalDelete(true) }}>Устгах</Button></td></tr>)
                        : null
                    }
                </tbody>
            </Table>

        </>
    )
}
export default TeacherClass;