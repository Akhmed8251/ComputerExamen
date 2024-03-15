import { useContext, useEffect, useState } from 'react'
import StudentScoreList from '../../components/teacher/StudentScoreList'
import { AuthContext } from '../../context'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import ExamenService from '../../api/ExamenService'

const ExamenResults = () => {
  const { employeeId } = useContext(AuthContext)
  const { id } = useParams()
  const data = useLocation()
  const { course, group, deptName, examenName } = data.state

  const [studentsScore, setStudentsScore] = useState([])
  const [getStudentsScore, isScoreLoading, scoreError] = useFetching(async (examenId) => {
    const response = await ExamenService.getStudentsByExamenId(examenId)

    if (response.status == 200) {
      setStudentsScore(response.data)
    }
  })

  useEffect(() => {
    getStudentsScore(id)
  }, [])

  return (
    <section className='examen-results'>
      <div className="examen-results__container container container--smaller">
        <div className='back-link'>
          <Link to={`/teacher/examens/${employeeId}`}>
              <svg width="187" height="55" viewBox="0 0 187 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.7451 5.9399C11.3153 2.6184 14.6599 0.5 18.3338 0.5H177C182.247 0.5 186.5 4.7533 186.5 10V45C186.5 50.2467 182.247 54.5 177 54.5H18.3338C14.6599 54.5 11.3153 52.3816 9.7451 49.0601L1.47238 31.5601C0.257292 28.9897 0.257292 26.0103 1.47238 23.4399L5.95204 13.9637L9.7451 5.9399Z" stroke="#0050CF" />
              </svg>
              <span className="back-link__text">Экзамены</span>
          </Link>
        </div>
        <div className="examen-results__body">
          <h1 className='examen-results__title title'>{examenName}</h1>
          <div className="examen-results__data data">
            <span className='data__stage'>{`${course} курс ${group} группа`}</span>
            <span className='data__department'>{deptName}</span>
          </div>
          {isScoreLoading ? <div className='loader'>Идет загрузка результатов...</div> : <StudentScoreList deptName={deptName} scores={studentsScore} />}
        </div>
      </div>
    </section>
  )
}

export default ExamenResults