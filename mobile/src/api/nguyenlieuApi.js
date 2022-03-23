import axiosClient from "./axiosClient";

const nguyenlieuApi = {
    getNguyenLieu(nguyenlieuId) {
        const url = `/api/nguyenlieu/single/${nguyenlieuId}`;
        return axiosClient.get(url);
    },
}

export default nguyenlieuApi;