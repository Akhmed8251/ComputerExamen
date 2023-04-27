import React from 'react'
import Select from '../../components/ui/Select'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import DatePicker from '../../components/ui/DatePicker'

const CreateExamenForm = () => {
  return (
    <section className='create-examen'>
        <div className="container container--smaller">
            <div className="create-examen__inner">
                <h1 className="create-examen__title title">Создать экзамен</h1>
                <form className='form'>
                    <label className='form__label'>
                        <span className='form__text'>Направление</span>
                        <Select placeholder='Выберите направление' />
                    </label>
                    <div className='form__row'>
                        <label className='form__label form__label--small'>
                            <span className='form__text'>Курс</span>
                            <Select />
                        </label>
                        <label className='form__label form__label--small'>
                            <span className='form__text'>Группа</span>
                            <Select />
                        </label>
                    </div>
                    <label className='form__label'>
                        <span className='form__text'>Дисциплина</span>
                        <Input className='form__input' />
                    </label>
                    <label className='form__label' onClick={(evt) => evt.preventDefault()}>
                        <span className='form__text'>Дата</span>
                        <DatePicker />
                    </label>
                    <label className="form__label">
                        <a href='' className='form__btn-questions btn'>Загрузить вопросы</a>
                    </label>
                    <div className='form__btns'>
                        <Button>Создать экзамен</Button>
                        <Button className='cancel__btn'>Отмена</Button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default CreateExamenForm