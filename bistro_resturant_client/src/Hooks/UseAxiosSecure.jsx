import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UseAuth from './UseAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const UseAxiosSecure = () => {

    const navigate = useNavigate();
    const { logOut } = UseAuth();

    // request interceptor to add authorization header to every secure request to backend api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');

        // console.log('request stopped by interceptors');

        if (token) {
            config.headers.authorization = `Bearer ${token}`
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    })

    // interceptor 401 and 403 error handling
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async function (error) {
        // for 401 and 403, log out and redirect to login
        if (error.response.status === 401 || error.response.status === 403) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default UseAxiosSecure;