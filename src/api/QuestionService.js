import axios from "axios";
import { API_URL } from "./config";

export default class QuestionService {
    static async deleteQuestion(id) {
        const response = await axios.delete(`${API_URL}/Question/DeleteQuestion`, {
            params: {
                id: id
            },
            withCredentials: true
        })
        return response;
    }
}