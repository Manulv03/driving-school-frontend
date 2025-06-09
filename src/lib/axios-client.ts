import axios from 'axios';
import { authService } from './auth';

export const axiosClient = axios.create({
    baseURL: 'http://44.212.19.44:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para añadir el token a las peticiones
axiosClient.interceptors.request.use((config) => {
    const token = authService.getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para manejar errores de autenticación
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            authService.logout();
        }
        return Promise.reject(error);
    }
);
