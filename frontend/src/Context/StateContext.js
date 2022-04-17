import { useState, createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [qrcode, setQrcode] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [code, setCode] = useState("null");
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
  const handleCancleOrder = async (code, trangthai) => {
    let info = {
      code,
      trangthai,
    };

    try {
      const res = await axios.put(
        "http://localhost:5000/api/donhang/huy",
        info
      );
      if (res.data.success === true) {
        toast.success("Hủy thành công!", { theme: "colored" });
      } else {
        toast.success("Hủy thất bại!", { theme: "colored" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const props = {
    show,
    code,
    setCode,
    handleClose,
    handleShow,
    qrcode,
    setQrcode,
    handleGetQrcode,
    handleCancleOrder,
  };
  return (
    <StateContext.Provider value={props}>{children}</StateContext.Provider>
  );
};

export { StateContext, StateProvider };
