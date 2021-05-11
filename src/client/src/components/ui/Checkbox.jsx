import React from 'react'

export const Checkbox = ({handleCheck, setting, helpMessage, checked}) => {
    return (
        <div className="checkbox mb-5 mt-1">
            <h5 className="mb-1" style={{textAlign: 'left', marginTop:'13px', marginRight: 'auto'}}>
                {setting}
                <br/>
                <span style={{fontSize: '11px', fontWeight:'400'}}>{helpMessage}</span>    
            </h5>
            <input onChange={handleCheck} type="checkbox" defaultChecked={checked} />
        </div>
    )
}
