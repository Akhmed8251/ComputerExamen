import { useEffect, useContext, useState } from 'react';
import { AuthContext } from "../context";
import Select from '../components/ui/Select'
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import DsuService from '../api/DsuService'
import { useFetching } from '../hooks/useFetching'
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const LoginStudent = () => {
    const { setIsAuthStudent, setUserName, setStudentId } = useContext(AuthContext);

    const [faculties, setFaculties] = useState([])
    const [facultyId, setFacultyId] = useState(null)
    const [getFaculties, isFacultiesLoading, facError] = useFetching(async () => {
        const response = await DsuService.getFaculties()
        const dataArr = []
        response.data.forEach(dataItem => {
            dataArr.push({
                value: dataItem.facId,
                label: dataItem.facName
            })
        })

        setFaculties(dataArr)
    })
    useEffect(() => {
        getFaculties()
    }, [])


    const [departments, setDepartments] = useState([])
    const [departmentId, setDepartmentId] = useState(null)
    const [getDepartments, isDepartmentsLoading, depError] = useFetching(async (id) => {
        const response = await DsuService.getCaseSDepartmentByFacultyId(id)
        const dataArr = []
        response.data.forEach(dataItem => {
            dataArr.push({
                value: dataItem.departmentId,
                label: dataItem.deptName
            })
        })

        setDepartments(dataArr)
    })
    useEffect(() => {
        if (facultyId) {
            getDepartments(facultyId)
        }
    }, [facultyId])

    const [courses, setCourses] = useState([])
    const [course, setCourse] = useState(null)
    const [getCourses, isCoursesLoading, coursesError] = useFetching(async (id) => {
        const response = await DsuService.getCourseByDepartmentId(id)
        const dataArr = []
        response.data.sort((a, b) => a - b).forEach(dataItem => {
            dataArr.push({
                value: dataItem,
                label: dataItem
            })
        })

        setCourses(dataArr)
    })
    useEffect(() => {
        if (departmentId) {
            getCourses(departmentId)
        }
    }, [departmentId])

    const [groups, setGroups] = useState([])
    const [group, setGroup] = useState(null)
    const [getGroups, isGroupsLoading, groupsError] = useFetching(async (id, nCourse) => {
        const response = await DsuService.getGroupsByDepartmentIdAndCourse(id, nCourse)
        const dataArr = []
        response.data.forEach(dataItem => {
            dataArr.push({
                value: dataItem,
                label: dataItem
            })
        })

        setGroups(dataArr)
    })
    useEffect(() => {
        if (departmentId && course) {
            getGroups(departmentId, course)
        }
    }, [course])

    const [students, setStudents] = useState([])

    const [getStudents, isStudentsLoading, studentsError] = useFetching(async (id, nCourse, nGroup) => {
        const response = await DsuService.getStudentsByCourseAndGroup(id, nCourse, nGroup)
        const dataArr = []
        response.data.forEach(dataItem => {
            dataArr.push({
                value: dataItem.id,
                label: `${dataItem.lastname} ${dataItem.firstname} ${dataItem.patr}`
            })
        })

        setStudents(dataArr)
    })
    useEffect(() => {
        if (course && group) {
            getStudents(departmentId, course, group)
        }
    }, [course, group])

    const [nzachkn, setNzachkn] = useState(null)

    const { control, handleSubmit } = useForm({
        mode: "onSubmit"
    })

    const redirect = useNavigate()

    const [loginStudent, isSignLoading, signError] = useFetching(async (studentId, nzachkn) => {
        const response = await DsuService.signInStudent(studentId, nzachkn)

        if (response.status == 200) {
            setIsAuthStudent(true)
            localStorage.setItem("isAuthStudent", "true")

            let studentFio = students.find(s => s.value === studentId).label
            setUserName(studentFio)
            localStorage.setItem("userName", studentFio)

            setStudentId(studentId)
            localStorage.setItem("studentId", studentId)

            redirect(`/examens/${studentId}`)
        }
    })

    const login = (data) => {
        loginStudent(data.studentId, data.nzachkn)
    }

    return (
        <section className='login'>
            <div className='container'>
                <div className='login__inner'>
                    <h1 className='login__title title'>Введите ваши данные</h1>
                    <form className='form' onSubmit={handleSubmit(login)}>
                        <label className='form__label'>
                            <span className='form__text'>Факультет</span>
                            <Controller
                                control={control}
                                name='facultyId'
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <div className={error ? 'error' : ''}>
                                        <Select
                                            onChange={(newValue) => { setFacultyId(newValue.value); onChange(newValue.value) }}
                                            placeholder='Выберите факультет'
                                            options={faculties}
                                            isLoading={isFacultiesLoading}
                                            isDisabled={isFacultiesLoading}
                                        />
                                    </div>
                                )}
                            />
                        </label>
                        <label className='form__label'>
                            <span className='form__text'>Направление</span>
                            <Controller
                                control={control}
                                name='departmentId'
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <div className={error ? 'error' : ''}>
                                        <Select
                                            onChange={(newValue) => { setDepartmentId(newValue.value); onChange(newValue.value) }}
                                            placeholder='Выберите направление'
                                            options={departments}
                                            isLoading={isDepartmentsLoading}
                                            isDisabled={isDepartmentsLoading}
                                        />
                                    </div>
                                )}
                            />
                        </label>
                        <label className='form__label'>
                            <span className='form__text'>Курс</span>
                            <Controller
                                control={control}
                                name='course'
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <div className={error ? 'error' : ''}>
                                        <Select
                                            onChange={(newValue) => { setCourse(newValue.value); onChange(newValue.value) }}
                                            options={courses}
                                            isLoading={isCoursesLoading}
                                            isDisabled={isCoursesLoading}
                                        />
                                    </div>
                                )}
                            />
                        </label>
                        <label className='form__label'>
                            <span className='form__text'>Группа</span>
                            <Controller
                                control={control}
                                name='group'
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <div className={error ? 'error' : ''}>
                                        <Select
                                            onChange={(newValue) => { setGroup(newValue.value); onChange(newValue.value) }}
                                            options={groups}
                                            isLoading={isGroupsLoading}
                                            isDisabled={isGroupsLoading}
                                        />
                                    </div>
                                )}
                            />
                        </label>
                        <label className='form__label'>
                            <span className='form__text'>Номер зачетки</span>
                            <Controller
                                control={control}
                                name='nzachkn'
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <Input
                                        className={`form__input form__input--small${error ? ' error' : ''}`}
                                        onChange={(newValue) => { setNzachkn(newValue); onChange(newValue) }}
                                    />
                                )}
                            />
                        </label>
                        <label className='form__label'>
                            <span className='form__text'>ФИО</span>
                            <Controller
                                control={control}
                                name='studentId'
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <div className={error ? 'error' : ''}>
                                        <Select
                                            onChange={(newValue) => onChange(newValue.value)}
                                            options={students}
                                            isLoading={isStudentsLoading}
                                            isDisabled={isStudentsLoading}
                                            placeholder='Выберите ФИО'
                                        />
                                    </div>
                                )}
                            />

                        </label>
                        <Button className={`form__btn${isSignLoading ? ' loading' : ''}`} disabled={isSignLoading}>
                            <span>Войти</span>
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginStudent;
