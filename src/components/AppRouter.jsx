import {useContext} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {privateStudentRoutes, privateTeacherRoutes, publicRoutes} from '../router';
import {AuthContext} from '../context';

const AppRouter = () => {
    const {isAuthStudent, isAuthTeacher, isLoading, studentId, employeeId } = useContext(AuthContext);

    if (isLoading) {
        return <div className='loading'>13233</div>
    }

    return (
        isAuthStudent
            ?
            <Routes>
                {privateStudentRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route
                    element={<Navigate to={`/examens/${studentId}`} />}
                    path='*'
                    exact={true}
                />
            </Routes>
            :
        isAuthTeacher
            ?
            <Routes>
                {privateTeacherRoutes.map(route =>
                    <Route  
                        element={route.element}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route
                    element={<Navigate to={`/teacher/examens/${employeeId}`} />}
                    path='*'
                    exact={true}
                />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route  
                        element={route.element}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route
                    element={<Navigate to='/' />}
                    path='*'
                    exact={true}
                />
            </Routes>
    );
};

export default AppRouter;
