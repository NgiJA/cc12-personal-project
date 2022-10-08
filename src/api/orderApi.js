import axios from '../config/axios';

export const getAllOrderAdmin = () => axios.get('/data/order');

export const createOrderUser = (input, token) =>
	axios.post('/user/feature/order', input, {
		headers: { Authorization: 'Bearer ' + token }
	});

export const getOrderUser = (token) =>
	axios.get('/user/feature/purchaseorder', {
		headers: { Authorization: 'Bearer ' + token }
	});
