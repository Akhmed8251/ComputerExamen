import Examen from "../pages/student/Examen";
import Examens from "../pages/student/Examens";
import LoginStudent from "../pages/LoginStudent";
import CreateExamenForm from "../pages/uko/CreateExamenForm";
import ListExamensTeacher from "../pages/teacher/ListExamensTeacher";
import LoginAdmin from "../pages/LoginAdmin";
import ExamenTeacher from "../pages/teacher/ExamenTeacher";
import CreateTicketsForm from "../pages/uko/CreateTicketsForm";
import ExamenResults from '../pages/teacher/ExamenResults'
import EditExamenForm from "../pages/uko/EditExamenForm";
import EditTicketsForm from "../pages/uko/EditTicketsForm";
import AnswersCheckTeacher from "../pages/teacher/AnswersCheckTeacher";
import StudentAnswers from "../pages/teacher/StudentAnswers"
import UkoPage from "../pages/uko/UkoPage";

export const privateStudentRoutes = [
    {path: '/examens/:id', element: <Examens />, exact: true},
    {path: '/examen/:id', element: <Examen />, exact: true}
    
]

export const privateAdminRoutes = [
    {path: '/teacher/examens/:id', element: <ListExamensTeacher />, exact: true},
    {path: '/teacher/examen/:id', element: <ExamenTeacher />, exact: true},
    {path: '/teacher/answers-check', element: <AnswersCheckTeacher />, exact: true},
    {path: '/teacher/examen-results/:id', element: <ExamenResults />, exact: true},
    {path: '/teacher/student-answers', element: <StudentAnswers />, exact: true}
]

export const privateUkoRoutes = [
    {path: '/uko/:id', element: <UkoPage />, exact: true},
    {path: '/uko/create-examen', element: <CreateExamenForm />, exact: true},
    {path: '/uko/create-tickets', element: <CreateTicketsForm />, exact: true},
    {path: '/uko/edit-examen', element: <EditExamenForm />, exact: true},
    {path: '/uko/edit-tickets', element: <EditTicketsForm />, exact: true}
]

export const publicRoutes = [
    {path: '/', element: <LoginStudent />, exact: true},
    {path: '/admin', element: <LoginAdmin />, exact: true}
]