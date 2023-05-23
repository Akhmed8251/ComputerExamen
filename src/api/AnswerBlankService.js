import axios from "axios";
import { API_URL } from "./config";

export default class AnswerBlankService {
    static async getAnswerBlankById(id) {
        const response = await axios.get(`${API_URL}/AnswerBlank/GetAnswerBlankById`, {
            params: {
                id: id
            },
            withCredentials: true
        })
        return response;
    }

    static async getAnswerBlankByExamenIdAndStudentId(examId, studentId) {
        const response = await axios.get(`${API_URL}/AnswerBlank/GetAnswerBlanksByExamenIdAndStudentId`, {
            params: {
                examId: examId,
                studentId: studentId
            },
            withCredentials: true
        })
        return response;
    }

    static async updateAnswerBlank(answerBlank) {
        const response = await axios.put(`${API_URL}/AnswerBlank/UpdateAnswerBlank`, answerBlank, {
            withCredentials: true
        })
        return response;
    }

    static async endExamenForStudent(examen) {
        const response = await axios.put(`${API_URL}/AnswerBlank/EndExamenForStudent`, examen, {
            withCredentials: true
        })
        return response;
    }
}