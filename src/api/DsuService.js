import axios from "axios";
import { API_URL } from "./config";

export default class DsuService {
    static async getFaculties() {
        const response = await axios.get(`${API_URL}/Dsu/GetFaculties`, {
            withCredentials: true
        })
        return response;
    }

    static async getCaseSDepartmentByFacultyId(id) {
        const response = await axios.get(`${API_URL}/Dsu/GetCaseSDepartmentByFacultyId`, {
            params: {
                facultyId: id
            },
            withCredentials: true
        })
        return response;
    }

    static async getCourseByDepartmentId(id) {
        const response = await axios.get(`${API_URL}/Dsu/GetCourseByDepartmentId`, {
            params: {
                departmentId: id
            },
            withCredentials: true
        })
        return response;
    }
    
    static async getGroupsByDepartmentIdAndCourse(id, nCourse) {
        const response = await axios.get(`${API_URL}/Dsu/GetGroupsByDepartmentIdAndCourse`, {
            params: {
                departmentId: id,
                course: nCourse
            },
            withCredentials: true
        })
        return response;
    }

    static async getStudentsByCourseAndGroup(departmentId, nCourse, nGroup) {
        const response = await axios.get(`${API_URL}/Dsu/GetStudentsByCourseAndGroup`, {
            params: {
                departmentId: departmentId,
                course: nCourse,
                ngroup: nGroup
            },
            withCredentials: true
        })
        return response;
    }

    static async signInStudent(studentId, nzachkn) {
        const response = await axios.post(`${API_URL}/Dsu/SignInStudent`, {
            studentId: studentId,
            nzachkn: nzachkn
        }, {
            params: {
                studentId: studentId,
                nzachkn: nzachkn
            },
            withCredentials: true
        })

        return response;
    }
}