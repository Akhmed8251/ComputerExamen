import Examen from "../pages/student/Examen";
import Examens from "../pages/student/Examens";
import LoginStudent from "../pages/student/LoginStudent";
import CreateExamenForm from "../pages/teacher/CreateExamenForm";
import ListExamensTeacher from "../pages/teacher/ListExamensTeacher";
import LoginTeacher from "../pages/teacher/LoginTeacher";

export const privateStudentRoutes = [
    {path: '/examens', element: <Examens />, exact: true},
    {path: '/examen/:id', element: <Examen />, exact: true},
    
]

export const privateTeacherRoutes = [
    {path: '/teacher/examens', element: <ListExamensTeacher />, exact: true},
    {path: '/teacher/create-examen', element: <CreateExamenForm />, exact: true}
]

export const publicRoutes = [
    {path: '/', element: <LoginStudent />, exact: true},
    {path: '/teacher', element: <LoginTeacher />, exact: true}
]