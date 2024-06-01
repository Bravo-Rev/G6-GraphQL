import { API_URL } from './config';
import axios from 'axios';

export async function getUsers() {
	const response = await axios.get(`${API_URL}/users`);
	return response.data;
}

export async function addUser(user: any) {
	const response = await axios.post(`${API_URL}/users`, user);
	return response.data;
}

export async function deleteUser(userId: number) {
	const response = await axios.delete(`${API_URL}/users/${userId}`);
	return response.data;
}
