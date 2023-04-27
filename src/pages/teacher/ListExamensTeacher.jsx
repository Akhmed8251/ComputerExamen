import React from 'react'
import Button from '../../components/ui/Button'
import ExamenList from '../../components/student/ExamenList'
import ExamenListTeacher from '../../components/teacher/ExamenListTeacher'

const ListExamensTeacher = () => {
    const examens = [
        {
          id: 1,
          discipline: "Дополнительные главы математического ана-лиза",
          examDate: "2023-04-26T18:20:51.129Z",
          course: 1,
          nGroup: 4,
          department: "Фундаментальная физика"    
        },
        {
          id: 2,
          discipline: "Основы программирования",
          examDate: "2023-04-27T18:20:51.129Z",
          course: 2,
          nGroup: 2,
          department: "Фундаментальная физика"   
        },
        {
          id: 3,
          discipline: "Основы программирования",
          examDate: "2023-02-11T18:20:51.129Z",
          course: 3,
          nGroup: 1,
          department: "Фундаментальная физика"   
        }
    ]

  return (
    <section className='examens examens-teacher'>
        <div className="container container--smaller">
            <h1 className='title'>Экзамены</h1>
            <Button className='examens-teacher__btn'>Создать экзамен</Button>
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