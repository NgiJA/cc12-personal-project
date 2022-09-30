import { Link } from 'react-router-dom';
import SummaryIcon from '@mui/icons-material/Summarize';
import ProductIcon from '@mui/icons-material/Checkroom';

function SidebarMenu() {
	return (
		<div className='sidebar'>
			<Link
				to='/admin/summary'
				className='sidebar-row text-decoration-none text-dark'
			>
				<SummaryIcon />
				<div>Summary</div>
			</Link>
			<Link
				to='/admin/product'
				className='sidebar-row text-decoration-none text-dark margin-r'
			>
				<ProductIcon />
				<div>Product</div>
			</Link>
		</div>
	);
}

export default SidebarMenu;
