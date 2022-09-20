import React, { useEffect, useState, useContext } from "react";
import axios from "../../axios-url";
import { Table, Button, Alert, Row, Col } from 'react-bootstrap';
import Spinner from "../../components/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MyContext } from "../../context/MyContext";
import Modalinfo from "../../components/Modalinfo";
import Login from "../Login";
const HomePage = props => {
    const [classList, setClassList] = useState([]);
    const [selectClass, setSelectClass] = useState("");
    const [load, setLoad] = useState(false);
    const [fognoo, setfognoo] = useState(new Date());
    const [lognoo, setlognoo] = useState(new Date());
    const state = useContext(MyContext);
    function toJSONLocal(date) {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    }
    useEffect(() => {
        if (state.userType) {
            axios.post("/saHomepage.php", {
                "fognoo": toJSONLocal(fognoo),
                "lognoo": toJSONLocal(lognoo)
            })
                .then(data => {
                    console.log(data.data);
                    setClassList(data.data);
                })
                .catch(err => { });
        }
        else {
            axios.post("/teacherHome.php", {
                "tid": state.theUser.id,
                "fognoo": toJSONLocal(fognoo),
                "lognoo": toJSONLocal(lognoo)
            })
                .then(data => {
                    console.log(data.data);
                    setClassList(data.data);
                })
                .catch(err => { });
        }
        return () => {

        }
    }, [fognoo, lognoo])
    let aa = 1;
    let dataFilter = [];
    let cagToo = 0;
    typeof (classList) !== "string" ?
        classList.length > 0 ?
            classList.map((e, index) =>
                dataFilter = classList.filter(el => el.name.toLowerCase().startsWith(selectClass.toLowerCase())))
            : dataFilter = classList : dataFilter = classList;

    typeof (dataFilter) !== "string" ? cagToo = parseInt(dataFilter.length) * 2 : cagToo = 0;

    const showStudent = (classid) => {
        //setSelectClass(classid);
    };
    return <>
        <Row className="align-items-center">
            <Col xs="auto" className="my-1">
                <label>Хичээл орсон ангиар хайх</label>
                <input className="form-control" type="text" placeholder="1-1 ..." value={selectClass} onChange={e => setSelectClass(e.target.value)} />
            </Col>
            <Col xs="2" className="my-1">
                <label>Эхлэх огноо</label>
                <DatePicker className="form-control"
                    selected={fognoo} onChange={(date) => {
                        setfognoo(date);
                    }}
                    dateFormat="yyyy/MM/dd" />
            </Col>
            <Col xs="2" className="my-1">
                <label>Дараагийн огноо</label>
                <DatePicker className="form-control"
                    selected={lognoo} onChange={(date) => {
                        setlognoo(date);
                    }}
                    dateFormat="yyyy/MM/dd" />
            </Col>
            <Col xs="4" className="my-1">
                <Alert variant="primary" className="form-control">Нийт цаг: {cagToo}</Alert>
            </Col>
        </Row>
        {load === false ?
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Огноо</th>
                        <th>Нэр</th>
                        <th>Хичээлийн нэр</th>
                        <th>Цаг</th>
                    </tr>
                </thead>
                <tbody>
                    {typeof (dataFilter) !== "string" ?
                        dataFilter.length > 0 ?
                            dataFilter.map((e, index) =>
                                <tr key={index}>
                                    <td>{aa++}</td>
                                    <td>{e.ognoo}</td>
                                    <td>{e.name}</td>
                                    <td>{e.lessonName}</td>
                                    <td>{e.cag}-р цаг</td>
                                </tr>)
                            : null : null
                    }
                </tbody>
            </Table> : <Spinner />}
    </>
}
export default HomePage;
