import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NavbarMenu from '../components/NavbarMenu';
import { useLoading } from '../contexts/LoadingContext';
import { useRef, useState } from 'react';
import uploadImage from '../assets/images/uploadImage.png';
import * as productService from '../api/productApi';
import { toast } from 'react-toastify';

function UserConfirmOrder() {
	const { userLogout } = useAuth();
	const { startLoading, stopLoading } = useLoading();
	const inputEl = useRef();

	const [file, setFile] = useState(null);
	const [input, setInput] = useState({
		firstName: '',
		lastName: '',
		address: '',
		mobile: '',
		optional: ''
	});

	const handleChangeInput = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleUpload = async (e) => {
		try {
			e.preventDefault();
			startLoading();
			const formData = new FormData(); // multipart ต้องใช้ท่า new FormData()
			formData.append('image', file); // (ชื่อ key, value)
			formData.append('productName', input.productName);
			formData.append('productType', input.productType);
			formData.append('price', +input.price);
			formData.append('stock', +input.stock);
			console.log(formData);
			await productService.createProduct(formData);
			toast.success('success upload');
			setFile(null);
		} catch (err) {
			console.log(err);
			toast.error(err.response?.data.message);
		} finally {
			stopLoading();
		}
	};

	return (
		<>
			<div className='d-flex justify-content-between align-items-center'>
				<NavbarMenu />
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
								onClick={handleUpload}
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
