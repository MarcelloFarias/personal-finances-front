export interface ISpentRegistration {
    name: string,
    paymentMonthDay: number,
    value: number,
    status: string,
    idUser: number | undefined
};

export interface Spent {
    createdAt: string,
    id: number,
    idUser: number,
    name: string,
    paymentMonthDay: number,
    status: string,
    updatedAt: string,
    value: number
};

export interface SpentAmounts {
    paidAmount: number,
    pendingAmount: number,
    spentsAmount: number,
    totalPaid: string,
    totalPending: string,
    totalSpents: string
};