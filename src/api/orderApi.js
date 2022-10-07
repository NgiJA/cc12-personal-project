import axios from '../config/axios';

export const getAllOrderAdmin = () => axios.get('/data/order');
export const getCartProductData = (productId) =>
	axios.get(`data/order/cartProduct/${productId}`);
