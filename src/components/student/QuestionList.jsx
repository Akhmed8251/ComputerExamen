import { useRef, useState } from 'react'
import { useFetching } from '../../hooks/useFetching'
import QuestionItem from './QuestionItem'
import AnswerService from '../../api/AnswerService'
import Button from '../ui/Button'
import AnswerBlankService from '../../api/AnswerBlankService'

const QuestionList = ({onUpdate, examenAnswers, questions, studentId, answerBlank, isStop }) => {
  const [questionIdLoading, setQuestionLoadingId] = useState(null)
  const questionItems = useRef([])
  // const [createAnswer, isAnswerLoading, ansError] = useFetching(async (answer) => {
  //   const response = await AnswerService.createAnswer(answer)

  //   if (response.status == 200) {
  //     setQuestionLoadingId(null)
  //     alert("Ответ принят!")
  //   } else {
  //     console.log(ansError)
  //   }
  // })

  // const [editAnswer, isEditAnswerLoading, ansEditError] = useFetching(async (answer) => {
  //   const response = await AnswerService.editAnswer(answer)

  //   if (response.status == 200) {
  //     setQuestionLoadingId(null)
  //     alert("Ответ принят!")
  //   } else {
  //     console.log(ansError)
  //   }
  // })

  

  const getAnswerQuestionById = (id) => {
    if (examenAnswers) {
      let textAnswer = examenAnswers.find(ans => ans.questionId == id)?.textAnswer
      if (textAnswer != null) {
        return textAnswer
      } else {
        return ''
      } 
    } else {
      return ''
    }
  } 

  // const onSaveAnswer = (questionId, textAnswer) => {
  //   createAnswer({
  //     id: 0,
  //     studentId: studentId,
  //     questionId: questionId,
  //     answerBlankId: answerBlank.id,
  //     textAnswer: textAnswer,
  //     createAnswerDate: new Date(),
  //     updateAnswerDate: null,
  //     isDeleted: false
  //   })
  // }

  // const onEditAnswer = (questionId, textAnswer) => {
  //   const answer = examenAnswers.find(e => e.questionId == questionId)
  //   answer.textAnswer = textAnswer
  //   answer.updateAnswerDate = new Date()
  //   editAnswer(answer)
  // }

  
    
    
  return (
    <>
      <ul className='questions__list'>
        {
          questions.map(question =>
            <QuestionItem 
              // ref={(element) => questionItems.current.push(element)}
              // onSave={(textAnswer) => {
              //   setQuestionLoadingId(question.id)
              //   onSaveAnswer(question.id, textAnswer)
              // }} 
              // onEdit={(textAns) => {
              //   setQuestionLoadingId(question.id)
              //   onEditAnswer(question.id, textAns)
              // }}
              key={question.id} 
              question={question} 
              answer={getAnswerQuestionById(question.id)} 
              //isLoading={isAnswerLoading && questionIdLoading == question.id} 
              //isDisabledButtons={isStop}
            />
          )
        }
      </ul>
    </>
  )
}

export default QuestionList