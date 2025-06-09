import { axiosClient } from '../axios-client';
import { Instructor } from '@/types/instructor/instructor-types';

export const instructorService = {
    async getInstructors() {
        try {
            const response = await axiosClient.get('/admin/instructors/list-instructors');
            return response.data;
        } catch (error) {
            console.error('Error fetching instructors:', error);
            throw error;
        }
    },

    async getInstructorById(id: string) {
        try {
            const response = await axiosClient.get(`/instructors/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching instructor by ID:', error);
            throw error;
        }
    },

    async createInstructor(instructorData: Instructor) {
        try {
            const response = await axiosClient.post('/instructors', instructorData);
            return response.data;
        } catch (error) {
            console.error('Error creating instructor:', error);
            throw error;
        }
    },

    async updateInstructor(id: string, instructorData: Partial<Instructor>) {
        try {
            const response = await axiosClient.put(`/instructors/${id}`, instructorData);
            return response.data;
        } catch (error) {
            console.error('Error updating instructor:', error);
            throw error;
        }
    },

    async deleteInstructor(id: string) {
        try {
            const response = await axiosClient.delete(`/instructors/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting instructor:', error);
            throw error;
        }
    },
};