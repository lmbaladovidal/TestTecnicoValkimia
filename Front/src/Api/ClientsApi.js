import axios from "axios";

export const clientesApi = axios.create({
    baseURL:'http://localhost:4000/api/Clients',
})