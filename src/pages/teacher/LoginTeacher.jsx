import React, {useContext} from 'react';
import {AuthContext} from "../../context";
import Select from '../../components/ui/Select'
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';


const LoginTeacher = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('isAuth', 'true')
    }

    return (
        <section className='login'>
            <div className='container'>
                <div className='login__inner'>
                    <h1 className='login__title title'>Введите ваши данные</h1>
                    <form onSubmit={login} className='form'>
                        <label className='form__label'>
                            <span className='form__text'>Логин</span>
                            <Input className='form__input' />
                        </label>
                        <label className='form__label'>
                            <span className='form__text'>Пароль</span>
                            <Input type="password" className='form__input' />
                        </label>
                        <Button className='form__btn'>
                            Войти
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginTeacher;
