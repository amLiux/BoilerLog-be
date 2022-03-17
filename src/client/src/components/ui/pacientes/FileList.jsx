import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingPatientFiles, startUploadingFile } from '../../../actions/patients';
import { FileListProps } from '../../../constants/propTypes';
import { File } from './File';


export const FileList = ({patientId}) => {

	const dispatch = useDispatch();

	const { patientFiles } = useSelector(state => state.patients);
	
	useEffect(() => dispatch(startLoadingPatientFiles(patientId)) , [patientId, dispatch]);

	const [file, setFile] = useState('');
	const [filename, setFilename] = useState('');


	const onChange = (e) => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};

	const handleSubmit = () => {
		dispatch(startUploadingFile(file, patientId));
		setFilename('');
	};

	return (
		<div style={{width: '100%', display:'flex', flexDirection: 'column', justifyContent:'space-around',  alignItems: 'center'}}>
			<div className="grid">
				<div className="grid__header">
					<h5>Nombre</h5>
					<h5>Fecha Subido</h5>
				</div>
				<div className="grid__body">
					{
						patientFiles.length > 0 && patientFiles.map( ({nombreArchivo, fechaCreado,  idPaciente, _id}) => <File key={_id} fileId={_id} patientId={idPaciente} name={nombreArchivo} date={fechaCreado}/> )
					}
					
				</div>
			</div>
			{filename !== '' && 
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '50%', marginBottom:'1rem'}}>
					<span style={{fontSize: '1.2rem', fontWeight: '300'}}>{filename}</span>
					<i onClick={handleSubmit} style={{fontSize: '1.2rem', fontWeight: '300'}} className="fas fa-check-square"></i>
				</div>
			}
			<div style={{minWidth: '36%'}} className="btn pointer mb-5 btn__primary">
				<input onChange={e => onChange(e)} id="file" className="dashboard__input-file" name="file" type="file" />
				<label className="dashboard__input-label" htmlFor="file">Añadir archivo</label>
			</div>
		</div>
	);
};

FileList.propTypes = FileListProps;
