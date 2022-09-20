import React, { useEffect, useState, useContext } from "react";
import axios from "../../axios-url";
import { Table, Button, Alert, Row, Col } from 'react-bootstrap';
import Spinner from "../../components/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MyContext } from "../../context/MyContext";
import { NavLink } from "react-router-dom";
import Modalinfo from "../../components/Modalinfo";
import Login from "../Login";
const SaHome = props => {
    const [classList, setClassList] = useState([]);
    const [load, setLoad] = useState(false);
    const [fognoo, setfognoo] = useState(new Date());
    const [lognoo, setlognoo] = useState(new Date());
    const [cag, setcag] = useState(0);
    const state = useContext(MyContext);
    function toJSONLocal(date) {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    }
    useEffect(() => {
        axios.post("/SaHome.php", {
            "tid": state.theUser.id,
            "fognoo": toJSONLocal(fognoo),
            "lognoo": toJSONLocal(lognoo)
        })
            .then(data => {
                console.log(data.data);
                setClassList(data.data);
                if (typeof (data.data) === "object")
                    setcag(parseInt(data.data.length) * 2);
                else
                    setcag(0);
            })
            .catch(err => { });
        return () => {

        }
    }, [fognoo, lognoo])
    let aa = 1;
    return <>
        <Row className="align-items-center">
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
                <Alert variant="primary" className="form-control">Таны нийт заасан цаг: {cag}</Alert>
            </Col>
        </Row>
        {load === false ?
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Анги</th>
                        <th>Тоо</th>
                        <th>Х/цаг</th>
                        <th>Ирсэн</th>
                        <th>Өвчтэй</th>
                        <th>Чөлөөтэй</th>
                        <th>Тасалсан</th>
                        <th>Нийт</th>
                        <th>Хувь</th>
                    </tr>
                </thead>
                <tbody>
                    {typeof (classList) !== "string" ?
                        classList.length > 0 ?
                            classList.map((e, index) =>
                                <tr key={index}>
                                    <td>{aa++}</td>
                                    <td>{e.name}</td>
                                    <td>{e.stoo}</td>
                                    <td>{(parseInt(e.tas) + parseInt(e.u) + parseInt(e.chu) + parseInt(e.irsen)) * 2 / parseInt(e.stoo)}</td>
                                    <td>{e.irsen * 2}</td>
                                    <td>{e.u * 2}</td>
                                    <td>{e.chu * 2}</td>
                                    <td>{e.tas * 2}</td>
                                    <td>{(parseInt(e.tas) + parseInt(e.u) + parseInt(e.chu) + parseInt(e.irsen)) * 2}</td>
                                    <td>{((parseInt(e.irsen) + parseInt(e.u) + parseInt(e.chu)) / (parseInt(e.tas) + parseInt(e.u) + parseInt(e.chu) + parseInt(e.irsen)) * 100).toFixed(2)}</td>
                                    <td><NavLink to={{ pathname: `/SaStudent/`, search: `id=${e.id}&fognoo=${toJSONLocal(fognoo)}&lognoo=${toJSONLocal(lognoo)}` }} className="nav-link">Суралцагчаар</NavLink></td>
                                </tr>)
                            : null : null
                    }
                </tbody>
            </Table> : <Spinner />}
    </>
}
export default SaHome;
