import axios from 'axios';
import { IUserData } from '../interfaces/user.interface';

const baseUrl = 'http://localhost:8080';

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

export const registerUser = async (userData: IUserData) => {
    try {
        const response = await axios.post(`${baseUrl}/createUser`, userData);
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        console.log("Fail to register user: ", error);
    }
}