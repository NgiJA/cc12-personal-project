import { Link } from 'react-router-dom';

function Bottom() {
	return (
		<div className='d-flex justify-content-center gap-5 mt-3 mb-3'>
			<Link
				to='/user/home'
				className='text-decoration-none text-dark link-font-size'
			>
				Home
			</Link>
			<Link
				to='/user/shop'
				className='text-decoration-none text-dark link-font-size'
			>
				Shop
			</Link>
		</div>
	);
}

export default Bottom;
