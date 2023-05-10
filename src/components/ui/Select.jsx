import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import ReactSelect from 'react-select'
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const Select = ({ options, onChange, value, isDisabled = true, isLoading = false, isMulti = false, placeholder = ''}) => {
    return (
        <ReactSelect
            noOptionsMessage={() => 'Ничего не найдено'}              
            onChange={onChange}
            classNamePrefix={'custom-select'}
            isMulti={isMulti}
            placeholder={placeholder}
            options={options}
            value={value}
            maxMenuHeight={280}
            components={animatedComponents}
            isDisabled={isDisabled}
            isLoading={isLoading}
            
        />
    )
}

export default Select;
