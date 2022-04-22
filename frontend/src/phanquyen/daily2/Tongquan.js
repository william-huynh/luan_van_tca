import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import spln from "../../assets/icons/spln_2.png";
import hodan from "../../assets/icons/hodan2.png";
import { useSelector } from "react-redux";
import apiDaily2 from "../../axios/apiDaily2";
import { links } from "./arrayOfLinks";

const TongQuan = (props) => {
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState(null);
  const [count, setCount] = useState(0);
  const { userInfo } = useSelector((state) => state.user);
  let index = 0;
  const fetchData = async () => {
    setLoading(true);
    const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
    const data = await apiDaily2.tongquan(daily2._id);
    const { donhang } = await apiDaily2.dsDonhang(daily2._id);
    donhang.map((item) => {
      if (item.trangthai === true) index++;
    });
    setCount(index);
    setCounts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Wrapper>
      <Header title="Tổng quan" arrOfLinks={links} vaitro="daily2" />
      <Content>
        <div className="row mb-4">
          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/daily2/sanpham")}>
              <CardContent>
                <TextInfo>
                  <div>{counts?.dssanpham}</div>
                  <span>Sản phẩm</span>
                </TextInfo>
                <Icon>
                  <Image src={spln} alt="splangnghe" />
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/daily2/vattu")}>
              <CardContent>
                <TextInfo>
                  <div>{counts?.dsvattu}</div>
                  <span>Vật tư</span>
                </TextInfo>
                <Icon>
                  <i class="fab fa-accusoft"></i>
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/daily2/nguyenlieu")}>
              <CardContent>
                <TextInfo>
                  <div>{counts?.dsnguyenlieu}</div>
                  <span>Nguyên liệu</span>
                </TextInfo>
                <Icon>
                  <i class="fab fa-bandcamp"></i>
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/daily2/congcu")}>
              <CardContent>
                <TextInfo>
                  <div>{counts?.dscongcu}</div>
                  <span>Công cụ</span>
                </TextInfo>
                <Icon>
                  <i class="fas fa-tools"></i>
                </Icon>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/daily2/hodan")}>
              <CardContent>
                <TextInfo>
                  <div>{counts?.dshodan}</div>
                  <span>Hộ dân</span>
                </TextInfo>
                <Icon>
                  <Image src={hodan} alt="daily2" />
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/daily2/donhang")}>
              <CardContent>
                <TextInfo>
                  {/* <div>{counts?.dsdonhang}</div> */}
                  <div>{count}</div>
                  <span>Đơn hàng</span>
                </TextInfo>
                <Icon>
                  <i class="far fa-newspaper"></i>
                </Icon>
              </CardContent>
            </Card>
          </div>
        </div>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 26px 36px;
  font-family: "Poppins", sans-serif;
`;
const Card = styled.div`
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 24px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgb(0 0 20 / 8%), 0 1px 2px rgb(0 0 20 / 8%);
  cursor: pointer;
  &:hover {
    box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.2);
  }
`;
const CardContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TextInfo = styled.div`
  div {
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 4px;
    color: #0f73ba;
  }
  span {
    color: #777;
    font-size: 16px;
  }
`;
const Icon = styled.div`
  i {
    font-size: 40px;
    opacity: 0.3;
  }
`;
const Image = styled.img`
  width: 40px;
  opacity: 0.35;
`;

export default TongQuan;
