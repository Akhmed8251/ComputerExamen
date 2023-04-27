import { useState, useEffect } from 'react';
import './assets/css/style.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ExamenList from './components/student/ExamenList';
import LoginStudent from './pages/student/LoginStudent';
import {AuthContext} from "./context";
import Examens from './pages/student/Examens';
import Countdown from './components/ui/Countdown';
import Examen from './pages/student/Examen';
import LoginTeacher from './pages/teacher/LoginTeacher';
import ListExamensTeacher from './pages/teacher/ListExamensTeacher';
import CreateExamenForm from './pages/teacher/CreateExamenForm';
import ExamenTeacher from './pages/teacher/ExamenTeacher';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <div className="site-wrapper">
        <Header />
        <main>
          <ExamenTeacher />
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  )
}

export default App