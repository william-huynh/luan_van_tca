import { Button, Modal } from "react-bootstrap";
import { useContext } from "react";
import { StateContext } from "../Context/StateContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Popup = () => {
  const context = useContext(StateContext);
  const style = {
    textAlign: "center",
  };
  return (
    <>
      <Modal show={context.show} onHide={context.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Scan Now!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={style}>
          <img src={context.qrcode} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Popup;
