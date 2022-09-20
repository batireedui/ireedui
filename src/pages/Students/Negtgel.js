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
const Negtgel = props => {
    const [urls, seturl] = useState([]);
    const [classList, setClassList] = useState([]);
    const [load, setLoad] = useState(false);
    const [fognoo, setfognoo] = useState(new Date());
    const [lognoo, setlognoo] = useState(new Date());
    const [cag, setcag] = useState(0);
    const [myclass, setmyclass] = useState([]);
    const [selectClass, setSelectClass] = useState("0");
    const state = useContext(MyContext);
    function toJSONLocal(date) {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    }
    useEffect(() => {
        setLoad(true);
        axios.post("/classlist.php")
            .then(data => { setmyclass(data.data); setLoad(false); })
            .catch(err => { console.log(err); setmyclass("nodata"); setLoad(false); });
        return () => {

        }
    }, []);
    useEffect(() => {

        const query = new URLSearchParams(
            props.location.search
        );

        let data = {};

        for (let params of query.entries()) {
            data[params[0]] = params[1];
        }
        if (data.id) {

            setfognoo(new Date(data.fognoo));
            setlognoo(new Date(data.lognoo));
            setSelectClass(data.id);
        };
        return () => {

        }
    }, []);

    useEffect(() => {
        showIrc();
        return () => {

        }
    }, [])

    const showIrc = () => {
        axios.post("/SaStudent.php", {
            "classid": selectClass,
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
    }
    let aa = 1;
    const showStudent = (classid) => {
        setSelectClass(classid);
    };
    return <>
        <Row className="align-items-end">
            <Col xs="auto" className="my-1">
                <label>Хичээл орсон анги</label>
                <select className="form-control" aria-label="Default select example" onChange={e => showStudent(e.target.value)} value={selectClass}>
                    <option value="0">Хичээл орж байгаа ангиа сонго</option>
                    {myclass !== "nodata" ? myclass.length > 0 ?
                        myclass.map((el, index) => (
                            <option key={index} value={el.id}>{el.name}</option>
                        )
                        ) : null : null}
                </select>
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
            <Col xs="auto" className="my-1">
                <Button variant="primary" onClick={showIrc}>
                    ХАРАХ
                </Button>
            </Col>
        </Row>
        {load === false ?
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Овог</th>
                        <th>Нэр</th>
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
                                    <td>{e.fname}</td>
                                    <td>{e.lname}</td>
                                    <td>{parseInt(e.stoo) * 2}</td>
                                    <td style={{ color: "green" }}>{e.irsen * 2}</td>
                                    <td style={{ color: "#31D2F2" }}>{e.u * 2}</td>
                                    <td style={{ color: "#0D6EFD" }}>{e.chu * 2}</td>
                                    <td style={{ color: "maroon" }}>{e.tas * 2}</td>
                                    <td>{(parseInt(e.tas) + parseInt(e.u) + parseInt(e.chu) + parseInt(e.irsen)) * 2}</td>
                                    <td>{((parseInt(e.irsen) + parseInt(e.u) + parseInt(e.chu))/(e.stoo)*100).toFixed(2)}</td>
                                    <td><NavLink to={{ pathname: `/SaStudent/`, search: `id=${e.id}&fognoo=${toJSONLocal(fognoo)}&lognoo=${toJSONLocal(lognoo)}` }} className="nav-link">Дэлгэрэнгүй</NavLink></td>
                                </tr>)
                            : <p>Мэдээлэл байхгүй байна</p> : <p>Мэдээлэл байхгүй байна</p>
                    }
                </tbody>
            </Table> : <Spinner />}
    </>
}
export default Negtgel;
