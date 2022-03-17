import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startSearchingPatient } from '../../actions/patients';
import { InputGroupProps } from '../../constants/propTypes';

export const InputGroup = ({ isEdit, search = false, value, label, handleInputChange, name }) => {

	const [disabled, setDisabled] = useState(false);

	const [searchString, setSearchString] = useState('');

	const handleSearchString = ({ target }) => {
		setSearchString(target.value);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		isEdit && setDisabled(true);
	}, [isEdit]);

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	}, [disabled]);

	const handleDisable = (e) => {
		e.preventDefault();
		if (search && !disabled) {
			dispatch(startSearchingPatient(searchString));
		}
		setDisabled(!disabled);
	};

	const className = `input-group input-group${search ? '__search' : ''.trim()} ${search ? 'mt-10 ' : ''}`;

	return (
		<div className={className}>
			{!search && <label htmlFor={name}>{label}:</label>}
			<div className="input-group__main">
				<input
					className={`${search ? 'search' : ''}`}
					placeholder={search ? 'Buscar...' : ''.trim()}
					autoComplete="off"
					name={name}
					ref={inputRef}
					disabled={disabled}
					type="text"
					value={value || search ? value : ''}
					onChange={search ? e => handleSearchString(e) : handleInputChange}
				/>
				<button className="input-group_button" onClick={(e) => handleDisable(e)}>
					{
						search
							? <i className="fas fa-search"></i>
							: disabled
								? 'Editar'
								: 'Guardar'
					}
				</button>
			</div>
		</div>
	);
};

InputGroup.propTypes = InputGroupProps;
