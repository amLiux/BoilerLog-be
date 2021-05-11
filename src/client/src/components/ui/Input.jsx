import React from 'react'

export const Input = ({ type, handleInputChange, errors, value, name, placeholder, onKeyDown}) => {
    return (
        <input 
            className={`auth__input ${name === 'email' && 'mt-5'} ${errors[`${name}`] ? 'auth__input-hasError' : 'mb-5'}`} 
            name={name}
            autoComplete="off" 
            type={type}  
            placeholder={placeholder} 
            value={value} 
            onKeyDown={onKeyDown}
            onChange={handleInputChange} 
            />
    )
}
