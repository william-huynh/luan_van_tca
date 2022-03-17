import React from "react";
// import Header from "../../components/Header";
// import apiBophankd from "../../axios/apiBophankd";
// import BackdropMaterial from "../../components/BackdropMaterial";
// import DialogMaterial from "../../components/DialogMaterial";
// import { toast } from "react-toastify";
// import ten from "../../assets/icons/ten.png";
// import sdt from "../../assets/icons/sdt.png";
// import email from "../../assets/icons/email.png";
// import diachi from "../../assets/icons/diachi.png";
// import taikhoan from "../../assets/icons/taikhoan.png";
// import {
//   Container,
//   Content,
//   Form,
//   FormContent,
//   FormGroup,
//   FormTitle,
//   Input,
//   Label,
//   TextArea,
// } from "./styledComponents";

const Detailsuser = (props) => {
  const id = props.id;
  const role = props.role;
  console.log(id);
  console.log(role);
  //   const [bophankd, setBophankd] = useState(null);
  //   const [loading, setLoading] = useState(false);
  //   const [open, setOpen] = useState(false);
  //   const { id: bophankdId } = props.match.params;

  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  //   const handleXoaBophankd = async () => {
  //     const { success } = await apiBophankd.xoa1Bophankd(bophankdId);
  //     if (success) {
  //       toast.success("Xóa thành công!", { theme: "colored" });
  //       props.history.push("/admin/bophankd");
  //     }
  //   };

  //   const fetchBophankd = async () => {
  //     setLoading(true);
  //     const { bophankd } = await apiBophankd.singleBophankd(bophankdId);
  //     setBophankd(bophankd);
  //     setLoading(false);
  //   };

  //   useEffect(() => {
  //     fetchBophankd();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  //   if (loading) {
  //     return <BackdropMaterial />;
  //   }

  return (
    <>
      {/* <Container>
        <Content>
          <Form>
            <FormContent>
              <FormTitle>
                <span>Chi tiết bộ phận kinh doanh</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={ten} alt="ten" />
                  <span>Tên bộ phận kinh doanh:</span>
                </Label>
                <Input type="text" name="ten" value={bophankd?.ten} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={taikhoan} alt="taikhoan" />
                  <span>Tên tài khoản:</span>
                </Label>
                <Input
                  type="text"
                  name="taikhoan"
                  value={bophankd?.user?.taikhoan}
                  disabled
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={sdt} alt="sdt" />
                  <span>Số điện thoại:</span>
                </Label>
                <Input type="text" name="sdt" value={bophankd?.sdt} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={email} alt="email" />
                  <span>E-mail:</span>
                </Label>
                <Input
                  type="text"
                  name="email"
                  value={bophankd?.email}
                  disabled
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={diachi} alt="diachi" />
                  <span>Địa chỉ:</span>
                </Label>
                <TextArea
                  value={`${bophankd?.xa}, ${bophankd?.huyen}, ${bophankd?.tinh}`}
                  rows="3"
                  disabled
                />
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container> */}
      Hello {id + " " + role}
    </>
  );
};

export default Detailsuser;
