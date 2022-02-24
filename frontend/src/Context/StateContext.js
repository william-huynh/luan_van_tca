import { useState, createContext } from "react";
import axios from "axios";

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [qrcode, setQrcode] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleGetQrcode = async (id, role, isActive) => {
    let info = {
      role: JSON.parse(localStorage.getItem("userInfo")).vaitro,
      urlRole: role,
      id,
      isActive,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/qrcode/scanUser",
        info
      );
      setQrcode(res.data.qrcode);
      handleShow();
    } catch (error) {
      console.log(error);
    }
  };
  const props = {
    show,
    handleClose,
    handleShow,
    qrcode,
    setQrcode,
    handleGetQrcode,
  };
  return (
    <StateContext.Provider value={props}>{children}</StateContext.Provider>
  );
};

export { StateContext, StateProvider };
