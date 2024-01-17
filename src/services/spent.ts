import axios from "axios";

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