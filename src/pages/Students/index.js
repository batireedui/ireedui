import React, { useEffect, useState, useContext } from "react";
import { Table, Button } from 'react-bootstrap';
import axios from "../../axios-url";
import Spinner from "../../components/Spinner";
import { MyContext } from "../../context/MyContext";
import Login from "../Login";
const Students = props => {
    const [irc, setirc] = useState([]);
    const [load, setLoad] = useState(false);
    const state = useContext(MyContext);
    useEffect(() => {
        setLoad(true);
        axios.post("/students.php")
            .then(data => { setirc(data.data); setLoad(false); })
            .catch(err => { console.log(err); setLoad(false); });
        return () => {

        }
    }, []);
    let aa = 1;
    if (irc.message === "Unauthorized") {
        state.logoutUser();
        return <Login />
    }
    else {
        return (
            <>
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
                            {
                                typeof (irc) === "object" ?
                                    irc.map((e, index) => <tr key={index}><td>{aa++}</td><td>{e.fname}</td><td>{e.lname}</td><td>{e.phone}</td><td><a href={e.cag}><Button>Засах</Button></a></td><td><a href={e.cag}><Button variant="danger">Устгах</Button></a></td></tr>)
                                    : null}
                        </tbody>
                    </Table> : <Spinner />}
            </>
        )
    }
}
export default Students;
