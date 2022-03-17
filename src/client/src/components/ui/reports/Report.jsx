import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { requestTemplates } from '../../../constants/HTTP';
import { ReportProps } from '../../../constants/propTypes';
import { processRequest } from '../../../services/processRequest';


export const Report = ({ report }) => {

	const [data, setData] = useState([]);
	const [reportType, setReportType] = useState('');

	useEffect(() => {
		let isMounted = true;               
		async function fetchReport() {
			if (isMounted) {
				const urlChangers = {
					dynamicPath: encodeURIComponent(report.name),
				};

				const payload = {};

				report.requiredInputs.forEach(({ name, value }) => {
					payload[name] = value;
				});

				const resp = await processRequest(requestTemplates.BUILD_REPORT, { payload }, urlChangers);
				const { data } = await resp.json();
				setReportType(report.type);
				setData(data);
			}
		}
		fetchReport();
		return () => { isMounted = false; }; // cleanup toggles value, if unmounted
	}, [report]);

	const toSpread = {
		id: 'report',
		data: {
			labels: data.map(({ label }) => label),
			datasets: [{
				label: `${report.name}`,
				data: data.map(({ data }) => data),
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1,
			}]
		},
		height: 600,
		width: 1000,
		options: {
			maintainAspectRatio: true
		}
	};

	return (
		<div style={{ margin: 'auto' }}>
			{
				reportType === 'pie'
					? <Pie {...toSpread} />
					: <Bar {...toSpread} />
			}
		</div>
	);
};

Report.propTypes = ReportProps;
