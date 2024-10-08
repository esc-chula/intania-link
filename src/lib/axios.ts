import axios from "axios";

export const axiosNocoDB = axios.create({
    baseURL: `${process.env.NOCODB_API_ENDPOINT}/api/v2/tables`,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
        "xc-token": process.env.NOCODB_API_TOKEN,
    },
});
