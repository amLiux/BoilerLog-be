import React from 'react'
import { ArchivosList } from './ArchivosList'
import { CardSlider } from './CardSlider'

export const PacientesDashboard = ({paciente}) => {
    return (
        <div className="dashboard">
            <div className="dashboard__files">
                <h1 className="dashboard__heading"><i className="fas fa-folder-open"></i> Archivos del paciente</h1>
                <div className="dashboard__main-content">
                    <ArchivosList paciente={paciente}/>
                </div>
            </div>
            <div className="dashboard__appointments">
                <h1 className="dashboard__heading"><i className="fas fa-calendar-check"></i> Citas previas</h1>
                <div className="dashboard__main-content">
                    <CardSlider paciente={paciente}/>
                </div>
            </div>

        </div>
    )
}
