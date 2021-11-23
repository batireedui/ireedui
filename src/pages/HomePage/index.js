import React, { useEffect, useState, useContext } from "react";
import axios from "../../axios-url";
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import Spinner from "../../components/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MyContext } from "../../context/MyContext";
import Login from "../Login";
const HomePage = props => {
    const [selectClass, setSelectClass] = useState("0");
    const [selectDate, setSelectDate] = useState(new Date());
    const [selectCag, setSelectCag] = useState("1");
    const [selectLesson, setSelectLesson] = useState("0");
    const [myclass, setmyclass] = useState([]);
    const [load, setLoad] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [mylesson, setmylesson] = useState([]);
    const [error, setError] = useState("");
    const state = useContext(MyContext);
    console.log(state.theUser);
    useEffect(() => {
        setLoad(true);
        axios.post("/teacherclass.php")
            .then(data => { setmyclass(data.data); setLoad(false); })
            .catch(err => { console.log(err); setmyclass("nodata"); setLoad(false); });
        return () => {

        }
    }, []);
    useEffect(() => {
        setLoad(true);
        axios.post("/teacherlesson.php", {
            "tid": 1,
        })
            .then(data => { setmylesson(data.data); setLoad(false); })
            .catch(err => { console.log(err); setLoad(false); });
        return () => {

        }
    }, []);

    function toJSONLocal(date) {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
      }
    const checkIrc = () => {
        if (selectClass == "0") {
            setError("Хичээл орсон ангиа сонгоно уу!");
        }
        else {
            axios.post("/checkirc.php", {
                "selectDate": toJSONLocal(selectDate),
                "selectClass": selectClass,
                "selectCag": selectCag,
            })
                .then(data => { setStudentList(data.data); })
                .catch(err => { console.log(err); });
        }
    };
    let temparrstudent = [];
    let aa = 1;

    const clickbtn = (id, btn) => {
        console.log(id + "--" + btn);
        temparrstudent = [...studentList];
        for (const ele of temparrstudent) {
            if (ele.id === id) {
                ele.tuluv = btn;
            }
        }
        setStudentList(temparrstudent);
    };
    if (myclass.message === "Unauthorized") {
        state.logoutUser();
        return <Login />
    }
    return (<>
        {load && <Spinner />}
        <Form>
            <Row className="align-items-center">
                <Col xs="auto" className="my-1">
                    <label>Хичээл орсон анги</label>
                    <select className="form-control" aria-label="Default select example" onChange={e => setSelectClass(e.target.value)} value={selectClass}>
                        <option value="0">Хичээл орж байгаа ангиа сонго</option>
                        {myclass.map((el, index) => (
                            <option key={index} value={el.id}>{el.name}</option>
                        )
                        )}
                    </select>
                </Col>
                <Col xs="2" className="my-1">
                    <label>Огноо</label>
                    <DatePicker className="form-control" selected={selectDate} onChange={(date) => setSelectDate(date)} dateFormat="yyyy/MM/dd" />
                </Col>
                <Col xs="auto" className="my-1">
                    <label>Хичээл орсон цаг</label>
                    <select className="form-control" aria-label="Default select example" onChange={e => setSelectCag(e.target.value)} value={selectCag}>
                        <option value="1">1-р цаг</option>
                        <option value="2">2-р цаг</option>
                        <option value="3">3-р цаг</option>
                        <option value="4">4-р цаг</option>
                        <option value="5">5-р цаг</option>
                    </select>
                </Col>
            </Row>
            <Row>
                <Col style={{ marginBottom: 10, color: "#B40000", justifyContent: "flex-end"}}>
                    {error}
                </Col>
            </Row>
        </Form>
        <Button variant="primary" onClick={checkIrc}>
            Харах
        </Button>
        {load === false ?
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Овог</th>
                        <th>Нэр</th>
                        <th>Төлөв</th>
                        <th>Утас</th>
                    </tr>
                </thead>
                <tbody>
                    {studentList !== "nodata" ?
                        studentList.map((e, index) =>
                            <tr key={index}><td>{aa++}</td><td>{e.fname}</td><td>{e.lname}</td>
                                {e.tuluv == 1 ? <td style={{ color: "#198754" }}>Ирсэн</td> :
                                    (e.tuluv == 2 ? <td style={{ color: "#FFC107" }}>Өвчтэй</td> :
                                        (e.tuluv == 3 ? <td style={{ color: "#0D6EFD" }}>Чөлөөтэй</td> : <td style={{ color: "#DC3545" }}>Тасалсан</td>))}
                                <td><Button variant="success" onClick={() => clickbtn(e.id, 1)}>Ирсэн</Button></td>
                                <td><Button variant="warning" onClick={() => clickbtn(e.id, 2)}>Өвчтэй</Button></td>
                                <td><Button variant="primary" onClick={() => clickbtn(e.id, 3)}>Чөлөөтэй</Button></td>
                                <td><Button variant="danger" onClick={() => clickbtn(e.id, 4)}> Тасалсан</Button></td>
                            </tr>)
                        : null
                    }
                </tbody>
            </Table> : <Spinner />}
    </>
    )
}
export default HomePage;
