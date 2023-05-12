import Button from '../../components/ui/Button'
import ExamenList from '../../components/student/ExamenList'
import { Link, useParams } from 'react-router-dom'
import ExamenListTeacher from '../../components/teacher/ExamenListTeacher'
import { useFetching } from '../../hooks/useFetching'
import ExamenItemTeacher from '../../components/teacher/ExamenItemTeacher'
import Examens from '../student/Examens'
import ExamenService from '../../api/ExamenService'
import { useEffect, useState } from 'react'
import Countdown from '../../components/ui/Countdown'

const ListExamensTeacher = () => {
    const urlParams = useParams()
    const userId = urlParams.id

    const [examens, setExamens] = useState([])
    const [getExamensByEmployeeId, isExamensLoading, examError] = useFetching(async (userId) => {
      const response = await ExamenService.getExamensByEmployeeId(userId)

      if (response.status == 200) {
        setExamens(response.data)
      }
    })

    useEffect(() => {
      getExamensByEmployeeId(userId)
    }, [])

  return (
    <section className='examens examens-teacher'>
        <div className="container container--smaller">
            <Link to={`/teacher/create-examen`} className='examens-teacher__btn btn'>Создать экзамен</Link>
            {isExamensLoading ? <div className='loader'>Идет загрузка экзаменов...</div> : <ExamenListTeacher setExams={setExamens} examens={examens} />}
        </div>
    </section>
  )
}

export default ListExamensTeacher