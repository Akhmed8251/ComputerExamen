import React from 'react';

const Input = ({ className , ...props}) => {
    const defaultClassName = 'input'
    const classNames = className ? className + ` ${defaultClassName}` : defaultClassName

    return (
        <input className={classNames} {...props}/>
    );
};

export default Input;
