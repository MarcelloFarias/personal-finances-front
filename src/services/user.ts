import axios from 'axios';
import { IUserRegistration } from '../interfaces/user.interface';

const baseUrl = 'http://192.168.0.107:8080';

export const login = async (userLoginData: any) => {
    try {
        const response = await axios.post(`${baseUrl}/authUser`, userLoginData);
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        console.log("Fail to Login: ", error);
    }
}

export const getUser = async (userToken: any) => {
    try {
        const response = await axios.get(`${baseUrl}/authorize`, {
            headers: {
                'x-access-token': userToken
            }
        });
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        console.log("Fail to get user: ", error);
    }
}

export const registerUser = async (userData: IUserRegistration) => {
    try {
        const response = await axios.post(`${baseUrl}/createUser`, userData);
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        console.log("Fail to register user: ", error);
    }
}

export const updateUserPersonalData = async (userId: number, newData: any) => {
    try {
        const response = await axios.put(`${baseUrl}/updatePersonalData/${userId}`, newData);
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        console.log('Fail to update user...', error);
    }
}

export const updateUserPassword = async (userId: number, newData: any) => {
    try {
        const response = await axios.put(`${baseUrl}/updatePassword/${userId}`, newData);
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        console.log('Fail to update user...', error);
    }
}

export const deleteUser = async (userId: number) => {
    try {
        const response = await axios.delete(`${baseUrl}/deleteUser/${userId}`);
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        console.log('Fail to delete user...', error);
    }
}