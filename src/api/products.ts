import { API_URL } from './config';
import axios from 'axios';

export async function getProducts() {
	const response = await axios.get(`${API_URL}/products`);
	return response.data;
}

export async function addProduct(product: any) {
	const response = await axios.post(`${API_URL}/products`, product);
	return response.data;
}

export async function updateProduct(productId: number, product: any) {
	const response = await axios.put(`${API_URL}/products/${productId}`, product);
	return response.data;
}
