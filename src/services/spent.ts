import axios from "axios";
import { ISpentRegistration } from "../interfaces/spent.interface";

const baseUrl = 'http://192.168.0.107:8080';

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

export const deleteSpent = async (spentId: number) => {
    try {
        const response = await axios.delete(`${baseUrl}/deleteSpent/${spentId}`);
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        console.log('Fail to delete spent...', error);
    }
}

export const getSpentById = async (spentId: number) => {
    try {
        const response = await axios.get(`${baseUrl}/getSpent/${spentId}`);
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        console.log('Fail to get spent with id ' + spentId, error);
    }
}

export const updateSpent = async (spentId: number, newSpentData: any) => {
    try {
        const response = await axios.put(`${baseUrl}/updateSpent/${spentId}`, newSpentData);
        console.log(response.data);
        return (await response).data;
    }
    catch(error) {
        console.log('Fail to update spent...', error);
    }
}