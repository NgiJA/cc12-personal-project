import axios from '../config/axios';

export const getAllOrderAdmin = () => axios.get('/data/order');
export const createOrderUser = (input) =>
	axios.post('/user/feature/order', input);
