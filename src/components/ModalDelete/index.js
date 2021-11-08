import React from 'react'
import { Button, Modal } from 'react-bootstrap';
const ModalDelete = props => {
    return (
        <Modal show = {props.show} onHide = {props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Устгахдаа итгэлтэй байна уу?</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.text}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Хаах
                </Button>
                <Button variant="danger" onClick={props.onClick}>
                    Устгах
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDelete;