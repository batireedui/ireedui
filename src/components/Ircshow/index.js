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
    const [studentList, setStudentList] = useState([]);
    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    };
    
    useEffect(() => {
        setLoad(true);
        axios.post("/teacherclass.php")
            .then(data => { setmyclass(data.data); setLoad(false); })
            .catch(err => { console.log(err); setmyclass("nodata"); setLoad(false); });
        return () => {

        }
    }, []);
    const showStudent = (classid) => {
        setSelectClass(classid);
        setLoad(true);
        axios.post("/studentListClass.php", {
            "classid": classid
        }, options)
            .then(data => { setStudentList(data.data); setLoad(false); })
            .catch(err => { console.log(err); setLoad(false); });
    };

    const sendIrc = () => {
        axios.post("/studentircadd.php", {
            "ircObj": studentList
        }, options)
            .then(data => { console.log(data.data); })
            .catch(err => { console.log(err);});
    };

    let temparrstudent = [];
    let aa = 1;
 
    const clickbtn = (id, btn) => {
        console.log(id + "--" + btn);
        temparrstudent = [ ...studentList];
        for(const ele of temparrstudent){
            if(ele.id === id)
            {
                ele.tuluv = btn;
            }
        }
        setStudentList(temparrstudent);
    };
    console.log(studentList);
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
        <Button variant="primary" onClick={sendIrc}>
                    Хадгалах
                </Button>
        <p>{selectClass}</p>
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
                            {e.tuluv == 1 ? <td style={{color: "#198754"}}>Ирсэн</td> :
                             (e.tuluv == 2 ? <td style={{color: "#FFC107"}}>Өвчтэй</td> : 
                             (e.tuluv == 3 ? <td style={{color: "#0D6EFD"}}>Чөлөөтэй</td> : <td style={{color: "#DC3545"}}>Тасалсан</td>))}
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
export default Ircshow;
