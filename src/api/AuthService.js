import axios from "axios";
import { API_URL } from "./config";

export default class AuthService {

    static async login(loginUser, passwordUser) {
        const response = await axios.post(`${API_URL}/Account/Login`, {
            login: loginUser,
            password: passwordUser
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
        return response;
    }

    // static async login(loginUser, passwordUser) {
    //     const response = await axios.post(`${API_URL}/Account/Login`, {
    //         login: loginUser,
    //         password: passwordUser
    //     }, {
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         withCredentials: true
    //     })
    //     return response;
    // }

    // static async logout() {
    //     const response = await axios.get(`${API_URL}/Account/Logout`, {
    //         headers: {
    //             "Authorization": `Bearer ${getToken()}`
    //         },
    //         withCredentials: true
    //     })
    //     return response;
    // }
}