import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import HomePageLogin from '../pages/HomePageLogin';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ShoppingPage from '../pages/ShoppingPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminSummaryPage from '../pages/AdminSummaryPage';
import AdminProductPage from '../pages/AdminProductPage';
import { useAuth } from '../contexts/AuthContext';

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
			{user ? (
				<>
					<Route path='/user/home' element={<HomePageLogin />} />
				</>
			) : admin ? (
				<>
					<Route path='/admin/summary' element={<AdminSummaryPage />} />
					<Route path='/admin/product' element={<AdminProductPage />} />
					<Route path='/user/home' element={<HomePage />} />
					<Route path='/user/signup' element={<RegisterPage />} />
					<Route path='/user/login' element={<LoginPage />} />
					<Route path='/user/shop' element={<ShoppingPage />} />
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
