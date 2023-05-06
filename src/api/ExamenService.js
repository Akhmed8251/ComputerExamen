import axios from "axios";
import { API_URL } from "./config";

export default class ExamenService {
    static async getExamensByStudentId(id) {
        const response = await axios.get(`${API_URL}/Examen/GetExamensByStudentId`, {
            params: {
                studentId: id
            }
        })
        return response;
    }

    static async getExamensByEmployeeId(id) {
        const response = await axios.get(`${API_URL}/Examen/GetExamensByEmployeeId`, {
            params: {
                employeeId: id,
            }
        })
        return response;
    }

    static async startExamen(id, examenId) {
        const response = await axios.get(`${API_URL}/Examen/StartExamen`, {
            params: {
                studentId: id,
                examId: examenId
            }
        })
        return response;
    }
}