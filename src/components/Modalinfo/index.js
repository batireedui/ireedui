import React from 'react'
import { Button, Modal } from 'react-bootstrap';
const Modalinfo = props => {
    return (
        <Modal show = {props.show} onHide = {props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Анхаар!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.text}</Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={props.onHide}>
                    Хаах
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Modalinfo;