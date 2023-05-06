import { useEffect, useState } from 'react'
import ExamenList from '../../components/student/ExamenList'
import { useFetching } from '../../hooks/useFetching'
import { useParams } from 'react-router-dom'
import ExamenService from '../../api/ExamenService'

const Examens = () => {
  const [examens, setExamens] = useState([])
  const urlParams = useParams()
  const [getExamensByStudentId, isExamensLoading, examError] = useFetching(async (studentId) => {
    const response = await ExamenService.getExamensByStudentId(studentId)
    setExamens(response.data)
  })

  useEffect(() => {
    getExamensByStudentId(urlParams.id)
  }, [])

  // const examens = [
  //   {
  //     id: 1,
  //     discipline: "Дополнительные главы математического ана-лиза",
  //     examDate: "2023-04-26T18:20:51.129Z"
  //   },
  //   {
  //     id: 2,
  //     discipline: "Основы программирования",
  //     examDate: "2023-05-04T18:20:51.129Z"
  //   },
  //   {
  //     id: 3,
  //     discipline: "Основы программирования",
  //     examDate: "2023-02-11T18:20:51.129Z"
  //   }
  // ]

  return (
   <section className='examens'>
      <div className='container container--smaller'>
        <h1 className='examens__title title'>Эказмены</h1>
        {
          isExamensLoading ? <div>Идет загрузка экзаменов...</div> : <ExamenList examens={examens} studentId={urlParams.id} />
        }
      </div>
   </section>
  )
}

export default Examens