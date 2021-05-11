import React from 'react'
import { useDispatch } from 'react-redux'
import { startDeletingFile, startDownloadingFile } from '../../../actions/pacientes'

export const Archivo = ({nombre, fecha, pacienteId, fileId}) => {

    const date = new Date(fecha)

    const dispatch = useDispatch()

    const handleDelete = () => dispatch(startDeletingFile(fileId, nombre, pacienteId))

    const handleDownload = () => dispatch(startDownloadingFile(nombre, pacienteId))

    return (
        <div className="grid__body-item">
            <span className="col-1-of-4">{nombre}</span>
            <span className="col-1-of-4">{date.toLocaleDateString()}</span>
            <span onClick={() => handleDelete()} className="col-1-of-4"><i className="fas fa-trash-alt delete"></i></span>
            <span onClick={() => handleDownload()} className="col-1-of-4"><i className="fas fa-download download"></i></span>
        </div>
    )
}
