import { Link } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import { useAuth } from '../contexts/AuthContext';
import * as productService from '../api/productApi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProductPagination from '../components/ProductPagination';

function AdminProductPage() {
	const { adminLogout } = useAuth();

	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const handleDelete = async (productId) => {
		try {
			const fetchProduct = async () => {
				const res = await productService.getAllProduct();
				console.log(res);
				setProducts(res.data.products);
			};
			await productService.deleteProduct(productId);
			fetchProduct();
			toast.success('success delete');
		} catch (err) {
			console.log(err);
			toast.error(err.response?.data.message);
		}
	};

	const numPage = Math.ceil(products.length / 6);
	const showProducts = products.slice(6 * (currentPage - 1), 6 * currentPage);

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
		const fetchProduct = async () => {
			const res = await productService.getAllProduct();
			setProducts(res.data.products);
		};
		fetchProduct();
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
				<button className='btn btn-dark border-0 px-4 product-add-button'>
					<Link
						to='/admin/product/create'
						className='text-decoration-none text-white'
					>
						+Add Product
					</Link>
				</button>

				<table>
					<tbody>
						<tr className='table-header-height'>
							<th className='text-center'>ProductId</th>
							<th className='text-center product-name-width'>Product Name</th>
							<th className='text-center'>Price/Pcs</th>
							<th className='text-center'>Sale(pcs)</th>
							<th className='text-center'>Stock(pcs)</th>
							<th className='text-center product-button-width	'></th>
						</tr>
						{showProducts.map((item) => (
							<tr className='table-row-height' key={item.id}>
								<td className='text-center'>{item.id}</td>
								<td>
									<img
										src={item.image}
										alt='logo'
										width='70'
										className='product-image-table'
									></img>
									<p1>{item.productName}</p1>
								</td>
								<td className='text-center'>{item.price} Baht</td>
								<td className='text-center'>10</td>
								<td className='text-center'>{item.stock}</td>
								<td className='text-center'>
									<button
										className='btn btn-danger border-0 product-delete-button'
										onClick={() => handleDelete(item.id)}
									>
										Delete
									</button>
									<button className='btn btn-dark border-0 product-edit-button'>
										<Link
											to={`/admin/product/${item.id}/update`}
											className='text-decoration-none text-white'
										>
											Edit
										</Link>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className='d-flex justify-content-between align-items-center'>
					<small className='text-secondary'>SKU: {products.length} items</small>
					<ProductPagination
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

export default AdminProductPage;
