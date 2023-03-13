import axios from "axios";

export const ciudadesApi = axios.create({
    baseURL:'http://localhost:4000/api/Cities',
})