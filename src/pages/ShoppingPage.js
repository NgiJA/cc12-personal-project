import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarMenu from '../components/NavbarMenu';
import * as productService from '../api/productApi';
import AlertLogin from '../components/AlertLogin';
import ModalShop from '../components/ui/ModalShop';
import Bottom from '../layouts/bottoms/Bottom';

function ShoppingPage() {
	const [products, setProducts] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const fetchProduct = async () => {
			const res = await productService.getAllProduct();
			setProducts(res.data.products);
		};
		fetchProduct();
	}, []);

	return (
		<>
			<div className='d-flex justify-content-between align-items-center'>
				<NavbarMenu />
				<div className='d-flex gap-4 margin-r'>
					<Link
						to='/user/signup'
						className='text-decoration-none text-dark link-font-size'
					>
						SignUp
					</Link>
					<Link
						to='/user/login'
						className='text-decoration-none text-dark link-font-size'
					>
						Login
					</Link>
				</div>
			</div>
			<small className='fw-bold brand-center'>WSTUDIO</small>
			<h1 className='text-center mt-4'>Shop</h1>
			<div className='shop-item-container'>
				<div className='shop-item-parent'>
					{products.map((item) => (
						<div className='shop-item-border'>
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
											onClick={() => setIsOpen(true)}
										>
											Add to cart
										</small>
									</div>
									<div className='d-flex justify-content-between'>
										<small>{item.price} Baht</small>
										<small>{item.stock} pcs</small>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<Bottom />
			<ModalShop
				title='Alert Login'
				open={isOpen}
				onClose={() => setIsOpen(false)}
			>
				<AlertLogin onSuccess={() => setIsOpen(false)} />
			</ModalShop>
		</>
	);
}

export default ShoppingPage;
