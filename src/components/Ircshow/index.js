import React, { useEffect, useState } from "react";
import axios from "../../axios-url";
import { Table, Button, Modal, Form } from 'react-bootstrap';
const Ircshow = props => {

    return (
        <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Form.Select>

    )
}
export default Ircshow;
