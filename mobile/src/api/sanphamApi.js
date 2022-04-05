import axiosClient from "./axiosClient";

const sanphamApi = {
    getSanPham(daily1Id,id) {
        const url = `/api/daily1/dsdonhang/${daily1Id}`;
        return axiosClient.get(url);
    },
    test(daily1Id,id) {
        const url = `/api/daily1/dssanpham/${daily1Id}/`;       
        return axiosClient.get(url);
      },
    trying(){
        const url = `/api/daily1/dssanpham/619850e470f1c5e298936ce8`;
        return axiosClient.get(url);
    }
}

export default sanphamApi;