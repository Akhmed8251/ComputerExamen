import Button from '../../components/ui/Button'
import ExamenList from '../../components/student/ExamenList'
import { Link, useParams } from 'react-router-dom'
import ExamenListTeacher from '../../components/teacher/ExamenListTeacher'
import { useFetching } from '../../hooks/useFetching'
import ExamenItemTeacher from '../../components/teacher/ExamenItemTeacher'
import Examens from '../student/Examens'
import ExamenService from '../../api/ExamenService'
import { useEffect, useState } from 'react'

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
    // const examens = [
    //     {
    //       id: 1,
    //       discipline: "Дополнительные главы математического ана-лиза",
    //       examDate: "2023-04-26T18:20:51.129Z",
    //       course: 1,
    //       nGroup: 4,
    //       department: "Фундаментальная физика"    
    //     },
    //     {
    //       id: 2,
    //       discipline: "Основы программирования",
    //       examDate: "2023-05-04T18:20:51.129Z",
    //       course: 2,
    //       nGroup: 2,
    //       department: "Фундаментальная физика"   
    //     },
    //     {
    //       id: 3,
    //       discipline: "Основы программирования",
    //       examDate: "2023-02-11T18:20:51.129Z",
    //       course: 3,
    //       nGroup: 1,
    //       department: "Фундаментальная физика"   
    //     }
    // ]

  return (
    <section className='examens examens-teacher'>
        <div className="container container--smaller">
            <h1 className='title'>Экзамены</h1>
            <Link to={`/teacher/create-examen`} className='examens-teacher__btn btn'>Создать экзамен</Link>
            <ExamenListTeacher examens={examens}/>
            <div className="examens-teacher__passed">
                <h2 className='title'>Пройденные</h2>
                <ExamenListTeacher examens={examens} />
            </div>
        </div>
    </section>
  )
}

export default ListExamensTeacher