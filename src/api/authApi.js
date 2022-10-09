import axios from '../config/axios';

export const register = (input) => axios.post('/user/auth/register', input);
export const login = (input) => axios.post('/user/auth/login', input);
export const getUser = (token) =>
	axios.get('/user/feature/user', {
		headers: { Authorization: 'Bearer ' + token }
	});

export const adminLogin = (input) => axios.post('/admin/auth/login', input);
