import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import { useAuth } from '../contexts/AuthContext';
import uploadImage from '../assets/images/uploadImage.png';
import * as productService from '../api/productApi';
import { toast } from 'react-toastify';
import { useLoading } from '../contexts/LoadingContext';

// ส่ง formData เข้าไป productService.createProduct(formData)
// โดยให้ทำ formData.append('productName', value) --> formData.append('productType', value) เรื่อยๆ

function AdminCreateProductPage() {
	const { adminLogout } = useAuth();
	const { startLoading, stopLoading } = useLoading();
	const inputEl = useRef();

	const [file, setFile] = useState(null);
	const [input, setInput] = useState({
		productName: '',
		productType: 'TOP',
		price: 0,
		stock: 0
	});

	// console.log(file);

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
			<div className='cu-product-container'>
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
						<label htmlFor='productName' className='d-block'>
							Product Name
						</label>
						<input
							className='cu-product-form-input'
							name='productName'
							value={input.productName}
							onChange={handleChangeInput}
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='productType' className='d-block'>
							Product Type
						</label>
						<select
							className='cu-product-form-input'
							name='productType'
							value={input.productType}
							onChange={handleChangeInput}
						>
							<option value='TOP'>TOP</option>
							<option value='BOTTOM'>BOTTOM</option>
							<option value='FOOTWARE'>FOOTWARE</option>
						</select>
					</div>
					<div className='mb-4'>
						<label htmlFor='price' className='d-block'>
							Price
						</label>
						<input
							className='cu-product-form-input'
							name='price'
							value={input.price}
							onChange={handleChangeInput}
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='stock' className='d-block'>
							Stock
						</label>
						<input
							className='cu-product-form-input'
							name='stock'
							value={input.stock}
							onChange={handleChangeInput}
						/>
					</div>
					<div className='d-flex align-self-end gap-3'>
						<button className='btn btn-dark align-self-end border-0 px-4'>
							<Link
								to='/admin/product'
								className='text-decoration-none text-white'
							>
								Cancel
							</Link>
						</button>
						<button
							className='btn btn-dark align-self-end border-0 px-4'
							onClick={handleUpload}
						>
							Add Product
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AdminCreateProductPage;
