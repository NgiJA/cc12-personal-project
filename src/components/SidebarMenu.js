import { Link, useLocation, useParams } from 'react-router-dom';
import SummaryIcon from '@mui/icons-material/Summarize';
import ProductIcon from '@mui/icons-material/Checkroom';

function SidebarMenu() {
	const { productId } = useParams();
	const { pathname } = useLocation();
	return (
		<div className='sidebar'>
			<Link
				to='/admin/summary'
				className={`sidebar-row text-decoration-none margin-r ${
					pathname === '/admin/summary'
						? 'text-white sidebar-row-selected'
						: 'text-dark'
				}`}
			>
				<SummaryIcon />
				<div>Summary</div>
			</Link>
			<Link
				to='/admin/product'
				className={`sidebar-row text-decoration-none margin-r ${
					pathname === '/admin/product' ||
					pathname === '/admin/product/create' ||
					pathname === `/admin/product/${productId}/update`
						? 'text-white sidebar-row-selected'
						: 'text-dark'
				}`}
			>
				<ProductIcon />
				<div>Product</div>
			</Link>
		</div>
	);
}

export default SidebarMenu;
