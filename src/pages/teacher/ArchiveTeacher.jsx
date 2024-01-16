import { useState, useEffect, useContext } from "react";
import {Link} from 'react-router-dom'
import { useFetching } from "../../hooks/useFetching";
import ExamenService from "../../api/ExamenService";
import {AuthContext} from "../../context";

const ArchiveTeacher = () => {
    const {employeeId} = useContext(AuthContext)
    const [archivedExamens, setArchivedExamens] = useState(null)
    const [getExamensFromArchive, isArchiveLoading, archiveErr] = useFetching(async (employeeId) => {
        const response = await ExamenService.getExamensFromArchiveByAuditoriumId(employeeId)
        if (response.status == 200) {
            setArchivedExamens(response.data)
        }
    })

    useEffect(() => {
        getExamensFromArchive(employeeId)
    }, [])

    return (
        <section className='archive'>
            <div className="archive__container container">
                <h2 className="archive__title title">Архив</h2>
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
                                                    <Link to={`/teacher/examen-results/${examen.examenId}`} state={{ course: examen.course, group: examen.group, deptName: examen.department.deptName, examenName: examen.discipline }} className='discipline-btn'>{examen.discipline}</Link>
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

export default ArchiveTeacher