import axios from "axios";

let config = {
    baseURL: "http://SHY.test/api/v1",
    headers: {
        "Content-Type": "application/vnd.api+json",
    },
};

const axiosFetch = axios.create(config);
export default axiosFetch;
