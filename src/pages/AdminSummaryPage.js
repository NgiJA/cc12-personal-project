import { Link } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import { useAuth } from '../contexts/AuthContext';
import * as orderService from '../api/orderApi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import OrderPagination from '../components/OrderPagination';
import ModalAdminSummary from '../components/ui/ModalAdminSummary';
import dayjs from 'dayjs';

function AdminSummary() {
	const { adminLogout } = useAuth();

	const [orders, setOrders] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [modalData, setModalData] = useState(null);
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

	const handleUpdateOrder = async (orderId) => {
		try {
			const fetchOrder = async () => {
				const res = await orderService.getAllOrderAdmin();
				setOrders(res.data.orders);
			};

			await orderService.updateOrderAdmin(orderId);
			toast.success('success update order status');
			fetchOrder();
			setIsOpen(false);
		} catch (err) {
			toast.error('fail update order status');
		}
	};

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
							<th className='text-center '>OrderId</th>
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
									<td className='text-center'>
										{dayjs(item.createdAt)
											.locale('th')
											.format('DD/MM/YYYY HH:mm:ss')}
									</td>
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
										)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
										Baht
									</td>
									<td className='text-center'>
										<button
											className={`text-white btn border-1 btn-${
												item.status === 'SUCCESS' ? 'success' : 'info'
											}`}
											onClick={() => {
												setIsOpen(true);
												setModalData(item);
											}}
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
					<small className='text-secondary'>Order: {orders.length}</small>
					<small className='text-secondary'>
						Total Sale:{' '}
						{totalSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Baht
					</small>
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
			<ModalAdminSummary
				title='Admin Confirm Order'
				open={isOpen}
				onClose={() => setIsOpen(false)}
			>
				<div className='modal-admin-confirm-order-container'>
					<div className='d-flex gap-5'>
						<div className='modal-admin-confirm-order-detail'>
							<div>OrderId: {modalData?.id}</div>
							<div>
								<div>First Name</div>
								<div className='modal-admin-confirm-order-detail-background'>
									<p className='modal-admin-confirm-order-detail-padding'>
										{modalData?.firstName}
									</p>
								</div>
							</div>
							<div>
								<div>Last Name</div>
								<div className='modal-admin-confirm-order-detail-background'>
									<p className='modal-admin-confirm-order-detail-padding'>
										{modalData?.lastName}
									</p>
								</div>
							</div>
							<div>
								<div>Mobile</div>
								<div className='modal-admin-confirm-order-detail-background'>
									<p className='modal-admin-confirm-order-detail-padding'>
										{modalData?.mobile}
									</p>
								</div>
							</div>
							<div>
								<div>Address</div>
								<div className='modal-admin-confirm-order-detail-background'>
									<p className='modal-admin-confirm-order-detail-padding'>
										{modalData?.address}
									</p>
								</div>
							</div>
							<div>
								<div>Optional</div>
								<div className='modal-admin-confirm-order-detail-background-optional'>
									<p className='modal-admin-confirm-order-detail-padding'>
										{modalData?.optional}
									</p>
								</div>
							</div>
						</div>
						<div>
							<img src={modalData?.slip} alt='slip' width='250' />
						</div>
					</div>
				</div>
				{modalData?.status === 'PENDING' ? (
					<button
						className='btn btn-dark border-0 modal-admin-confirm-order-button'
						onClick={() => handleUpdateOrder(modalData?.id)}
					>
						Confirm Order
					</button>
				) : (
					<small className='modal-admin-confirm-order-button'>
						Admin Confirm Date:{' '}
						{dayjs(modalData?.updatedAt)
							.locale('th')
							.format('DD/MM/YYYY HH:mm:ss')}
					</small>
				)}
			</ModalAdminSummary>
		</div>
	);
}

export default AdminSummary;
