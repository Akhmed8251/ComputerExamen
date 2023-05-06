import { useLocation } from 'react-router-dom'

const CreateTicketsForm = () => {
  const data = useLocation()
  const examData = data.state

  return (
    <section className='create-tickets'>
        <div className="container container--smaller">
            <h1 className='title'>Создание билетов</h1>
        </div>
    </section>
  )
}

export default CreateTicketsForm