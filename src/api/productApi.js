import axios from '../config/axios';

export const getAllProduct = () => axios.get('/data/product');
export const getSelectedProduct = (productId) =>
	axios.get(`/data/product/${productId}`);
export const createProduct = (input) =>
	axios.post('/admin/product/create', input);
export const deleteProduct = (productId) =>
	axios.delete(`/admin/product/delete/${productId}`);

export const updateProduct = (input, productId) =>
	axios.patch(`/admin/product/update/${productId}`, input);
