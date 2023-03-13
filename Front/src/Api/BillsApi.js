import axios from "axios";

export const billsApi = axios.create({
    baseURL:'http://localhost:4000/api/Bills',
})