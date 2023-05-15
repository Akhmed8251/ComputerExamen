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

    static async createExamen(examenData) {
        const response = await axios.post(`${API_URL}/Examen/CreateExamen`, examenData)
        return response;
    }

    static async editExamen(examenData) {
        const response = await axios.put(`${API_URL}/Examen/UpdateExamen`, examenData)
        return response;
    }

    static async deleteExamen(examenId) {
        const response = await axios.delete(`${API_URL}/Examen/DeleteExamen`, {
            params: {
                id: examenId
            }
        })
        return response;
    }

    static async getStudentsByExamenIdForChecking(examenId) {
        const response = await axios.get(`${API_URL}/Examen/GetStudentsByExamenIdForChecking`, {
            params: {
                examenId: examenId
            }
        })
        return response;
    }
}