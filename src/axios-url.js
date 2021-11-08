import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost/collegeapi/'
});
export default instance;