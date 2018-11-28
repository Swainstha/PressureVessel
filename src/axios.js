import axios from 'axios';

const instance = axios.create({
    baseURL : "http://192.168.1.67:8000"
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN';

export default instance;
