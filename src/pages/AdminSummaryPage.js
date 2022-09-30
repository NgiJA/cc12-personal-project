import { Link } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import { useAuth } from '../contexts/AuthContext';

function AdminSummary() {
	const { adminLogout } = useAuth();

	return (
		<div>
			<SidebarMenu />
			<div className='brand-admin d-flex justify-content-center'>
				<small className='fw-bold'>WSTUDIO ADMIN</small>
			</div>
			<Link
				to='/admin/login'
				className='text-decoration-none text-dark link-font-size brand-admin logout-admin'
				onClick={adminLogout}
			>
				Logout
			</Link>
		</div>
	);
}

export default AdminSummary;
