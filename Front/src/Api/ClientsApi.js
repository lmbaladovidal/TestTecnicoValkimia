import axios from "axios";
const config = {
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
  };
export const clientesApi = axios.create({
    baseURL:'http://localhost:4000/api/Clients',config
})