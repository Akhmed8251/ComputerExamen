import React, { useState } from 'react'
import ExamenItem from './ExamenItem'
import Popup from '../ui/Popup'
import Button from '../ui/Button'
import QuestionItem from './QuestionItem'

const QuestionList = ({ questions }) => {
  const [modalActive, setModalActive] = useState(false)

  return (
    <ul className='questions__list'>
      {
        questions.map(question =>
          <QuestionItem key={question.id} question={question} />
        )
      }
  </ul>
  )
}

export default QuestionList