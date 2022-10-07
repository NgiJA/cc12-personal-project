import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HomePage from '../pages/HomePage';
import HomePageLogin from '../pages/HomePageLogin';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ShoppingPage from '../pages/ShoppingPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminSummaryPage from '../pages/AdminSummaryPage';
import AdminProductPage from '../pages/AdminProductPage';
import AdminCreateProductPage from '../pages/AdminCreateProductPage';
import AdminUpdateProductPage from '../pages/AdminUpdateProductPage';
import ShoppingPageLogin from '../pages/ShoppingPageLogin';
import UserConfirmOrderPage from '../pages/UserConfirmOrderPage';
import UserOrder from '../pages/UserOrderPage';

function Router() {
	const { admin, user } = useAuth();

	return (
		<Routes>
			{/* {user ? (
				<>
					<Route path='/user/home' element={<HomePageLogin />} />
					<Route path='/admin/summary' element={<AdminSummaryPage />} />
					<Route path='/admin/product' element={<AdminProductPage />} />
				</>
			) : (
				<>
					<Route path='/admin/login' element={<AdminLoginPage />} />
					<Route path='/user/home' element={<HomePage />} />
					<Route path='/user/signup' element={<RegisterPage />} />
					<Route path='/user/login' element={<LoginPage />} />
					<Route path='/user/shop' element={<ShoppingPage />} />
				</>
			)} */}
			{user && admin ? (
				<>
					<Route path='/user/home' element={<HomePageLogin />} />
					<Route path='/admin/summary' element={<AdminSummaryPage />} />
					<Route path='/admin/product' element={<AdminProductPage />} />
					<Route
						path='/admin/product/create'
						element={<AdminCreateProductPage />}
					/>
					<Route
						path='/admin/product/:productId/update'
						element={<AdminUpdateProductPage />}
					/>
					<Route path='/user/shop' element={<ShoppingPageLogin />} />
					<Route path='/user/confirmorder' element={<UserConfirmOrderPage />} />
					<Route path='/user/purchaseorder' element={<UserOrder />} />
				</>
			) : admin ? (
				<>
					<Route path='/admin/summary' element={<AdminSummaryPage />} />
					<Route path='/admin/product' element={<AdminProductPage />} />
					<Route
						path='/admin/product/create'
						element={<AdminCreateProductPage />}
					/>
					<Route
						path='/admin/product/:productId/update'
						element={<AdminUpdateProductPage />}
					/>
					<Route path='/user/home' element={<HomePage />} />
					<Route path='/user/signup' element={<RegisterPage />} />
					<Route path='/user/login' element={<LoginPage />} />
					<Route path='/user/shop' element={<ShoppingPage />} />
				</>
			) : user ? (
				<>
					<Route path='/user/home' element={<HomePageLogin />} />
					<Route path='/admin/login' element={<AdminLoginPage />} />
					<Route path='/user/shop' element={<ShoppingPageLogin />} />
					<Route path='/user/confirmorder' element={<UserConfirmOrderPage />} />
					<Route path='/user/purchaseorder' element={<UserOrder />} />
				</>
			) : (
				<>
					<Route path='/admin/login' element={<AdminLoginPage />} />
					<Route path='/user/home' element={<HomePage />} />
					<Route path='/user/signup' element={<RegisterPage />} />
					<Route path='/user/login' element={<LoginPage />} />
					<Route path='/user/shop' element={<ShoppingPage />} />
				</>
			)}
		</Routes>
	);
}

export default Router;
