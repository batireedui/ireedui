import React, { useEffect, useState } from "react";
import { Table, Button } from 'react-bootstrap';
import axios from "../../axios-url";

const Lesson = props => {
    /*const [irc, setirc] = useState([]);
    useEffect(() => {
        axios.post("/lessonshow.php")
            .then(data => setirc(data.data))
            .catch(err => console.log(err));
        return () => {
        }
    }, []);
    let aa = 1;*/
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Мэргэжил</th>
                    <th>Х/нэр</th>
                    <th>Цаг</th>
                    <th>Үйлдэл</th>
                </tr>
            </thead>
            <tbody>
                <div>Оруулсан ирцүүд харагдах уу</div>
                {
                    //irc.map((e, index) => <tr key={index}><td>{aa++}</td><td>{e.class}</td><td>{e.name}</td><td>{e.cag}</td><td><a href={e.cag}><Button>Засах</Button></a></td></tr>)
                }
            </tbody>
        </Table>

    )
}
export default Lesson;
