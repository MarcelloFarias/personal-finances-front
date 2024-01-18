import { toast } from "react-toastify";

const toastConfig: any = {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnclick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
}

export const alertToastInfo = (text: string) => toast.info(text, toastConfig);

export const alertToastWarning = (text: string) => toast.warn(text, toastConfig);

export const alertToastError = (text: string) => toast.error(text, toastConfig);

export const alertToastSuccess = (text: string) => toast.success(text, toastConfig);

export const alertToastDefault = (text: string) => toast(text, toastConfig);