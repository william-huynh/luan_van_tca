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
  dssubdonhangOfSingleDH(daily1Id, maDH) {
    const url = `/api/daily1/dssubdhofsingledh/${daily1Id}/${maDH}`;
    return axiosClient.get(url);
  },
  tiendoDonhang(daily1Id, maDH) {
    const url = `/api/daily1/tiendodonhang/${daily1Id}/${maDH}`;
    return axiosClient.get(url);
  },
}

export default daily1Api;
