import React from 'react'

import {useDispatch} from 'react-redux'
import { setToastInactivo } from '../../actions/ui'

export const Toast = ({ context, error, success}) => {

    const dispatch = useDispatch()

    return (
        <div className="wrapper">
            <div className={`toast ${success && 'toast-success'}`}>
                <div className="content">
                    <div className={`icon ${success && 'icon-success'}`} >
                        {success 
                            ? <i className="fas fa-check"></i>
                            : <i className="fas fa-exclamation"></i> 
                            
                        }
                    </div>
                    <div className="details">
                        <span>{ success ? 'Completado!' : 'Error!'}</span>
                        <p>{error}</p>
                    </div>
                </div>
                <div onClick={() => dispatch(setToastInactivo())} className="close-icon"><i className="fas fa-times"></i></div>
            </div>
        </div>

    )
}
