import React from 'react';
import { Spinner } from '../../Spinner';
import { BannerProps, SimpleBannerProps } from '../../../../constants/propTypes';

const SimpleBanner = ({ handleCreateScreen }) => {
	return (
		<div>
			<i onClick={handleCreateScreen} className="far fa-calendar-plus"></i>
			<h1>Crea una cita para esta fecha.</h1>
		</div>
	);
};

SimpleBanner.propTypes = SimpleBannerProps;

export const Banner = ({ handleCreateScreen, simpleBanner = false }) => {

	return (
		simpleBanner
			? <div className="modal-form__banner">
				<div>
					<Spinner size="big" />
					<h1>Escoje una cita dentro de las opciones a la izquierda!</h1>
				</div>
				O
				<SimpleBanner handleCreateScreen={handleCreateScreen} />
			</div>
			:
			<div className="modal-form__banner">
				<SimpleBanner handleCreateScreen={handleCreateScreen} />
			</div>
	);
};

Banner.propTypes = BannerProps;
