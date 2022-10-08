import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NavbarMenuLogin from '../components/NavbarMenuLogin';
import { useLoading } from '../contexts/LoadingContext';
import { useEffect, useRef, useState } from 'react';
import uploadImage from '../assets/images/uploadImage.png';
import * as orderService from '../api/orderApi';
import { toast } from 'react-toastify';
import { useOrder } from '../contexts/OrderContext';
import { getUserAccessToken } from '../utils/localStorage';

function UserConfirmOrder() {
	const { userLogout } = useAuth();
	const { cartProducts, setCartProducts } = useOrder();
	const { startLoading, stopLoading } = useLoading();
	const inputEl = useRef();
	const navigate = useNavigate();

	const [file, setFile] = useState(null);
	const [input, setInput] = useState({
		firstName: '',
		lastName: '',
		address: '',
		email: '',
		mobile: '',
		optional: ''
	});

	const handleChangeInput = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleCreateOrder = async (e) => {
		try {
			e.preventDefault();
			const token = getUserAccessToken();
			console.log(token);
			startLoading();
			const formData = new FormData(); // multipart ต้องใช้ท่า new FormData()
			formData.append('orderItems', JSON.stringify(cartProducts)); // เอา array CartProducts จาก OrderContext มาใส่ใน formData
			formData.append('slip', file); // (ชื่อ key, value)
			formData.append('firstName', input.firstName);
			formData.append('lastName', input.lastName);
			formData.append('address', input.address);
			formData.append('email', input.email);
			formData.append('mobile', input.mobile);
			formData.append('optional', input.optional);
			await orderService.createOrderUser(formData, token);
			setCartProducts([]);
			setTimeout(() => navigate('/user/shop'), 1);
			toast.success('success create order');
			setFile(null);
		} catch (err) {
			console.log(err);
			toast.error(err.response?.data.message);
		} finally {
			stopLoading();
		}
	};

	useEffect(() => {
		const fetchProduct = async () => {
			cartProducts.map((item) => delete item['id']);

			setCartProducts([...cartProducts]);
		};
		fetchProduct();
	}, []);

	return (
		<>
			<div className='d-flex justify-content-between align-items-center'>
				{console.log(cartProducts)}
				<NavbarMenuLogin />
				<div className='d-flex gap-4 margin-r'>
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
			<h1 className='text-center mt-4'>Confirm Order</h1>
			<div className='d-flex justify-content-center align-items-center'>
				<div className='confirm-order-container'>
					<div className='cu-product-image'>
						<input
							type='file'
							className='d-none'
							ref={inputEl}
							onChange={(e) => {
								if (e.target.files[0]) {
									setFile(e.target.files[0]);
								}
							}}
						/>
						<div className='text-center mt-3'>
							<span onClick={() => inputEl.current.click()}>
								<img
									src={file ? URL.createObjectURL(file) : uploadImage}
									width='270'
									alt='product'
								/>
							</span>
						</div>
					</div>
					<form className='d-flex flex-column justify-content-center cu-product-form'>
						<div className='mb-4'>
							<label htmlFor='firstName' className='d-block'>
								First Name
							</label>
							<input
								className='cu-product-form-input'
								name='firstName'
								value={input.firstName}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='mb-4'>
							<label htmlFor='lastName' className='d-block'>
								Last Name
							</label>
							<input
								className='cu-product-form-input'
								name='lastName'
								value={input.lastName}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='mb-4'>
							<label htmlFor='address' className='d-block'>
								Address
							</label>
							<input
								className='cu-product-form-input'
								name='address'
								value={input.address}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='mb-4'>
							<label htmlFor='email' className='d-block'>
								Email
							</label>
							<input
								className='cu-product-form-input'
								name='email'
								value={input.email}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='mb-4'>
							<label htmlFor='mobile' className='d-block'>
								Mobile
							</label>
							<input
								className='cu-product-form-input'
								name='mobile'
								value={input.mobile}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='mb-4'>
							<label htmlFor='optional' className='d-block'>
								Optional
							</label>
							<input
								className='cu-product-form-input'
								name='optional'
								value={input.optional}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='d-flex align-self-end gap-3'>
							<button className='btn btn-dark align-self-end border-0 px-4'>
								<Link
									to='/user/shop'
									className='text-decoration-none text-white'
								>
									Cancel
								</Link>
							</button>
							<button
								className='btn btn-dark align-self-end border-0 px-4'
								onClick={handleCreateOrder}
							>
								Confirm Order
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default UserConfirmOrder;
