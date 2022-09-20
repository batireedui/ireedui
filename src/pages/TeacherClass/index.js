import React, { useEffect, useState, useContext } from "react";
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from "../../axios-url";
import ModalDelete from "../../components/ModalDelete";
import Spinner from "../../components/Spinner";
import { MyContext } from "../../context/MyContext";
import Login from "../Login";
const TeacherClass = props => {
    const [myclass, setmyclass] = useState([]);
    const [classlist, setclasslist] = useState([]);
    const [load, setLoad] = useState(false);
    const [addload, setAddLoad] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [text, setText] = useState("");
    const [textid, setTextid] = useState("");
    const state = useContext(MyContext);

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
        axios.post("/teacherclass.php", {
            "tid": parseInt(state.theUser.id)
        })
            .then(data => { console.log(data); setmyclass(data.data); setLoad(false); })
            .catch(err => { console.log(err); setLoad(false); });
        return () => {

        }
    }, [addload]);
    let aa = 1;
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    const addclass = (classid) => {
        axios.post("/teacherclassadd.php", {
            "tid": state.theUser.id,
            "classid": classid
        })
            .then(data => {
                setAddLoad(addload => !addload);
            })
            .catch(err => { console.log(err); setLoad(false); });
    }

    const deleteclass = () => {
        console.log(textid+"222");
        axios.post("/deleteclass.php", {
            
            "tclassid": textid,
        })
            .then(data => {
                console.log(data.data);
                setAddLoad(addload => !addload);
                setModalDelete(false);
            })
            .catch(err => { console.log(err); });
    }
    if (myclass.message === "Unauthorized" || classlist.message === "Unauthorized") {
        state.logoutUser();
        return <Login />
    }
    else {
        return (
            <>
                <div style={{ display: "flex", justifyContent: "flex-end", padding: 10 }}>
                    <Button variant="primary" onClick={handleShow}>
                        Хичээл заадаг анги нэмэх
                    </Button>

                    <ModalDelete
                        show={modalDelete}
                        onHide={() => setModalDelete(false)}
                        onClick={deleteclass}
                        text={text}
                        textid={textid} />

                    <Modal show={modalShow} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Бүгд ангиуд</Modal.Title>
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
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classlist.map((e, index) => <tr key={index}>
                                                <td>{aa++}</td><td>{e.name}</td>
                                                <td>{e.hugacaa}</td>
                                                <td><Button variant="success" onClick={() => { addclass(e.id) }}>Нэмэх</Button></td></tr>)}
                                        </tbody>
                                    </Table>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                    </Modal>

                </div>
                {load && <Spinner />}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Анги</th>
                            <th>Жил</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {myclass !== "nodata" ?
                            myclass.map((e, index) => <tr key={index}>
                                <td>{aa++}</td><td>{e.name}</td>
                                <td>{e.hugacaa}</td>
                                <td><Button variant="warning" onClick={() => { setText(e.name + " - Хичээл ордог ангиас хасах уу?"); setTextid(e.id); setModalDelete(true) }}>Устгах</Button></td></tr>)
                            : null
                        }
                    </tbody>
                </Table>

            </>
        )
    }
}
export default TeacherClass;