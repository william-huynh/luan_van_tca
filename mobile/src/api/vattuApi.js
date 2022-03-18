import axiosClient from "./axiosClient";

const vattuApi = {
    getVatTu(vattuId) {
        const url = `/api/vattu/single/${vattuId}`;
        return axiosClient.get(url);
    },
}

export default vattuApi;