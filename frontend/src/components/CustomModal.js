import React, { useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { formatMoney } from "../utils";
import TableNguyenlieuDonhang from "../phanquyen/bophankd/tables/TableNguyenlieuDonhang";
import TableSanphamDonhangChitiet from "../phanquyen/giamsatvung/tables/TableSanphamDonhangChitiet";
import TableCongcuDonhang from "../phanquyen/giamsatvung/tables/TableCongcuDonhang";
import TableVattuDonhang from "../phanquyen/giamsatvung/tables/TableVattuDonhang";
import {
  BoxInfo,
  BoxInfoTitle,
  DetailsInfo,
  DetailsInfoContent,
  DetailsInfoTexts,
  DetailsInfoTitle,
  MaDonhang,
  TableSection,
  TableTitle,
  Total,
  TotalValue,
} from "../phanquyen/bophankd/styledComponents";
import dssanpham from "../assets/icons/dssanpham.png";
import dscongcu from "../assets/icons/dscongcu.png";
import dsvattu from "../assets/icons/dsvattu.png";
import dsnglieu from "../assets/icons/dsnglieu.png";
import ten from "../assets/icons/ten.png";
import sdt from "../assets/icons/sdt.png";
import email from "../assets/icons/email.png";
import cmnd from "../assets/icons/cmnd.png";
import diachi from "../assets/icons/diachi.png";

const CustomModal = ({ open, setOpen, phanquyen, singleDonhang }) => {
  console.log({ phanquyen });
  const { dsDonhang, type, type2 } = phanquyen;
  const [value, setValue] = React.useState("1");
  const [tinhtrangTiendo, setTinhtrangTiendo] = React.useState(null);
  const [tinhtrangNhandon, setTinhtrangNhandon] = React.useState(null);
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: open ? 1 : 0,
    transform: open ? "translateY(0%)" : "translateY(-100%)",
    maxHeight: "80vh",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    getTinhtrangTiendo(newValue);
    getTinhtrangNhandon(newValue);
  };

  const getTinhtrangTiendo = (newValue) => {
    const tongSLDonhangGoc = singleDonhang?.tongsanpham;
    const selectedDonhang = dsDonhang.find((dh) => dh._id === newValue);
    let tongDanhan = 0;
    if (type === "hodan" || type === "hodanOnly") {
      tongDanhan = selectedDonhang?.dssanpham.reduce(
        (acc, sp) => acc + sp.soluonghoanthanh,
        0
      );
    } else {
      tongDanhan = selectedDonhang?.dssanpham.reduce(
        (acc, sp) => acc + (sp.danhan ? sp.danhan : 0),
        0
      );
    }
    let dl = {
      hoanthanh: `${tongDanhan}/${tongSLDonhangGoc}`,
      tile: ((tongDanhan / tongSLDonhangGoc) * 100).toFixed(2),
    };
    setTinhtrangTiendo(dl);
  };

  const getTinhtrangNhandon = (newValue) => {
    const tongSLDonhangGoc = singleDonhang?.tongsanpham;
    const selectedDonhang = dsDonhang.find((dh) => dh._id === newValue);
    const tile = selectedDonhang?.xacnhan
      ? ((selectedDonhang?.tongsanpham / tongSLDonhangGoc) * 100).toFixed(2)
      : 0;
    let dl = {
      xacnhan: selectedDonhang?.xacnhan,
      tile,
    };
    setTinhtrangNhandon(dl);
  };

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setOpen(false);
    }
  };

  useEffect(() => {
    setValue(dsDonhang[0]?._id);
    getTinhtrangTiendo(dsDonhang[0]?._id);
    getTinhtrangNhandon(dsDonhang[0]?._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dsDonhang]);

  return (
    <>
      {open ? (
        <Background ref={modalRef} onClick={closeModal}>
          <ModalContent>
            <animated.div style={animation}>
              <ModalCloseWrapper>
                <ModalCloseIcon onClick={() => setOpen((prev) => !prev)}>
                  <i class="fas fa-times"></i>
                </ModalCloseIcon>
              </ModalCloseWrapper>
              <ModalSection s??ch nguy??n li???u>
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        {dsDonhang.map((dh) => (
                          <Tab
                            label={
                              type === "gsv"
                                ? dh?.to.giamsatvung.ten
                                : type === "daily1" || type === "daily1Only"
                                ? dh?.to.daily1.ten
                                : type === "daily2" || type === "daily2Only"
                                ? dh?.to.daily2.ten
                                : type === "bpkd"
                                ? dh?.from.bophankd.ten
                                : type === "gsvOnly"
                                ? dh?.to.giamsatvung.ten
                                : dh?.to.hodan.daidien
                            }
                            value={dh._id}
                          />
                        ))}
                      </TabList>
                    </Box>
                    {dsDonhang.map((dh) => (
                      <TabPanel value={dh._id}>
                        <div>
                          <MaDonhang>
                            <span>M?? ????n h??ng:</span>
                            <span>{dh?.ma}</span>
                          </MaDonhang>

                          {type !== "bpkd" &&
                          type !== "gsvOnly" &&
                          type !== "daily1TDHT" &&
                          type !== "hodanOnly" &&
                          type !== "daily1Only" &&
                          type !== "daily2Only" ? (
                            <div className="d-flex justify-content-center">
                              <BoxInfo className="mr-5">
                                <BoxInfoTitle>
                                  {type === "gsv"
                                    ? "T??? b??? ph???n kinh doanh"
                                    : type === "daily1"
                                    ? "T??? gi??m s??t v??ng"
                                    : type === "daily2"
                                    ? "T??? ?????i l?? 1"
                                    : "T??? ?????i l?? 2"}
                                </BoxInfoTitle>

                                <table>
                                  {type === "daily1" ? (
                                    <>
                                      <tr>
                                        <td>
                                          <img src={ten} alt="ten" />
                                          <span>T??n:</span>
                                        </td>
                                        <td>{dh?.from.giamsatvung.ten}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={sdt} alt="sdt" />
                                          <span>S??T:</span>
                                        </td>
                                        <td>{dh?.from.giamsatvung.sdt}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={email} alt="email" />
                                          <span>Email:</span>
                                        </td>
                                        <td>{dh?.from.giamsatvung.email}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={diachi} alt="diachi" />
                                          <span>?????a ch???:</span>
                                        </td>
                                        <td>{`${dh?.from.giamsatvung.xa}, ${dh?.from.giamsatvung.huyen}, ${dh?.from.giamsatvung.tinh}`}</td>
                                      </tr>
                                    </>
                                  ) : type === "daily2" ? (
                                    <>
                                      <tr>
                                        <td>
                                          <img src={ten} alt="ten" />
                                          <span>T??n:</span>
                                        </td>
                                        <td>{dh?.from.daily1.ten}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={sdt} alt="sdt" />
                                          <span>S??T:</span>
                                        </td>
                                        <td>{dh?.from.daily1.sdt}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={email} alt="email" />
                                          <span>Email:</span>
                                        </td>
                                        <td>{dh?.from.daily1.email}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={diachi} alt="diachi" />
                                          <span>?????a ch???:</span>
                                        </td>
                                        <td>{`${dh?.from.daily1.xa}, ${dh?.from.daily1.huyen}, ${dh?.from.daily1.tinh}`}</td>
                                      </tr>
                                    </>
                                  ) : type === "gsv" ? (
                                    <>
                                      <tr>
                                        <td>
                                          <img src={ten} alt="ten" />
                                          <span>T??n:</span>
                                        </td>
                                        <td>{dh?.from.bophankd.ten}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={sdt} alt="sdt" />
                                          <span>S??T:</span>
                                        </td>
                                        <td>{dh?.from.bophankd.sdt}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={email} alt="email" />
                                          <span>Email:</span>
                                        </td>
                                        <td>{dh?.from.bophankd.email}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={diachi} alt="diachi" />
                                          <span>?????a ch???:</span>
                                        </td>
                                        <td>{`${dh?.from.bophankd.xa}, ${dh?.from.bophankd.huyen}, ${dh?.from.bophankd.tinh}`}</td>
                                      </tr>
                                    </>
                                  ) : (
                                    <>
                                      <tr>
                                        <td>
                                          <img src={ten} alt="ten" />
                                          <span>T??n:</span>
                                        </td>
                                        <td>{dh?.from.daily2.ten}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={sdt} alt="sdt" />
                                          <span>S??T:</span>
                                        </td>
                                        <td>{dh?.from.daily2.sdt}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={email} alt="email" />
                                          <span>Email:</span>
                                        </td>
                                        <td>{dh?.from.daily2.email}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={diachi} alt="diachi" />
                                          <span>?????a ch???:</span>
                                        </td>
                                        <td>{`${dh?.from.daily2.xa}, ${dh?.from.daily2.huyen}, ${dh?.from.daily2.tinh}`}</td>
                                      </tr>
                                    </>
                                  )}
                                </table>
                              </BoxInfo>

                              <BoxInfo className="ml-5">
                                <BoxInfoTitle>
                                  {type === "gsv"
                                    ? "T???i gi??m s??t v??ng"
                                    : type === "daily1"
                                    ? "T???i ?????i l?? c???p 1"
                                    : type === "daily2"
                                    ? "T???i ?????i l?? c???p 2"
                                    : "T???i h??? d??n"}
                                </BoxInfoTitle>

                                <table>
                                  {type === "daily1" ? (
                                    <>
                                      <tr>
                                        <td>
                                          <img src={ten} alt="ten" />
                                          <span>T??n:</span>
                                        </td>
                                        <td>{dh?.to.daily1.ten}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={sdt} alt="sdt" />
                                          <span>S??T:</span>
                                        </td>
                                        <td>{dh?.to.daily1.sdt}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={email} alt="email" />
                                          <span>Email:</span>
                                        </td>
                                        <td>{dh?.to.daily1.email}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={diachi} alt="diachi" />
                                          <span>?????a ch???:</span>
                                        </td>
                                        <td>{`${dh?.to.daily1.xa}, ${dh?.to.daily1.huyen}, ${dh?.to.daily1.tinh}`}</td>
                                      </tr>
                                    </>
                                  ) : type === "daily2" ? (
                                    <>
                                      <tr>
                                        <td>
                                          <img src={ten} alt="ten" />
                                          <span>T??n:</span>
                                        </td>
                                        <td>{dh?.to.daily2.ten}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={sdt} alt="sdt" />
                                          <span>S??T:</span>
                                        </td>
                                        <td>{dh?.to.daily2.sdt}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={email} alt="email" />
                                          <span>Email:</span>
                                        </td>
                                        <td>{dh?.to.daily2.email}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={diachi} alt="diachi" />
                                          <span>?????a ch???:</span>
                                        </td>
                                        <td>{`${dh?.to.daily2.xa}, ${dh?.to.daily2.huyen}, ${dh?.to.daily2.tinh}`}</td>
                                      </tr>
                                    </>
                                  ) : type === "gsv" ? (
                                    <>
                                      <tr>
                                        <td>
                                          <img src={ten} alt="ten" />
                                          <span>T??n:</span>
                                        </td>
                                        <td>{dh?.to.giamsatvung.ten}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={sdt} alt="sdt" />
                                          <span>S??T:</span>
                                        </td>
                                        <td>{dh?.to.giamsatvung.sdt}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={email} alt="email" />
                                          <span>Email:</span>
                                        </td>
                                        <td>{dh?.to.giamsatvung.email}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={diachi} alt="diachi" />
                                          <span>?????a ch???:</span>
                                        </td>
                                        <td>{`${dh?.to.giamsatvung.xa}, ${dh?.to.giamsatvung.huyen}, ${dh?.to.giamsatvung.tinh}`}</td>
                                      </tr>
                                    </>
                                  ) : (
                                    <>
                                      <tr>
                                        <td>
                                          <img src={ten} alt="ten" />
                                          <span>T??n:</span>
                                        </td>
                                        <td>{dh?.to.hodan.daidien}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={sdt} alt="sdt" />
                                          <span>S??T:</span>
                                        </td>
                                        <td>{dh?.to.hodan.sdt}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={cmnd} alt="cmnd" />
                                          <span>CMND:</span>
                                        </td>
                                        <td>{dh?.to.hodan.cmnd}</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <img src={diachi} alt="diachi" />
                                          <span>?????a ch???:</span>
                                        </td>
                                        <td>{`${dh?.to.hodan.xa}, ${dh?.to.hodan.huyen}, ${dh?.to.hodan.tinh}`}</td>
                                      </tr>
                                    </>
                                  )}
                                </table>
                              </BoxInfo>
                            </div>
                          ) : null}

                          <DetailsInfo className="mb-5 mt-0">
                            <DetailsInfoTitle>
                              {/* <img src={anh} alt="anh" /> */}
                              <h5>
                                {type2 === "TDHT"
                                  ? "T??nh tr???ng ti???n ?????"
                                  : "T??nh tr???ng nh???n ????n"}
                              </h5>
                            </DetailsInfoTitle>

                            <DetailsInfoContent>
                              <DetailsInfoTexts>
                                {type2 === "TDHT" ? (
                                  <table>
                                    <tr>
                                      <td>
                                        <span>Ho??n th??nh:</span>
                                      </td>
                                      <td>
                                        {tinhtrangTiendo?.hoanthanh} s???n ph???m
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <span>Chi???m t??? l???:</span>
                                      </td>
                                      <td>{tinhtrangTiendo?.tile} %</td>
                                    </tr>
                                  </table>
                                ) : (
                                  <table>
                                    <tr>
                                      <td>
                                        <span>X??c nh???n ????n h??ng:</span>
                                      </td>
                                      <td>
                                        {tinhtrangNhandon?.xacnhan
                                          ? "???? x??c nh???n"
                                          : "Ch??a"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <span>Chi???m t??? l???:</span>
                                      </td>
                                      <td>{tinhtrangNhandon?.tile} %</td>
                                    </tr>
                                  </table>
                                )}
                              </DetailsInfoTexts>
                            </DetailsInfoContent>
                          </DetailsInfo>
                        </div>

                        <TableSection className="noCheckbox">
                          <TableTitle>
                            <img src={dssanpham} alt="dssanpham" />
                            <span>Danh s??ch s???n ph???m</span>
                          </TableTitle>
                          <TableSanphamDonhangChitiet
                            dsSanpham={dh?.dssanpham.map((sp) => ({
                              ...sp.sanpham,
                              ...sp,
                            }))}
                            hodan={
                              type === "hodan" || type === "hodanOnly"
                                ? true
                                : false
                            }
                          />
                          <div className="text-right mb-5">
                            <Total>T???ng ????n gi??: </Total>
                            <TotalValue>
                              {formatMoney(dh?.tongdongia)} vn??
                            </TotalValue>
                          </div>
                        </TableSection>

                        <TableSection className="noCheckbox">
                          <TableTitle>
                            <img src={dscongcu} alt="dscongcu" />
                            <span>Danh s??ch c??ng c???</span>
                          </TableTitle>
                          <TableCongcuDonhang
                            dsCongcu={dh?.dscongcu.map((cc) => ({
                              ...cc,
                              ...cc.congcu,
                            }))}
                          />
                          <div className="text-right mb-3">
                            <Total>T???ng s??? l?????ng: </Total>
                            <TotalValue>{dh?.tongcongcu}</TotalValue>
                          </div>
                        </TableSection>

                        <TableSection className="noCheckbox">
                          <TableTitle>
                            <img src={dsvattu} alt="dsvattu" />
                            <span>Danh s??ch v???t t??</span>
                          </TableTitle>
                          <TableVattuDonhang
                            dsVattu={dh?.dsvattu.map((vt) => ({
                              ...vt,
                              ...vt.vattu,
                            }))}
                          />
                          <div className="text-right mb-3">
                            <Total>T???ng s??? l?????ng: </Total>
                            <TotalValue>{dh?.tongvattu}</TotalValue>
                          </div>
                        </TableSection>

                        <TableSection className="noCheckbox">
                          <TableTitle>
                            <img src={dsnglieu} alt="dsnglieu" />
                            <span>Danh s??ch nguy??n li???u</span>
                          </TableTitle>
                          <TableNguyenlieuDonhang
                            dsNguyenlieu={dh?.dsnguyenlieu.map((ngl) => ({
                              ...ngl,
                              ...ngl.nguyenlieu,
                            }))}
                          />
                          <div className="text-right mb-3">
                            <Total>T???ng kh???i l?????ng: </Total>
                            <TotalValue>{dh?.tongnguyenlieu} kg</TotalValue>
                          </div>
                        </TableSection>
                      </TabPanel>
                    ))}
                  </TabContext>
                </Box>
              </ModalSection>
            </animated.div>
          </ModalContent>
        </Background>
      ) : null}
    </>
  );
};

const Background = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled.div`
  background-color: #fff;
  width: 80%;
  height: 82%;
  border-radius: 4px;
  overflow-y: auto;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
`;
const ModalCloseWrapper = styled.div`
  text-align: right;
`;
const ModalCloseIcon = styled.div`
  display: inline-block;
  padding: 13px 24px;
  cursor: pointer;
  i {
    font-size: 28px;
    color: #666;
  }
`;
const ModalSection = styled.section`
  padding: 0 36px 36px 36px;
  .MuiButtonBase-root {
    outline: none;
  }
`;

export default CustomModal;
