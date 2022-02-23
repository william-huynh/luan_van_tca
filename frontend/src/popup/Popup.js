import {Button, Modal} from 'react-bootstrap'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Popup = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          console.log(props.qrcodeState)
          <Modal.Body><img src="data:image/png;base64,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" /></Modal.Body>
        </Modal>
      </>
    );
  }
  
export default Popup