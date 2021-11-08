import React, { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import axios from "../../axios-url";

const Ircshow = props => {
    const [irc, setirc] = useState([]);
    useEffect(() => {
        axios.post("/showirc.php")
            .then(data => setirc(data.data))
            .catch(err => console.log(err));
        return () => {
        }
    }, []);
    let aa = 1;
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Овог</th>
                    <th>Нэр</th>
                    <th>Төлөв</th>
                    <th>Огноо</th>
                </tr>
            </thead>
            <tbody>
                {
                    irc.map((e, index) => <tr key={index}><td>{aa++}</td><td>{e.lname}</td><td>{e.fname}</td><td>{e.state}</td><td>{e.ognoo}</td></tr>)}
            </tbody>
        </Table>

    )
}
export default Ircshow;
