import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import {AuthContext} from "./context";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';

const App = () => {
  const [isAuthStudent, setIsAuthStudent] = useState(false);
  const [isAuthTeacher, setIsAuthTeacher] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('isAuthStudent')) {
      setIsAuthStudent(true)
      setUserName(localStorage.getItem('userName'))
    } else if (localStorage.getItem('isAuthTeacher')) {
      setIsAuthTeacher(true)
      setUserName(localStorage.getItem('userName'))
    }

    setLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuthStudent,
      setIsAuthStudent,
      isAuthTeacher,
      setIsAuthTeacher,
      userName,
      setUserName,
      isLoading  
    }}>
      <BrowserRouter>
        <div className="site-wrapper">
          <Header />
          <main>
            <AppRouter />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App