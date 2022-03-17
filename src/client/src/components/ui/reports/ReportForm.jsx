import React, { useEffect, useRef, useState } from 'react';
import { ReportFormProps } from '../../../constants/propTypes';
import { Button } from '../Button';
import { Input } from '../Input';

export const ReportForm = ({ requiredInputs, handleMonthInput, rendered, handleReportDownload }) => {

	const [renderableInputs, setRenderableInputs] = useState([]);
	const requiredRef = useRef(requiredInputs);

	useEffect(() => {
		if (requiredRef?.current !== requiredInputs) {
			requiredRef.current = requiredInputs;
			setRenderableInputs([]);
		}

		requiredInputs.forEach((input) => {
			let render = true;

			const { requiresValidation } = input;

			// eslint-disable-next-line no-extra-boolean-cast
			if (Boolean(requiresValidation)) {
				const { target } = requiresValidation;
				const operand = requiredInputs.find(({ name }) => name === target);

				if (!operand.value) {
					render = false;
					return;
				}
			}

			render && setRenderableInputs((old) => [...old, input]);
		});

	}, [requiredInputs]);

	return (
		<>
			<form style={{ display: 'flex', flex: '0 0 40%', justifyContent: 'space-between', marginRight: '1rem' }}>
				{
					renderableInputs.length > 0 && renderableInputs.map(({ name, value, label }, ind) => {
						const style = ind === 0 ? { marginRight: '2rem' } : {};
						return (
							<div key={name} style={style}>
								<label style={{ fontWeight: '500', fontSize: '1.8rem' }} htmlFor="start">{label}:</label>
								<Input name={name} handleInputChange={handleMonthInput} type="month" placeholder="El mes" />
							</div>
						);
					})
				}
			</form>
			{rendered &&
				<div style={{ marginRight: 'auto', marginLeft: '4rem', flex: '0 0 30%' }}>
					<Button onClick={() => handleReportDownload()} text="Descargar reporte" group={true} />
				</div>
			}
		</>
	);
};

ReportForm.propTypes = ReportFormProps;
