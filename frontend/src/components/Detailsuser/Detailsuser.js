import React, { useState } from "react";
import styles from "./Detailsuser.module.css";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import taikhoan from "../../assets/icons/taikhoan.png";
import axios from "axios";

const Detailsuser = (props) => {
  const id = props.id;
  const role = props.role;
  let name = "";
  const [info, setInfo] = useState([]);
  const getBpkd = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bophankd/baseduserid/${id}`
      );
      setInfo(res.data.bophankd);
    } catch (err) {
      console.log(err);
    }
  };
  const getGsv = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/gsv/baseduserid/${id}`
      );
      setInfo(res.data.gsv);
    } catch (err) {
      console.log(err);
    }
  };
  const getDaily1 = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/daily1/user/${id}`
      );
      setInfo(res.data.daily1);
    } catch (err) {
      console.log(err);
    }
  };
  const getDaily2 = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/daily2/user/${id}`
      );
      setInfo(res.data.daily2);
    } catch (err) {
      console.log(err);
    }
  };
  const getHodan = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/hodan/singlehdbaseduser/${id}`
      );
      setInfo(res.data.hodan);
    } catch (err) {
      console.log(err);
    }
  };
  switch (role) {
    case "bophankd":
      name = "bộ phận kinh doanh";
      getBpkd();
      break;
    case "giamsatvung":
      name = "giám sát vùng";
      getGsv();
      break;
    case "daily1":
      name = "đại lý 1";
      getDaily1();
      break;
    case "daily2":
      name = "đại lý 2";
      getDaily2();
      break;
    case "hodan":
      name = "hộ dân";
      getHodan();
      break;
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Chi tiết {name}</h1>
        <div className={styles.form}>
          <div className={styles.name}>
            <img src={ten} className={styles.img} />
            <span>Tên {name}</span>
            <h4 className={styles.info}>
              {info.ten === undefined ? info.daidien : info.ten}
            </h4>
          </div>
          {/* <div className={styles.name}>
            <img src={taikhoan} className={styles.img} />
            <span>Tên tài khoản</span>
            <h4 className={styles.info}>{info.user.taikhoan}</h4>
          </div> */}
          <div className={styles.name}>
            <img src={sdt} className={styles.img} />
            <span>Số điện thoại</span>
            <h4 className={styles.info}>
              {info.sdt === undefined ? "Chưa cập nhật" : info.sdt}
            </h4>
          </div>
          <div className={styles.name}>
            <img src={email} className={styles.img} />
            <span>Email</span>
            <h4 className={styles.info}>
              {info.email === undefined ? "Chưa cập nhật" : info.email}
            </h4>
          </div>
          <div className={styles.name}>
            <img src={diachi} className={styles.img} />
            <span>Địa chỉ</span>
            <h4 className={styles.info}>
              {info.diachi === undefined
                ? info.xa + "," + info.huyen + "," + info.tinh
                : info.diachi}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detailsuser;
