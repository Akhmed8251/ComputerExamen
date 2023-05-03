import { useState } from 'react'
import ExamenList from '../../components/student/ExamenList'

const Examens = () => {
  const examens = [
    {
      id: 1,
      discipline: "Дополнительные главы математического ана-лиза",
      examDate: "2023-04-26T18:20:51.129Z"
    },
    {
      id: 2,
      discipline: "Основы программирования",
      examDate: "2023-04-27T18:20:51.129Z"
    },
    {
      id: 3,
      discipline: "Основы программирования",
      examDate: "2023-02-11T18:20:51.129Z"
    }
  ]

  return (
   <section className='examens'>
      <div className='container container--smaller'>
        <h1 className='examens__title title'>Эказмены</h1>
        <ExamenList examens={examens} />
      </div>
   </section>
  )
}

export default Examens