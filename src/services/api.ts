import axios from 'axios';

const api = axios.create({
    baseURL : 'http://sitis.herokuapp.com',
});


export default api;