import axios from "axios";
import { API_URL } from "./config";

export default class QuestionService {
    static async deleteQuestion(id) {
        const response = await axios.post(`${API_URL}/Question/DeleteQuestion?id=${id}`, {
            params: {
                id: id
            },
            withCredentials: true
        })
        return response;
    }
}