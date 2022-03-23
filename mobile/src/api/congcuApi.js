import axiosClient from "./axiosClient";

const congcuApi = {
    getCongCu(congcuId) {
        const url = `/api/congcu/single/${congcuId}`;
        return axiosClient.get(url);
    },
}

export default congcuApi;