import { useEffect, useContext, useState } from 'react';
import {AuthContext} from "../../context";
import Select from '../../components/ui/Select'
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import DsuService from '../../api/DsuService'
import {useFetching} from '../../hooks/useFetching'

const LoginStudent = () => {
    const {setIsAuthStudent, setUserName} = useContext(AuthContext);

    const [faculties, setFaculties] = useState([])
    const [facultyId, setFacultyId] = useState(null)
    const [getFaculties, isFacultiesLoading, facError] = useFetching(async () => {
        const response = await DsuService.getFaculties()
        setFaculties(response.data)
    })
    useEffect(() => {
        getFaculties()
    }, [])


    const [departments, setDepartments] = useState([])
    const [departmentId, setDepartmentId] = useState(null)
    const [getDepartments, isDepartmentsLoading, depError] = useFetching(async (id) => {
        const response = await DsuService.getCaseSDepartmentByFacultyId(id)
        setDepartments(response.data)
    })
    useEffect(() => {
        if (facultyId) {
            getDepartments(facultyId)
        }
    }, [facultyId])

    const login = () => {
        setIsAuthStudent(true);
        localStorage.setItem('isAuthStudent', 'true')

        setUserName('Носова Елена Андреевна')
        localStorage.setItem('userName', 'Носова Елена Андреевна')
    }

    return (
        <section className='login'>
            <div className='container'>
                <div className='login__inner'>
                    <h1 className='login__title title'>Введите ваши данные</h1>
                    <form className='form'>
                        <label className='form__label'>
                            <span className='form__text'>Факультет</span>
                            <Select placeholder='Выберите факультет' options={faculties} isLoading={isFacultiesLoading} isDisabled={isFacultiesLoading} />
                        </label>
                        <label className='form__label'>
                            <span className='form__text'>Направление</span>
                            <Select placeholder='Выберите направление' options={departments} isLoading={isDepartmentsLoading} isDisabled={isDepartmentsLoading} />
                        </label>
                        <div className='form__row'>
                            <label className='form__label form__label--small'>
                                <span className='form__text'>Курс</span>
                                <Select />
                            </label>
                            <label className='form__label form__label--small'>
                                <span className='form__text'>Группа</span>
                                <Select />
                            </label>
                        </div>
                        <label className='form__label'>
                            <span className='form__text'>Номер зачетки</span>
                            <Input className='form__input form__input--small' />
                        </label>
                        <label className='form__label'>
                            <span className='form__text'>ФИО</span>
                            <Select placeholder='Выберите ФИО' />
                        </label>
                        <Button type="button" onClick={() => login()} className='form__btn'>
                            Войти
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginStudent;
