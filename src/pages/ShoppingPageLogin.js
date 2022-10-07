import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavbarMenu from '../components/NavbarMenu';
import * as productService from '../api/productApi';
import { useAuth } from '../contexts/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ModalShopLogin from '../components/ui/ModalShopLogin';

function ShoppingPageLogin() {
	const { userLogout } = useAuth();
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [cartProducts, setCartProducts] = useState([]);

	const increaseOrderItem = (product) => {
		const exist = cartProducts.find((item) => item.id === product.id);
		if (exist) {
			setCartProducts(
				cartProducts.map((item) =>
					item.id === product.id
						? { ...item, productId: product.id, quantity: exist.quantity + 1 }
						: item
				)
			);
		} else {
			setCartProducts([
				...cartProducts,
				{ ...product, productId: product.id, quantity: 1 }
			]);
		}
	};

	const decreaseOrderItem = (product) => {
		const exist = cartProducts.find((item) => item.id === product.id);
		if (exist.quantity === 1) {
			setCartProducts(cartProducts.filter((item) => item.id !== product.id));
		} else {
			setCartProducts(
				cartProducts.map((item) =>
					item.id === product.id
						? { ...item, productId: product.id, quantity: exist.quantity - 1 }
						: item
				)
			);
		}
	};

	const removeOrderItem = (product) => {
		const cartProductsFilter = cartProducts.filter(
			(item) => item.id !== product.id
		);
		setCartProducts(cartProductsFilter);
	};

	const goToConfirmOrder = () => {
		setIsOpen(false);
		setTimeout(() => navigate('/user/confirmorder'), 1);
	};

	useEffect(() => {
		const fetchProduct = async () => {
			const res = await productService.getAllProduct();
			setProducts(res.data.products);
		};
		fetchProduct();
	}, []);

	// console.log(cartProducts);

	return (
		<>
			<div className='d-flex justify-content-between align-items-center'>
				<NavbarMenu />
				<div className='d-flex gap-4 margin-r'>
					<ShoppingCartIcon
						onClick={() => setIsOpen(true)}
						className='pointer'
					/>

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
			<h1 className='text-center mt-4'>Shop</h1>
			<div className='shop-item-container'>
				<div className='shop-item-parent'>
					{products.map((item) => (
						<div className='shop-item-border' key={item.id}>
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
									<small>{item.price} Baht</small>
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
				>
					<table className='w-100'>
						<tbody>
							<tr className='table-header-height'>
								<th className='text-center cart-product-width'>Product Name</th>
								<th className='text-center'>Price</th>
								<th className='text-center'>Quantity</th>
								<th className='text-center'>Total</th>
								<th className='text-center'>B</th>
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
									<td className='text-center'>{item.price} Baht</td>
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
										{item.price * item.quantity} Baht
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
								: cartProducts.reduce((acc, item) => {
										acc = acc + item.price * item.quantity;
										return acc;
								  }, 0)}
							Baht
						</div>
					</div>
					{/* <div className='d-flex justify-content-end'>
						<div></div>
						<button
							className='btn btn-dark border-0 px-4 product-add-button'
							onClick={goToConfirmOrder}
						>
							Confirm Order
						</button>
					</div> */}
				</ModalShopLogin>
			</div>
		</>
	);
}

export default ShoppingPageLogin;