import { Link } from 'react-router-dom';
import NavbarMenu from '../components/NavbarMenu';
import { useAuth } from '../contexts/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Cart() {
	const { userLogout } = useAuth();

	return (
		<>
			<div className='d-flex justify-content-between align-items-center'>
				<NavbarMenu />
				<div className='d-flex gap-4 margin-r'>
					<Link
						to='/user/cart'
						className='text-decoration-none text-dark link-font-size'
					>
						<ShoppingCartIcon />
					</Link>
					<Link
						to='/user/home'
						className='text-decoration-none text-dark link-font-size'
						onClick={userLogout}
					>
						Logout
					</Link>
				</div>
			</div>
			<small className='fw-bold brand-center'>WSTUDIO</small>
			<h1 className='text-center mt-4'>Cart</h1>
		</>
	);
}

export default Cart;
