import React, { useEffect, useState, useContext } from "react";
import axios from "../../axios-url";
import { Table, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import Spinner from "../../components/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MyContext } from "../../context/MyContext";
import Login from "../Login";
import Modalinfo from "../../components/Modalinfo";
const Ircshow = props => {
    const [selectClass, setSelectClass] = useState("0");
    const [selectDate, setSelectDate] = useState(new Date());
    const [selectCag, setSelectCag] = useState("1");
    const [selectLesson, setSelectLesson] = useState("0");
    const [myclass, setmyclass] = useState([]);
    const [mylesson, setmylesson] = useState([]);
    const [load, setLoad] = useState(false);
    const [studentList, setStudentList] = useState([]);
    
    const [error, setError] = useState("");
    const state = useContext(MyContext);
    const [ModalinfoState, setModalinfoState] = useState(false);
    const [modaltext, setModalText] = useState("");
    const [btn, setBtn] = useState(false);
    const [too, setToo] = useState("");
    useEffect(() => {
        setLoad(true);
        axios.post("/teacherclass.php", {
            "tid": parseInt(state.theUser.id),
        })
            .then(data => { setmyclass(data.data); setLoad(false); })
            .catch(err => { console.log(err); setmyclass("nodata"); setLoad(false); });
        return () => {

        }
    }, []);
    useEffect(() => {
        axios.post("/teacherlesson.php", {
            "tid": parseInt(state.theUser.id),
        })
            .then(data => { setmylesson(data.data); setLoad(false); })
            .catch(err => { console.log(err); setLoad(false); });
        return () => {

        }
    }, []);
    const showStudent = (classid) => {
        setStudentList("nodata");
        setBtn(false);
        setSelectClass(classid);
        console.log(classid);
    };
    function toJSONLocal(date) {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    }
    const checkIrc = () => {
        if (selectClass == "0") {
            setError("Хичээл орсон ангиа сонгоно уу!");
        }
        else if (selectLesson == "0") {
            setError("Хичээлээ сонгоно уу!");
        }
        else {
            setError("");
            axios.post("/checkirc.php", {
                "selectDate": toJSONLocal(selectDate),
                "selectClass": selectClass,
                "selectCag": selectCag,
                "teacherid": state.theUser.id,
            })
                .then(data => {
                    console.log(data.data);
                    setStudentList(data.data);
                    if (typeof (data.data) === "string" && data.data === "duplicate") {
                        setModalText("Та " + toJSONLocal(selectDate) + " өдрийн " + selectCag + "-р цагт өөр ангид хичээлийн бүртгэл хийсэн байна.");
                        setModalinfoState(true);
                        setToo("");
                        setBtn(false);
                    }
                    else if (typeof (data.data) === "string" && data.data !== "nodata") {
                        setModalText("Энэ ангид " + toJSONLocal(selectDate) + " өдрийн " + selectCag + "-р цагт " + data.data + " багш хичээлийн бүртгэл хийсэн байна.");
                        setModalinfoState(true);
                        setToo("");
                        setBtn(false);
                    }
                    else if (typeof (data.data) === "string" && data.data === "nodata") {
                        axios.post("/studentListClass.php", {
                            "classid": selectClass
                        })
                            .then(datas => {
                                setStudentList(datas.data);
                                setToo("Нийт " + datas.data.length + " суралцагч.");
                                setBtn(true);
                            })
                            .catch(err => { console.log(err); setLoad(false); });
                    }
                    else {
                        setModalText("Энэ ангид та өмнө нь ирц бүртгэл хийсэн байна. Ирцийн мэдээллийг өөрчлөх гэж байгаа бол өөрчлөлтөө хийсний дараа хадгалах товчлуур дарна уу.");
                        setModalinfoState(true);
                        setToo("Нийт " + data.data.length + " суралцагч.");
                        setBtn(true);
                    }
                })
                .catch(err => { console.log(err); });

        }
    };
    const sendIrc = () => {
        if (selectClass == "0") {
            setError("Хичээл орсон ангиа сонгоно уу!");
        }
        else if (selectLesson == "0") {
            setError("Хичээлээ сонгоно уу!");
        }
        else {
            axios.post("/studentircadd.php", {
                "ircObj": studentList,
                "selectLesson": selectLesson,
                "selectDate": toJSONLocal(selectDate),
                "selectClass": selectClass,
                "selectCag": selectCag,
                "teacherid": state.theUser.id,
            })
                .then(data => {
                    console.log(data.data);
                    if (data.data == "1") {
                        setModalText("Ирцийн мэдээлэл амжилттай бүртгэгдлээ.");
                        setModalinfoState(true);
                        setBtn(false);
                    }

                })
                .catch(err => { setError("err") });
        }
    };
    let temparrstudent = [];
    let aa = 1;

    const clickbtn = (id, btn) => {
        //console.log(id + "--" + btn);
        let i1 = 0;
        let i2 = 0;
        let i3 = 0;
        let i4 = 0;
        temparrstudent = [...studentList];
        for (const ele of temparrstudent) {
            if (ele.id === id) {
                ele.tuluv = btn;
            }
            if (ele.tuluv == 1)
                i1++;
            else if (ele.tuluv == 2)
                i2++;
            else if (ele.tuluv == 3)
                i3++;
            else
                i4++;
        }
        let sum = i1 + i2 + i3 + i4;
        setToo("Нийт: " + sum + " Ирсэн: " + i1 + " Өвчтэй: " + i2 + " Чөлөөтэй: " + i3 + " Тасалсан: " + i4);
        setStudentList(temparrstudent);
    };

    if (myclass.message === "Unauthorized") {
        state.logoutUser();
        return <Login />
    }
    else {
        return (<>
            {load && <Spinner />}
            <Modalinfo
                show={ModalinfoState}
                onHide={() => setModalinfoState(false)}
                text={modaltext} />
            <Form>
                <Row className="align-items-center">
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
                    <Col xs="auto" className="my-1">
                        <label>Заасан хичээл</label>
                        <select className="form-control" aria-label="Default select example" onChange={e => {
                            setSelectLesson(e.target.value); setStudentList("nodata");
                            setBtn(false);
                        }} value={selectLesson}>
                            <option value="0">Хичээлээ сонгох</option>
                            {mylesson !== "nodata" ? mylesson.length > 0 ?
                                mylesson.map((el, index) => (
                                    <option key={index} value={el.id}>{el.lessonName}</option>
                                )
                                ) : null : null}
                        </select>
                    </Col>
                    <Col xs="2" className="my-1">
                        <label>Огноо</label>
                        <DatePicker className="form-control" selected={selectDate} onChange={(date) => {
                            setSelectDate(date);
                            setStudentList("nodata");
                            setBtn(false);
                            setToo("");
                        }} dateFormat="yyyy/MM/dd" />
                    </Col>
                    <Col xs="auto" className="my-1">
                        <label>Хичээл орсон цаг</label>
                        <select className="form-control" aria-label="Default select example" onChange={e => {
                            setSelectCag(e.target.value);
                            setStudentList("nodata");
                            setBtn(false);
                            setToo("");
                        }} value={selectCag}>
                            <option value="1">1-р цаг</option>
                            <option value="2">2-р цаг</option>
                            <option value="3">3-р цаг</option>
                            <option value="4">4-р цаг</option>
                            <option value="5">5-р цаг</option>
                            <option value="6">6-р цаг</option>
                            <option value="7">7-р цаг</option>
                            <option value="8">8-р цаг</option>
                        </select>
                    </Col>
                    <Col xs="auto" className="my-1">
                        <label style={{ color: "#ffffff" }}>.</label>
                        <Button className="form-control" variant="dark" onClick={checkIrc}>
                            ШАЛГАХ
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginBottom: 10, color: "#B40000", justifyContent: "flex-end" }}>
                        {error}
                    </Col>
                </Row>
                {btn && (<Row style={{ padding: 15 }}>
                    <Button variant="danger" onClick={sendIrc}>
                        ХАДГАЛАХ
                    </Button>
                </Row>)}
                <Row style={{ padding: 15 }}>
                    <Alert variant="primary">
                        {too}
                    </Alert>
                </Row>
            </Form>
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
                        {typeof (studentList) !== "string" ?
                            studentList.length > 0 ?
                                studentList.map((e, index) =>
                                    <tr key={index}><td>{aa++}</td><td>{e.fname}</td><td>{e.lname}</td>
                                        {e.tuluv == 1 ? <td style={{ color: "#198754" }}>Ирсэн</td> :
                                            (e.tuluv == 2 ? <td style={{ color: "#31D2F2" }}>Өвчтэй</td> :
                                                (e.tuluv == 3 ? <td style={{ color: "#0D6EFD" }}>Чөлөөтэй</td> : <td style={{ color: "#5C636A" }}>Тасалсан</td>))}
                                        <td><Button variant="success" onClick={() => clickbtn(e.id, 1)}>Ирсэн</Button></td>
                                        <td><Button variant="info" onClick={() => clickbtn(e.id, 2)}>Өвчтэй</Button></td>
                                        <td><Button variant="primary" onClick={() => clickbtn(e.id, 3)}>Чөлөөтэй</Button></td>
                                        <td><Button variant="secondary" onClick={() => clickbtn(e.id, 4)}> Тасалсан</Button></td>
                                    </tr>)
                                : null : null
                        }
                    </tbody>
                </Table> : <Spinner />}
        </>
        )
    }
}
export default Ircshow;
