import Select from '../../components/ui/Select'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import DatePicker from '../../components/ui/DatePicker'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useFetching } from '../../hooks/useFetching'
import DsuService from '../../api/DsuService'
import { Controller, useForm } from 'react-hook-form';

const EditExamenForm = () => {
    const data = useLocation()
    const examData = data.state

    const [faculties, setFaculties] = useState([])
    const [facultyId, setFacultyId] = useState(examData.department.facId)
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
    const [departmentId, setDepartmentId] = useState(examData.department.departmentId)
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
    const [course, setCourse] = useState(examData.course)
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
    const [group, setGroup] = useState(examData.group)
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
    }, [departmentId, course])

    const { control, handleSubmit } = useForm({
        mode: "onSubmit",
        defaultValues: {
            facultyId: examData.department.facId,
            departmentId: examData.department.departmentId,
            course: examData.course,
            nGroup: examData.group,
            discipline: examData.discipline,
            examDate: examData.examDate
        }
    })

    const redirect = useNavigate()

    const onSubmit = (data) => {
        if (!data.examDate) {
            data.examDate = new Date()
        }
        data.isDeleted = false

        redirect(`/teacher/edit-tickets`, {
            state: data
        })
    }

    return (
        <section className='create-examen'>
            <div className="container container--smaller">
                <div className="create-examen__inner">
                    <h1 className="create-examen__title title">Редактирование экзамена</h1>
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <label className='form__label'>
                            <span className='form__text'>Факультет</span>
                            <Controller
                                control={control}
                                name='facultyId'
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <div className={error ? 'error' : ''}>
                                        <Select
                                            value={
                                                {
                                                    label: faculties[faculties.map(x => x.value).indexOf(facultyId)]?.label,
                                                    value: facultyId
                                                }
                                            }
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
                                            value={
                                                {
                                                    label: examData.department.deptName,
                                                    value: departmentId
                                                }
                                            }
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
                                            value={
                                                {
                                                    label: course,
                                                    value: course
                                                }
                                            }
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
                                name='nGroup'
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <div className={error ? 'error' : ''}>
                                        <Select
                                            value={
                                                {
                                                    label: group,
                                                    value: group
                                                }
                                            }
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
                            <span className='form__text'>Дисциплина</span>
                            <Controller
                                control={control}
                                name='discipline'
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <Input
                                        value={examData.discipline}
                                        className={`form__input${error ? ' error' : ''}`}
                                        onChange={(newValue) => onChange(newValue)}
                                    />
                                )}
                            />
                        </label>
                        <label className='form__label' onClick={(evt) => evt.preventDefault()}>
                            <span className='form__text'>Дата</span>

                            <Controller
                                control={control}
                                name='examDate'
                                render={({ field: { onChange } }) => (
                                    <div>
                                        <DatePicker
                                            selected={new Date(examData.examDate)}
                                            onChange={(newDate) => onChange(newDate)}
                                        />
                                    </div>
                                )}
                            />
                        </label>
                        <label className='form__label' onClick={(evt) => evt.preventDefault()}>
                            <span className='form__text'>Длительность в минутах</span>

                            <Controller
                                control={control}
                                name='examDurationInMitutes'
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange }, fieldState: { error } }) => (
                                    <Input
                                        type="number"
                                        value={examData.examDurationInMitutes}
                                        className={`form__input${error ? ' error' : ''}`}
                                        onChange={(newValue) => { onChange(newValue) }}
                                    />
                                )}
                            />
                        </label>
                        <label className="form__label">
                            <Button className='form__btn-questions btn'>Изменить вопросы</Button>
                        </label>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default EditExamenForm