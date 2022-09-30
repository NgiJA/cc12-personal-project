import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/LogoWSTUDIO.png';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { useLoading } from '../contexts/LoadingContext';

function AdminLoginPage() {
	const { adminLogin } = useAuth();
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
			await adminLogin(input);
			toast.success('success login');
			navigate('/admin/summary');
		} catch (err) {
			toast.error(err.response.data.message);
			console.log(err);
		} finally {
			stopLoading();
		}
	};
	return (
		<div className='vh-100 d-flex flex-column justify-content-between'>
			<div className='d-flex justify-content-center brand-admin'>
				<small className='fw-bold'>WSTUDIO ADMIN</small>
			</div>
			<div className='d-flex justify-content-around align-items-center'>
				<img src={logo} width='400' alt='logo' />
				<div>
					<h4 className='mb-4 mt-4'>ADMIN LOGIN</h4>
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
			<div className='mb-5'></div>
		</div>
	);
}

export default AdminLoginPage;
