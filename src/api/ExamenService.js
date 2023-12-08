import axios from "axios";
import { API_URL, getToken } from "./config";

export default class ExamenService {
    static async getExamensByStudentId(id) {
        const response = await axios.get(`${API_URL}/Examen/GetExamensByStudentId`, {
            params: {
                studentId: id
            },
            withCredentials: true
        })
        return response;
    }

    static async getExamensByEmployeeId(id) {
        const response = await axios.get(`${API_URL}/Examen/GetExamensByEmployeeId`, {
            params: {
                employeeId: id,
            },
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            withCredentials: true
        })
        return response;
    }

    static async getStudentsByExamenId(id) {
        const response = await axios.get(`${API_URL}/Examen/GetStudentsByExamenId`, {
            params: {
                examenId: id,
            },
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            withCredentials: true
        })
        return response;
    }

    static async startExamen(id, examenId) {
        const response = await axios.get(`${API_URL}/Examen/StartExamen`, {
            params: {
                studentId: id,
                examId: examenId
            },
            withCredentials: true
        })
        return response;
    }

    static async createExamen(examenData) {
        const response = await axios.post(`${API_URL}/Examen/CreateExamen`, examenData, {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            withCredentials: true
        })
        return response;
    }

    static async editExamen(examenData) {
        const response = await axios.post(`${API_URL}/Examen/UpdateExamen`, examenData, {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            withCredentials: true
        })
        return response;
    }

    static async deleteExamen(examenId) {
        const response = await axios.post(`${API_URL}/Examen/DeleteExamen?id=${examenId}`, {}, {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            withCredentials: true
        })
        return response;
    }

    static async copyExamen(examenId, newDateExamen) {
        const response = await axios.post(`${API_URL}/Examen/CopyExamen`, {
            examenId: examenId,
            newExamDate: newDateExamen
        }, {
            params: {
                examenId: examenId,
                newExamDate: newDateExamen
            },
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            withCredentials: true
        })
        return response;
    }

    static async getStudentsByExamenIdForChecking(examenId) {
        const response = await axios.get(`${API_URL}/Examen/GetStudentsByExamenIdForChecking`, {
            params: {
                examenId: examenId
            },
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            withCredentials: true
        })
        return response;
    }

    static async endExamenForEmployee(examenId) {
        const response = await axios.get(`${API_URL}/Examen/EndExamenForEmployee`, {
            params: {
                examId: examenId
            },
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            withCredentials: true
        })
        return response;
    }
}