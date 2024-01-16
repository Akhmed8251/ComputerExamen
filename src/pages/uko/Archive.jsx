import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { Controller, useForm } from "react-hook-form";
import Select from "../../components/ui/Select";
import DatePicker from "../../components/ui/DatePicker";
import Button from "../../components/ui/Button";
import DsuService from "../../api/DsuService";
import { useFetching } from "../../hooks/useFetching";
import ExamenService from "../../api/ExamenService";
import { parsingDate } from '../../utils/date'

const Archive = () => {
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


    const [archivedExamens, setArchivedExamens] = useState(null)
    const [getExamensFromArchive, isArchiveLoading, archiveErr] = useFetching(async (filter) => {
        const response = await ExamenService.getExamensFromArchiveByFilter(filter)
        if (response.status == 200) {
            setArchivedExamens(response.data)
        }
    })

    const { control, handleSubmit } = useForm({
        mode: "onSubmit"
    })

    const handleSubmitArchive = (data) => {
        const startDateInput = document.querySelector(".form__label--start-date .datepicker")
        data.startDate = parsingDate(startDateInput.value)

        const endDateInput = document.querySelector(".form__label--end-date .datepicker")
        data.endDate = parsingDate(endDateInput.value)

        getExamensFromArchive(data)
    }

    return (
        <section className='archive'>
            <div className="archive__container container">
                <h2 className="archive__title title">Архив</h2>
                <form className='archive__form form' style={{ marginBottom: 20 }} onSubmit={handleSubmit(handleSubmitArchive)}>
                    <label className='form__label' onClick={(evt) => evt.preventDefault()}>
                        <span className='form__text'>Факультет</span>
                        <Controller
                            control={control}
                            name='facultyId'
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
                    <label className='form__label' onClick={(evt) => evt.preventDefault()}>
                        <span className='form__text'>Начальная дата</span>
                        <Controller
                            control={control}
                            name='startDate'
                            render={({ field: { onChange } }) => (
                                <div className="form__label--start-date">
                                    <DatePicker
                                        showTimeSelect={false}
                                        onChange={(newDate) => onChange(newDate)}
                                    />
                                </div>
                            )}
                        />
                    </label>
                    <label className='form__label' onClick={(evt) => evt.preventDefault()}>
                        <span className='form__text'>Конечная дата</span>
                        <Controller
                            control={control}
                            name='endDate'
                            render={({ field: { onChange } }) => (
                                <div className="form__label--end-date">
                                    <DatePicker
                                        showTimeSelect={false}
                                        onChange={(newDate) => onChange(newDate)}
                                    />
                                </div>
                            )}
                        />
                    </label>
                    <Button><span>Просмотреть экзамены из архива</span></Button>
                </form>
                <div className="archive__examens examens">
                    {
                        isArchiveLoading ? <div>Загрузка данных...</div>
                            :
                            archivedExamens?.length > 0 
                            &&
                                <ul className="examens__list">
                                    {
                                        archivedExamens?.map((examen, idx) => (
                                            <li key={idx} className='examens__item examens__item--passed'>
                                                <div className="examens-item__btns">
                                                    <Link to={`/uko/examen-results/${examen.examenId}`} state={{ course: examen.course, group: examen.group, deptName: examen.department.deptName, examenName: examen.discipline }} className='discipline-btn'>{examen.discipline}</Link>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                    }
                </div>
            </div>
        </section>
    )
}

export default Archive