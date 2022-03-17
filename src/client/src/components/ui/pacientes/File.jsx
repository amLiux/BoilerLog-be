import React from 'react';
import { useDispatch } from 'react-redux';
import { startDeletingFile, startDownloadingFile } from '../../../actions/patients';
import { FileProps } from '../../../constants/propTypes';

export const File = ({ name, uploadDate, patientId, fileId }) => {

	const date = new Date(uploadDate);

	const dispatch = useDispatch();

	const handleDelete = () => dispatch(startDeletingFile(fileId, name, patientId));

	const handleDownload = () => dispatch(startDownloadingFile(name, patientId));

	return (
		<div className="grid__body-item">
			<span className="col-1-of-4">{name}</span>
			<span className="col-1-of-4">{date.toLocaleDateString()}</span>
			<span onClick={() => handleDelete()} className="col-1-of-4"><i className="fas fa-trash-alt delete"></i></span>
			<span onClick={() => handleDownload()} className="col-1-of-4"><i className="fas fa-download download"></i></span>
		</div>
	);
};

File.propTypes = FileProps;