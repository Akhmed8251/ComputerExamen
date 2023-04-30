import axios from "axios";
import { API_URL } from "./config";

export default class DsuService {
    static async getFaculties() {
        const response = await axios.get(`${API_URL}/Dsu/GetFaculties`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        return response;
    }

    static async getCaseSDepartmentByFacultyId(id) {
        const response = await axios.get(`${API_URL}/Dsu/GetCaseSDepartmentByFacultyId`, {
            params: {
                facultyId: id
            }
        })
        return response;
    }

    static async getCourseByDepartmentId(id) {
        const response = await axios.get(`${API_URL}/GetCourseByDepartmentId`, {
            params: {
                departmentId: id
            }
        })
        return response;
    }
}
