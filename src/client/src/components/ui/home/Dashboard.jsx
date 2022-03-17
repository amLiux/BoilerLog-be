import React from 'react';
import { DashboardProps } from '../../../constants/propTypes';

export const Dashboard = ({ appointments, heading, time, text }) => {
	// TODO this needs some more styling and functionality, too
	return (
		<div className="dashboard-table">
			<div className="dashboard-table__content">
				<h3>{heading}:</h3>
				<div className="dashboard-table__heading">
					<span className="big">{` ${appointments?.length} `}</span>
					{
						time && <span className="monthly">/ {time}.</span>
					}
				</div>
				<div className="dashboard-table__description">
					<span>{`${text ? text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda autem mollitia asperiores. Itaque amet consequatur consequuntur reiciendis aut sapiente dicta, dolor dolorem! Dolor beatae ratione iusto, quae ut dicta ea.'}`} </span>
				</div>
				<div className="dashboard-table__features">
					<ul>

						{
							appointments.map((cita, ind) => <li key={ind}>{`${new Date(cita.fechaDeseada).toLocaleDateString('es-us')} - ${cita.nombre} ${cita.apellido}`}</li>)
						}
					</ul>
				</div>
			</div>
		</div>
	);
};

Dashboard.propTypes = DashboardProps;