import { useEffect, useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import { literalOperators } from '../../constants/literalOperators';

export const useReports = () => {
	const [reportContext, setReportContext] = useState({
		name: '',
		requiredInputs: [],
		renderable: false,
		type: ''
	});

	const [reportRenderable, setReportRenderable] = useState(false);

	const handleReportDownload = async () => {
		let canvasReport = document.getElementById('report');
		canvasReport.toBlob((blob) => saveAs(blob, 'testing.jpeg'), 'image/jpeg', 1);
	};

	const handleInput = ({ target }) => {
		const [year, month] = target.value.split('-');
		const dateToSet = new Date(year, month - 1);

		const newRequiredInputs = reportContext.requiredInputs.map((input, _, arr) => {
			if (input.name === target.name) {
				let isValid = true;

				if (input.requiresValidation) {
					const {operator, target} = input.requiresValidation;
					const operand = arr.find(({ name }) => name === target);

					isValid = literalOperators[operator](dateToSet, operand.value);

					input.value = isValid ? dateToSet : '';
				} else input.value = dateToSet;

				return input;
			}

			return input;
		});

		const renderable = reportContext.requiredInputs.every((input) => input.value !== '');

		setReportContext((state) => ({
			...state,
			requiredInputs: newRequiredInputs,
			renderable
		}));

	};

	const activeReport = useRef(reportContext);

	useEffect(() => {
		if (activeReport?.current !== reportContext) {
			activeReport.current = reportContext;
			setReportRenderable(false);
		}
	}, [reportContext]);

	return [handleInput, handleReportDownload, setReportContext, reportContext, reportRenderable];
};