import React, { useState } from "react";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import taikhoan from "../../assets/icons/taikhoan.png";
import axios from "axios";
import {
  Container,
  Content,
  Form,
  FormContent,
  FormGroup,
  FormTitle,
  Input,
  Label,
  TextArea,
} from "../../phanquyen/admin/styledComponents";

const Detailsuser = (props) => {
  const id = props.id;
  const user = props.user;
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
      <Container>
        <Content>
          <Form>
            <FormContent>
              <FormTitle>
                <span>Chi tiết {name}</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={ten} alt="ten" />
                  <span>Tên bộ phận kinh doanh:</span>
                </Label>
                <Input
                  type="text"
                  name="ten"
                  value={info.ten === undefined ? info.daidien : info.ten}
                  disabled
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={taikhoan} alt="taikhoan" />
                  <span>Tên tài khoản:</span>
                </Label>
                <Input type="text" name="taikhoan" value={user} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={sdt} alt="sdt" />
                  <span>Số điện thoại:</span>
                </Label>
                <Input
                  type="text"
                  name="sdt"
                  value={info.sdt === undefined ? "Chưa cập nhật" : info.sdt}
                  disabled
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={email} alt="email" />
                  <span>E-mail:</span>
                </Label>
                <Input
                  type="text"
                  name="email"
                  value={
                    info.email === undefined ? "Chưa cập nhật" : info.email
                  }
                  disabled
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={diachi} alt="diachi" />
                  <span>Địa chỉ:</span>
                </Label>
                <TextArea
                  value={
                    info.diachi === undefined
                      ? info.xa + "," + info.huyen + "," + info.tinh
                      : info.diachi
                  }
                  rows="3"
                  disabled
                />
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Detailsuser;
