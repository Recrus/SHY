import axios, { AxiosInstance } from "axios";
import { Config } from "../../types/types";

const config: Config = {
    baseURL: "http://SHY.test/api/v1",
    headers: {
        "Content-Type": "application/vnd.api+json",
    },
};

const axiosFetch: AxiosInstance = axios.create(config);
export default axiosFetch;
