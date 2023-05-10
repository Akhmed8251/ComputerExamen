import axios from "axios";
import { API_URL } from "./config";

export default class AnswerService {
    static async createAnswer(answer) {
        const response = await axios.post(`${API_URL}/Answer/CreateAnswer`, answer)
        return response;
    }

    static async editAnswer(answer) {
        const response = await axios.put(`${API_URL}/Answer/EditAnswer`, answer)
        return response;
    }
}