import NavbarMenu from '../components/NavbarMenu';
import logo from '../assets/images/LogoWSTUDIO.png';
import Bottom from '../layouts/bottoms/Bottom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { useLoading } from '../contexts/LoadingContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
	const { userLogin } = useAuth();
	const { startLoading, stopLoading } = useLoading();
	const navigate = useNavigate();

	const [input, setInput] = useState({ username: '', password: '' });

	const handleChangeInput = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleSubmitForm = async (e) => {
		e.preventDefault();
		try {
			startLoading();
			await userLogin(input);
			toast.success('success login');
			navigate('/user/home');
		} catch (err) {
			toast.error(err.response.data.message);
			console.log(err);
		} finally {
			stopLoading();
		}
	};

	return (
		<div className='vh-100 d-flex flex-column justify-content-between'>
			<NavbarMenu />
			<small className='fw-bold brand-center'>WSTUDIO</small>
			<div className='d-flex justify-content-around align-items-center'>
				<img src={logo} width='400' alt='logo' />
				<div>
					<h4 className='mb-4 mt-4'>LOGIN</h4>
					<form className='d-flex flex-column' onSubmit={handleSubmitForm}>
						<div className='mb-3'>
							<label htmlFor='username' className='d-block'>
								Username
							</label>
							<input
								type='text'
								name='username'
								size='50'
								value={input.username}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='username' className='d-block'>
								Password
							</label>
							<input
								type='text'
								name='password'
								size='50'
								value={input.password}
								onChange={handleChangeInput}
							/>
						</div>

						<button className='btn btn-dark align-self-end border-0 px-4'>
							Login
						</button>
					</form>
				</div>
			</div>
			<Bottom />
		</div>
	);
}

export default LoginPage;
