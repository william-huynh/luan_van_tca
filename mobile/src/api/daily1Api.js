import axiosClient from "./axiosClient";

const daily1Api = {
  getAll(params) {
    const url = "/api/daily1/danhsach";
    return axiosClient.get(url, { params });
  },
  dsDonhang(daily1Id) {
      const url = `/api/daily1/dsdonhang/${daily1Id}`;
      return axiosClient.get(url);
  },
  dsSanpham(daily1Id) {
    const url = `/api/daily1/dssanpham/${daily1Id}`;
    return axiosClient.get(url);
  },
  dsCongcu(daily1Id) {
    const url = `/api/daily1/dscongcu/${daily1Id}`;
    return axiosClient.get(url);
  },
  dsVattu(daily1Id) {
    const url = `/api/daily1/dsvattu/${daily1Id}`;
    return axiosClient.get(url);
  },
  dsNguyenlieu(daily1Id) {
    const url = `/api/daily1/dsnguyenlieu/${daily1Id}`;
    return axiosClient.get(url);
  },
}

export default daily1Api;
