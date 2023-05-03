import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useRef, useState } from 'react'
import ReactSelect from 'react-select'
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const Select = ({ options, onChange, getValue, isDisabled = true, isLoading = false, isMulti = false, placeholder = ''}) => {
    return (
        <ReactSelect
            noOptionsMessage={() => 'Ничего не найдено'}              
            onChange={onChange}
            classNamePrefix={'custom-select'}
            isMulti={isMulti}
            placeholder={placeholder}
            //ref={kafedras}
            options={options}
            value={getValue}
            maxMenuHeight={280}
            components={animatedComponents}
            isDisabled={isDisabled}
            isLoading={isLoading}
            
        />
    )
}

export default Select;
