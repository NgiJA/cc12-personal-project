import { Link } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import { useAuth } from '../contexts/AuthContext';
import * as orderService from '../api/orderApi';
import { useEffect, useState } from 'react';
import OrderPagination from '../components/OrderPagination';

function AdminSummary() {
	const { adminLogout } = useAuth();

	const [orders, setOrders] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const totalSale = orders.reduce(
		(acc, item) =>
			acc +
			item.OrderItems.reduce(
				(acc, item) => (acc = item.price * item.quantity + acc),

				0
			),
		0
	);

	const numPage = Math.ceil(orders.length / 4);
	const showOrders = orders.slice(4 * (currentPage - 1), 4 * currentPage);

	const changeCurrentPage = (pageSelected) => {
		setCurrentPage(pageSelected);
	};

	const reduceCurrentPage = () => {
		setCurrentPage(currentPage - 1);
	};

	const increaseCurrentPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const currentPageTrigger = currentPage;

	useEffect(() => {
		const fetchOrder = async () => {
			const res = await orderService.getAllOrderAdmin();
			setOrders(res.data.orders);
		};
		fetchOrder();
	}, []);

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
			<div className='d-flex flex-column gap-3 position-relative product-container'>
				<table>
					<tbody>
						<tr className='table-header-height'>
							<th className='text-center'>OrderId</th>
							<th className='text-center order-date-width'>Date</th>
							<th className='text-center'>Name</th>
							<th className='text-center order-list-width'>Order List</th>
							<th className='text-center'>Sale</th>
							<th className='text-center'>Status</th>
						</tr>
						{showOrders.map((item) => (
							<>
								<tr className='table-row-height' key={item.id}>
									<td className='text-center'>{item.id}</td>
									<td className='text-center'>{item.createdAt.slice(0, 10)}</td>
									<td className='text-center'>
										{item.firstName} {item.lastName}
									</td>
									<td className='order-list-container'>
										{item.OrderItems.map((item) => (
											<div key={item.id} className='order-list-item'>
												<small className='order-list-content'>
													{item.quantity} x
												</small>
												<img
													src={item.Product.image}
													alt='product'
													width='40'
													className='order-list-content'
												/>
												<small>{item.Product.productName}</small>
											</div>
										))}
									</td>
									<td className='text-center'>
										{item.OrderItems.reduce(
											(acc, item) => (acc = item.price * item.quantity + acc),
											0
										)}{' '}
										Baht
									</td>
									<td className='text-center'>
										<button
											className={`btn border-0 btn-${
												item.status === 'SUCCESS' ? 'success' : 'info'
											}`}
										>
											{item.status}
										</button>
									</td>
								</tr>
							</>
						))}
					</tbody>
				</table>
				<div className='d-flex justify-content-between align-items-center'>
					<small className='fw-bold'>Order: {orders.length}</small>
					<small className='fw-bold'>Total Sale: {totalSale}</small>
				</div>
				<div className='d-flex justify-content-between align-items-center'>
					<div></div>
					<OrderPagination
						numPage={numPage}
						changeCurrentPage={changeCurrentPage}
						reduceCurrentPage={reduceCurrentPage}
						increaseCurrentPage={increaseCurrentPage}
						currentPageTrigger={currentPageTrigger}
					/>
				</div>
			</div>
		</div>
	);
}

export default AdminSummary;
