import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as productService from '../api/productApi';
import { useAuth } from '../contexts/AuthContext';
import { useOrder } from '../contexts/OrderContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ModalShopLogin from '../components/ui/ModalShopLogin';
import NavbarMenuLogin from '../components/NavbarMenuLogin';
import Bottom from '../layouts/bottoms/Bottom';
import emptyBag from '../assets/images/empty-bag.png';
import { toast } from 'react-toastify';

function ShoppingPageLogin() {
	const { userLogout, user } = useAuth();
	const {
		cartProducts,
		increaseOrderItem,
		decreaseOrderItem,
		removeOrderItem
	} = useOrder();
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	const [productType, setProductType] = useState('ALLCATEGORIES');
	const [isOpen, setIsOpen] = useState(false);

	const goToConfirmOrder = () => {
		const checkStock = cartProducts.map((item) => {
			if (item.stock - item.quantity < 0) {
				toast.error(`${item.productName} quantity not enougth`);
				return false;
			}
		});
		if (checkStock.includes(false)) {
			return;
		}

		setIsOpen(false);
		setTimeout(() => navigate('/user/confirmorder'), 1);
	};

	const filterProducts = products.filter(
		(item) => item.productType === productType
	);

	const handleChangeType = (e) => {
		setProductType(e.target.value);
	};

	useEffect(() => {
		const fetchProduct = async () => {
			const res = await productService.getAllProduct();
			const productsArray = res.data.products;

			setProducts(productsArray);
		};
		fetchProduct();
	}, []);

	// console.log(products);

	return (
		<>
			<div className='d-flex justify-content-between align-items-center'>
				<NavbarMenuLogin />
				<div className='d-flex align-items-center gap-3 link-font-size'>
					<ShoppingCartIcon
						onClick={() => setIsOpen(true)}
						className='pointer'
					/>
					{cartProducts.length === 0 ? (
						''
					) : (
						<div
							className={`cart-count-container${isOpen ? '-modal-open' : ''}`}
						>
							<div>{cartProducts.length}</div>
						</div>
					)}
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
			<h1 className='text-center mt-4'>Shop</h1>
			<div className='filter-shop-container'>
				<small>Sort By: </small>
				<select
					className='border-0'
					name='productType'
					value={productType}
					onChange={handleChangeType}
				>
					<option className='filter-shop-option' value='ALLCATEGORIES'>
						Allcategories
					</option>
					<option className='filter-shop-option' value='TOP'>
						Top
					</option>
					<option className='filter-shop-option' value='BOTTOM'>
						Bottom
					</option>
					<option className='filter-shop-option' value='FOOTWARE'>
						Shoes
					</option>
				</select>
			</div>
			<div className='shop-item-container'>
				<div className='shop-item-parent'>
					{productType === 'ALLCATEGORIES'
						? products.map((item, index) => (
								<div className='shop-item-border' key={index}>
									<div className='shop-item-content'>
										<img
											src={item.image}
											alt='product'
											width='180'
											className='align-self-center'
										/>
										<div className='shop-item-title'>
											<div className='d-flex justify-content-between'>
												<small>{item.productName}</small>
												<small
													className='fw-bold pointer'
													onClick={() => increaseOrderItem(item)}
												>
													Add to cart
												</small>
											</div>
											<div className='d-flex justify-content-between'>
												<small>
													{item.price
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
													Baht
												</small>
												<small>{item.stock} pcs</small>
											</div>
										</div>
									</div>
								</div>
						  ))
						: filterProducts.map((item, index) => (
								<div className='shop-item-border' key={index}>
									<div className='shop-item-content'>
										<img
											src={item.image}
											alt='product'
											width='180'
											className='align-self-center'
										/>
										<div className='shop-item-title'>
											<div className='d-flex justify-content-between'>
												<small>{item.productName}</small>
												<small
													className='fw-bold pointer'
													onClick={() => increaseOrderItem(item)}
												>
													Add to cart
												</small>
											</div>
											<div className='d-flex justify-content-between'>
												<small>
													{item.price
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
													Baht
												</small>
												<small>{item.stock} pcs</small>
											</div>
										</div>
									</div>
								</div>
						  ))}
				</div>
				<ModalShopLogin
					title='Cart'
					open={isOpen}
					onClose={() => setIsOpen(false)}
					goToConfirmOrder={goToConfirmOrder}
					cartProducts={cartProducts}
				>
					{cartProducts.length === 0 ? (
						<div className='no-cart-item-container'>
							<img src={emptyBag} alt='empty-bag' width='100' />
							<div className='pt-4'>You don't have any items</div>
						</div>
					) : (
						<>
							<table className='w-100'>
								<tbody>
									<tr className='table-header-height'>
										<th className='text-center cart-product-width'>
											Product Name
										</th>
										<th className='text-center'>Price</th>
										<th className='text-center'>Quantity</th>
										<th className='text-center'>Total</th>
										<th className='text-center'></th>
									</tr>
									{cartProducts.map((item, index) => (
										<tr className='table-row-height' key={index}>
											<td className='cart-product-item'>
												<div className='order-list-item'>
													<img
														src={item.image}
														alt='product'
														width='50'
														className='order-list-content'
													/>
													<small>{item.productName}</small>
												</div>
											</td>
											<td className='text-center'>
												{item.price
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
												Baht
											</td>
											<td className='text-center d-flex justify-content-around align-items-center cart-modal-quantity-heigth'>
												<div
													className='fw-bold pointer'
													onClick={() => decreaseOrderItem(item)}
												>
													-
												</div>
												<div>{item.quantity}</div>
												<div
													className='fw-bold pointer'
													onClick={() => increaseOrderItem(item)}
												>
													+
												</div>
											</td>
											<td className='text-center'>
												{(item.price * item.quantity)
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
												Baht
											</td>
											<td className='text-center'>
												<button
													type='button'
													className='btn-close'
													onClick={() => removeOrderItem(item)}
												></button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className='d-flex justify-content-end'>
								<div></div>
								<div className='cart-modal-total fw-bold'>
									Total{' '}
									{cartProducts.length === 0
										? 0
										: cartProducts
												.reduce((acc, item) => {
													acc = acc + item.price * item.quantity;
													return acc;
												}, 0)
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
									Baht
								</div>
							</div>
						</>
					)}
				</ModalShopLogin>
			</div>
			<Bottom />
		</>
	);
}

export default ShoppingPageLogin;
