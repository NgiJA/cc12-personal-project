import { Link } from 'react-router-dom';
import NavbarMenuLogin from '../components/NavbarMenuLogin';
import emptyBag from '../assets/images/empty-bag.png';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { getUserAccessToken } from '../utils/localStorage';
import * as orderService from '../api/orderApi';
import dayjs from 'dayjs';

function UserOrder() {
	const { userLogout, user } = useAuth();
	const [purchaseOrders, setPurchaseOrders] = useState([]);

	useEffect(() => {
		const fetchOrder = async () => {
			const token = getUserAccessToken();
			const res = await orderService.getOrderUser(token);

			setPurchaseOrders(res.data.orders);
		};
		fetchOrder();
	}, []);

	// console.log(purchaseOrders);
	return (
		<>
			<div className='d-flex justify-content-between align-items-center'>
				<NavbarMenuLogin />
				<div className='d-flex align-items-center gap-3 link-font-size'>
					<p className='mb-0'>{user.username}</p>
					<Link
						to='/user/home'
						className='text-decoration-none text-dark link-font-size margin-r'
						onClick={userLogout}
					>
						Logout
					</Link>
				</div>
			</div>
			<small className='fw-bold brand-center'>WSTUDIO</small>
			<h1 className='text-center mt-4'>Purchase Order</h1>
			{purchaseOrders.length === 0 ? (
				<div className='no-order-container'>
					<img src={emptyBag} alt='empty-bag' width='150' />
					<div className='pt-4'>You don't have any order</div>
				</div>
			) : (
				<div className='user-order-container'>
					{purchaseOrders.map((item, index) => (
						<div className='user-order-item' key={item.id}>
							{/* {console.log(item)} */}
							<div className='user-order-content'>
								<small className='fw-bold'>
									Order : <span className='font-normal'>{index + 1}</span>
								</small>
								<small className='fw-bold'>
									Date :{' '}
									<span className='font-normal'>
										{dayjs(item.createdAt)
											.locale('th')
											.format('DD/MM/YYYY HH:mm:ss')}
									</span>
								</small>
								<div className='user-order-product-container'>
									{item.OrderItems.map((item) => (
										<div className='user-order-product-item' key={item.id}>
											<img src={item.Product.image} alt='product' width='30' />
											<small>{item.Product.productName}</small>
											<small>{item.quantity} pcs</small>
										</div>
									))}
								</div>
								<div>
									<small className='fw-bold'>Status</small>
									<div className='user-order-status'>
										<button
											className={`button-status-order text-white btn border-1 btn-${
												item.status === 'SUCCESS' ? 'success' : 'info'
											}`}
										>
											{item.status}
										</button>
										{item.status === 'SUCCESS' ? (
											<small>
												Admin Confirm:{' '}
												{dayjs(item.updatedAt)
													.locale('th')
													.format('DD/MM/YYYY HH:mm:ss')}
											</small>
										) : (
											''
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
}

export default UserOrder;
