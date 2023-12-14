import { useParams } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import ExamenService from '../../api/ExamenService'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context'
import ExamenListTeacher from '../../components/teacher/ExamenListTeacher'


const ListExamensTeacher = () => {
    const urlParams = useParams()
    const userId = urlParams.id

    const [examens, setExamens] = useState([])
    const [getExamensByAuditoriumId, isExamensLoading, examError] = useFetching(async (userId) => {
      const response = await ExamenService.getExamensByAuditoriumId(userId)

      if (response.status == 200) {
        setExamens(response.data)
      }
    })

    useEffect(() => {
      getExamensByAuditoriumId(userId)
    }, [])

  return (
    <section className='examens examens-teacher'>
        <div className="container container--smaller">
          {
            isExamensLoading ? <div className='loader'>Идет загрузка экзаменов...</div> : <ExamenListTeacher update={() => getExamensByAuditoriumId(userId)} setExams={setExamens} examens={examens} />
          }
        </div>
    </section>
  )
}

export default ListExamensTeacher