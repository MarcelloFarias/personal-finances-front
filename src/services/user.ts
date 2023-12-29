import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const login = async (userLoginData: any) => {
    try {
        const response = await axios.post(`${baseUrl}/authUser`, userLoginData);
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        console.log(error);
    }
}