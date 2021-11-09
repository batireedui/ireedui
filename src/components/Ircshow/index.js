import React, { useEffect, useState } from "react";
import axios from "../../axios-url";
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import Spinner from "../../components/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Ircshow = props => {
    const [startdate, setStartDate] = useState(new Date());
    const [selectClass, setSelectClass] = useState("");
    const [myclass, setmyclass] = useState([]);
    const [load, setLoad] = useState(false);
    const [ircTul, setircTul] = useState("");
    const [studentList, setStudentList] = useState([]);
    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    };

    useEffect(() => {
        setLoad(true);
        axios.post("/teacherclass.php")
            .then(data => { console.log(data); setmyclass(data.data); setLoad(false); })
            .catch(err => { console.log(err); setmyclass("nodata"); setLoad(false); });
        return () => {

        }
    }, []);
    let aa = 1;
    const showStudent = (classid) => {
        setSelectClass(classid);
        setLoad(true);
        axios.post("/studentListClass.php", {
            "classid": classid
        }, options)
            .then(data => { console.log(data); setStudentList(data.data); setLoad(false); })
            .catch(err => { console.log(err); setLoad(false); });
    };
    return (<>
        {load && <Spinner />}
        <Form>
            <Row className="align-items-center">
                <Col xs="auto" className="my-1">
                    <select className="form-control" aria-label="Default select example" onChange={e => showStudent(e.target.value)} value={selectClass}>
                        <option>Хичээл орж байгаа ангиа сонго</option>
                        {myclass.map((el, index) => (
                            <option key={index} value={el.id}>{el.name}</option>
                        )
                        )}
                    </select>
                </Col>
                <Col xs="auto" className="my-1">
                    <DatePicker className="form-control" selected={startdate} onChange={(date) => setStartDate(date)} dateFormat="yyyy/MM/dd" />
                </Col>
            </Row>
        </Form>
        <p>{selectClass}</p>
        {load === false ?
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Овог</th>
                        <th>Нэр</th>
                        <th>Анги</th>
                        <th>Утас</th>
                    </tr>
                </thead>
                <tbody>
                    {studentList !== "nodata" ?
                        studentList.map((e, index) => <tr key={index}><td>{aa++}</td><td>{e.fname}</td><td>{e.lname}</td>
                            <td>{ircTul}</td>
                            <td><Button variant="success" onClick={() => setircTul("Ирсэн")}>Ирсэн</Button></td>
                            <td><Button variant="warning">Өвчтэй</Button></td>
                            <td><Button variant="primary">Чөлөөтэй</Button></td>
                            <td><Button variant="danger"> Тасалсан</Button></td>
                        </tr>)
                        : null
                    }
                </tbody>
            </Table> : <Spinner />}
    </>
    )
}
export default Ircshow;
