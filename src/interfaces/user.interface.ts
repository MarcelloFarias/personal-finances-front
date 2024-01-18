export interface IUserRegistration {
    name: string,
    email: string,
    password: string
};

export interface User {
    createdAt: string,
    email: string,
    id: number,
    name: string,
    password: string,
    updatedAt: string
};