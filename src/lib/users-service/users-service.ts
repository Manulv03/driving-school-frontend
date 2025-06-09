import { axiosClient } from '../axios-client';

interface CreateUserData {
    user: string;
    email: string;
    password: string;
    role: 'STUDENT' | 'INSTRUCTOR';
}

export const usersService = {
    async createUser(data: CreateUserData) {
        const response = await axiosClient.post('/auth/create', data);
        return response.data;
    },

    async getUsers() {
        const response = await axiosClient.get('/users');
        return response.data;
    },

    async getUser(id: string) {
        const response = await axiosClient.get(`/users/${id}`);
        return response.data;
    },

    async updateUser(id: string, data: Partial<CreateUserData>) {
        const response = await axiosClient.put(`/users/${id}`, data);
        return response.data;
    },

    async deleteUser(id: string) {
        const response = await axiosClient.delete(`/users/${id}`);
        return response.data;
    },
};
