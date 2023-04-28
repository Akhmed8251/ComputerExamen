import axios from "axios";
import { API_URL } from "./config";

export default class DsuService {
    static async getFaculties() {
        const response = await axios.get(`${API_URL}/`)
        return response;
    }

    static async getCaseSDepartmentByFacultyId(id) {
        const response = await axios.get(`${API_URL}/GetCaseSDepartmentByFacultyId`, {
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
