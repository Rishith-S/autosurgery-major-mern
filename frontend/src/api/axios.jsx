import axios from "axios";
const URL='http://localhost:5001';
// const URL = ''

export default axios.create({
    baseURL:URL,
    withCredentials:true
})

export const axiosPrivate=axios.create({
    baseURL:URL,
    withCredentials:true
})