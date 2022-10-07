import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import { useAuth } from '../contexts/AuthContext';
// import uploadImage from '../assets/images/uploadImage.png';
import * as productService from '../api/productApi';
import { toast } from 'react-toastify';
import { useLoading } from '../contexts/LoadingContext';
import { useNavigate } from 'react-router-dom';

// ส่ง formData เข้าไป productService.createProduct(formData)
// โดยให้ทำ formData.append('productName', value) --> formData.append('productType', value) เรื่อยๆ

function AdminUpdateProductPage() {
	const { productId } = useParams();
	const { adminLogout } = useAuth();
	const navigate = useNavigate();
	const { startLoading, stopLoading } = useLoading();
	const inputEl = useRef();

	const [file, setFile] = useState(null);
	const [input, setInput] = useState({
		productName: '',
		productType: 'TOP',
		price: 0,
		stock: 0,
		image: ''
	});

	const handleChangeInput = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleUpdate = async (e) => {
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
			await productService.updateProduct(formData, productId);
			toast.success('success update');
			setFile(null);
			navigate('/admin/product');
		} catch (err) {
			console.log(err);
			toast.error(err.response?.data.message);
		} finally {
			stopLoading();
		}
	};

	useEffect(() => {
		const fetchProduct = async () => {
			const res = await productService.getSelectedProduct(productId);
			const { productName, productType, price, stock, image } =
				res.data.product;
			setInput({
				...input,
				productName: productName,
				productType: productType,
				price: price,
				stock: stock,
				image: image
			});
		};
		fetchProduct();
	}, []);

	console.log(file);
	console.log(input.image);

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
								src={file ? URL.createObjectURL(file) : input.image}
								width='270'
								alt='product'
							/>
						</span>
					</div>
				</div>
				<form className='d-flex flex-column justify-content-center cu-product-form'>
					<div className='mb-4'>
						<label htmlFor='username' className='d-block'>
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
						<label htmlFor='username' className='d-block'>
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
						<label htmlFor='username' className='d-block'>
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
						<label htmlFor='username' className='d-block'>
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
							onClick={handleUpdate}
						>
							Update Product
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AdminUpdateProductPage;
