import React from 'react';
import { useReports } from '../hooks/useReports';
import { Report } from '../ui/reports/Report';
import { ReportForm } from '../ui/reports/ReportForm';
import { SelectReport } from '../ui/reports/SelectReport';

export const ReportsScreen = () => {

	const [
		handleInput,
		handleReportDownload,
		setReportContext,
		reportContext
	] = useReports();


	return (
		<div className="main-container">
			<div className="mt-5" style={{ display: 'flex', alignItems: 'center' }}>
				<div style={{ marginLeft: '4rem', flex: '0 0 30%' }}>
					<SelectReport handleState={setReportContext} />
				</div>
				{
					reportContext.name !== '' &&
					<>
						<ReportForm 
							rendered={reportContext.renderable} 
							requiredInputs={reportContext.requiredInputs} 
							handleMonthInput={handleInput} 
							handleReportDownload={handleReportDownload} 
						
						/>
					</>

				}

			</div>
			{
				reportContext.renderable &&
				<div className={`${reportContext.type === 'pie' && 'mt-5'}`} style={{ display: 'flex' }}>
					<Report report={reportContext} />
				</div>
			}
		</div>
	);
};
