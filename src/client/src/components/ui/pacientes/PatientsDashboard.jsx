import React from 'react';
import { FileList } from './FileList';
import { CardSlider } from './CardSlider';
import { PatientsDashboardProps } from '../../../constants/propTypes';

export const PatientsDashboard = ({ patientId }) => {
	return (
		<div className="dashboard">
			<div className="dashboard__files">
				<h1 className="dashboard__heading"><i className="fas fa-folder-open"></i> Archivos del paciente</h1>
				<div className="dashboard__main-content">
					<FileList patientId={patientId} />
				</div>
			</div>
			<div className="dashboard__appointments">
				<h1 className="dashboard__heading"><i className="fas fa-calendar-check"></i> Citas previas</h1>
				<div className="dashboard__main-content">
					<CardSlider patientId={patientId} />
				</div>
			</div>
		</div>
	);
};

PatientsDashboard.propTypes = PatientsDashboardProps;
