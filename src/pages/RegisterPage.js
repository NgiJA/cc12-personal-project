import NavbarMenu from '../components/NavbarMenu';
import logo from '../assets/images/LogoWSTUDIO.png';
import Bottom from '../layouts/bottoms/Bottom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLoading } from '../contexts/LoadingContext';

function RegisterPage() {
	const { register } = useAuth();
	const { startLoading, stopLoading } = useLoading();

	const [input, setInput] = useState({
		username: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: '',
		email: '',
		mobile: ''
	});

	const handleChangeInput = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleSubmitForm = async (e) => {
		e.preventDefault();
		try {
			startLoading();
			await register(input);
			toast.success('success register');
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
					<h4 className='mb-4 mt-4'>SIGNUP</h4>
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
							<label htmlFor='password' className='d-block'>
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
						<div className='mb-3'>
							<label htmlFor='confirmPassword' className='d-block'>
								Confirm Password
							</label>
							<input
								type='text'
								name='confirmPassword'
								size='50'
								value={input.confirmPassword}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='firstName' className='d-block'>
								First Name
							</label>
							<input
								type='text'
								name='firstName'
								size='50'
								value={input.firstName}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='lastName' className='d-block'>
								Last Name
							</label>
							<input
								type='text'
								name='lastName'
								size='50'
								value={input.lastName}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='email' className='d-block'>
								Email
							</label>
							<input
								type='text'
								name='email'
								size='50'
								value={input.email}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='mobile' className='d-block'>
								Mobile
							</label>
							<input
								type='text'
								name='mobile'
								size='50'
								value={input.mobile}
								onChange={handleChangeInput}
							/>
						</div>
						<button className='btn btn-dark align-self-end border-0 px-4'>
							Confirm
						</button>
					</form>
				</div>
			</div>
			<Bottom />
		</div>
	);
}

export default RegisterPage;
