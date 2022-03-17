import React from 'react';
import { UsersListProps } from '../../../constants/propTypes';
import { Usuario } from './Usuario';

export const UsersList = ({ totalUsers, handleEdit }) => {
	return (
		<div className="grid">
			<div className="grid__header" style={{ width: '98%' }}>
				<h5 className="col-1-of-5">Usuario</h5>
				<h5 className="col-1-of-5">Nombre</h5>
				<h5 className="col-1-of-5">E-mail</h5>
				<h5 className="col-1-of-5">Rol</h5>
				<h5 className="col-1-of-5">Acciones</h5>
			</div>
			<div className="grid__body" style={{ width: '100%', height: '100%' }}>
				{
					totalUsers.length > 0 && totalUsers.map(({ _id, estado, nombre, apellido, email, user, rol }) => <Usuario handleEdit={handleEdit} rol={rol} key={_id} id={_id} usuario={user} email={email} estado={estado} nombre={`${nombre} ${apellido}`} />)
				}
			</div>
		</div>
	);
};

UsersList.propTypes = UsersListProps;
