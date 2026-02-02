import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const API_URL = "http://localhost:8080";


export const getAuthToken = () => {
    return localStorage.getItem('authToken');
}

export const setAuthToken = (token : string) => {
    localStorage.setItem('authToken', token);
}

export const clearAuthToken = () => {
    localStorage.removeItem("auth_token");
};


export const request = (method : string, url : string, data : any) => {
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== undefined) {
        headers = { Authorization: `Bearer ${getAuthToken()}` };
    }
    return axios({ method, url: `${API_URL}${url}`, data, headers });
}