import { forwardRef } from 'react';

const TextArea = ({ className , ...props}) => {
    const defaultClassName = 'textarea'
    const classNames = className ? className + ` ${defaultClassName}` : defaultClassName

    return (
        <textarea className={classNames} {...props}></textarea>
    );
};

export default TextArea;
