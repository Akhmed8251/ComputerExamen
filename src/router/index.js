import Examen from "../pages/student/Examen";
import Examens from "../pages/student/Examens";
import LoginStudent from "../pages/student/LoginStudent";
import CreateExamenForm from "../pages/teacher/CreateExamenForm";
import ListExamensTeacher from "../pages/teacher/ListExamensTeacher";
import LoginTeacher from "../pages/teacher/LoginTeacher";
import ExamenTeacher from "../pages/teacher/ExamenTeacher";
import CreateTicketsForm from "../pages/teacher/CreateTicketsForm";

export const privateStudentRoutes = [
    {path: '/examens/:id', element: <Examens />, exact: true},
    {path: '/examen/:id:examId', element: <Examen />, exact: true}
    
]

export const privateTeacherRoutes = [
    {path: '/teacher/examens/:id', element: <ListExamensTeacher />, exact: true},
    {path: '/teacher/create-examen', element: <CreateExamenForm />, exact: true},
    {path: '/teacher/create-tickets', element: <CreateTicketsForm />, exact: true},
    {path: '/teacher/examen/:id', element: <ExamenTeacher />, exact: true}
]

export const publicRoutes = [
    {path: '/', element: <LoginStudent />, exact: true},
    {path: '/teacher', element: <LoginTeacher />, exact: true}
]