import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { startSearchingPaciente } from '../../actions/pacientes'

export const InputGroup = ({isEdit, search, value, label, handleInputChange, name}) => {

    const [disabled, setDisabled] = useState(false)

    const [searchString, setSearchString] = useState('')

    const handleSearchString = ({target}) => setSearchString (target.value)

    const dispatch = useDispatch()

    useEffect(()=>{
        isEdit && setDisabled(true)
    }, [isEdit])

    const inputRef= useRef(null)

    useEffect(()=>{
        inputRef.current.focus()
    }, [disabled])

    const handleDisable = (e) => {
        e.preventDefault()
        if(search && !disabled) {
            dispatch(startSearchingPaciente(searchString))
        }
        setDisabled(!disabled)
    }

    return (
        <div className={`input-group ${search && 'mt-10'}`}>
            {!search && <label htmlFor={name}>{label}:</label>}
            <div className="input-group__main">
                <input 
                    className={`${search ? 'search' : ''}`}
                    placeholder={search && 'Buscar...'}
                    autoComplete="off"
                    name={name}
                    ref={inputRef} 
                    disabled={disabled} 
                    type="text"
                    value={value} 
                    onChange={ search ? e => handleSearchString(e) : handleInputChange}    
                />
                <button className="input-group_button" onClick={(e)=> handleDisable(e)}>
                    {
                        search 
                            ? <i className="fas fa-search"></i>
                            : disabled 
                                ? 'Editar' 
                                : 'Guardar'
                    }
                </button>
            </div>
        </div>
    )
}
