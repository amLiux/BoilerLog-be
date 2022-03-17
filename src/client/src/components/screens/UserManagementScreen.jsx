import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingUsers } from '../../actions/users';
import { Toast } from '../ui/Toast';
import { UsersList } from '../ui/usuarios/UsersList';
import { RegisterScreen } from './RegisterScreen';


export const UserManagementScreen = () => {

	const dispatch = useDispatch();
	const { toastContext, isToastOpen, isModalOpen } = useSelector(state => state.ui);
	const [edit, setEdit] = useState(false);

	const { totalUsers } = useSelector(state => state.users);

	useEffect(() => {
		dispatch(startLoadingUsers());
	}, [dispatch]);

	return (
		<>
			{isToastOpen && !isModalOpen && <Toast exitoso={toastContext.success} error={toastContext.msg} />}
			<div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
				<div className="main-container" style={{ width: '25%', height: '77%' }}>
					<div style={{ width: '90%', margin: '2.2rem auto' }}>
						<RegisterScreen isEdit={edit} />
					</div>

				</div>
				<div className="main-container" style={{ width: '65%', minHeight: '100%', overflow: 'auto' }}>
					<UsersList handleEdit={() => setEdit(!edit)} totalUsers={totalUsers} />
				</div>
			</div>
		</>
	);
};
