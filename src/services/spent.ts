import axios from "axios";
import { ISpentRegistration } from "../interfaces/spent.interface";

const baseUrl = 'http://localhost:8080';

export const getSpentByUserId = async (userId: number) => {
    try {
        const response = await axios.get(`${baseUrl}/getSpents/${userId}`);
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        console.log("Fail to get spent by user id: ", error);
    }
}

export const registerSpent = async (newSpent: ISpentRegistration) => {
    try {
        const response = await axios.post(`${baseUrl}/createSpent`, newSpent);
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        console.log('Fail to register a spent...', error);
    }
}