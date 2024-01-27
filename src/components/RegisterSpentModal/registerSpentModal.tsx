import { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { ISpentRegistration } from '../../interfaces/spent.interface';
import { alertToastError, alertToastSuccess, alertToastWarning } from '../Toast/toast';
import { getSpentByUserId, registerSpent } from '../../services/spent';
import { getUser } from '../../services/user';

interface RegisterSpentModalProps {
    isVisible: boolean,
    toggleVisibility: () => void,
    setSpents: any,
}

const RegisterSpentModal = ({ isVisible, toggleVisibility, setSpents }: RegisterSpentModalProps) => {
    const monthDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    const [spentData, setSpentData] = useState<ISpentRegistration>({
        name: '',
        paymentMonthDay: 1,
        value: 0,
        status: 'pendente',
        idUser: 0
    });

    const handleSpentData = (e: any) => {
        setSpentData({
            ...spentData,
            [e.target.name]: e.target.value.replace(',', '.')
        });
    }  

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            getUser(token).then((response) => {
                if(response?.success) {
                    setSpentData({
                        name: '',
                        paymentMonthDay: 1,
                        value: 0,
                        status: 'pendente',
                        idUser: response?.user.id
                    });
                }
            });
        }
    }, [localStorage.getItem('token')]);

    async function saveSpent() {
        if(spentData.name && spentData.paymentMonthDay && spentData.value && spentData.status) {
            if(spentData.paymentMonthDay < 0 || spentData.paymentMonthDay > 31) {
                return alertToastError('Dia de pagamento inválido ! Por Favor,  tente novamente...');
            }
            if(spentData.value <= 0) {
                return alertToastError('Valor do gasto inválido ! Por favor, tente novamente...');
            }

            return await registerSpent(spentData).then((response: any) => {
                if(response?.success) {
                    toggleVisibility();

                    const token = localStorage.getItem('token');

                    if(token) {
                        getUser(token).then((response) => {
                            if(response?.success) {
                                getSpentByUserId(response?.user.id).then((response) => {
                                    if(response?.success) {
                                        setSpents(response?.spents);
                                    }
                                });
                            }
                        });
                    }

                    return alertToastSuccess("Gasto registrado com sucesso !");
                }
                return alertToastError(response?.message);
            }).then(() => {
                setSpentData({
                    name: '',
                    paymentMonthDay: 1,
                    value: 0,
                    status: 'pendente',
                    idUser: 0
                });
            });
        }
        return alertToastWarning('Por favor, preencha todos os campos...');
    }

    return (
        <Modal show={isVisible} onHide={toggleVisibility}>
            <Modal.Header closeButton>
                <Modal.Title>Registrar um gasto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Nome do gasto</Form.Label>
                    <Form.Control type="text" placeholder="Digite o nome do seu gasto..." name="name" onChange={handleSpentData} />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Dia de pagamento</Form.Label>
                    <Form.Select name="paymentMonthDay" onChange={handleSpentData}>
                        {monthDays.map((day: number) => {
                            return <option key={day} value={day}>{day}</option>;
                        })}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Valor do gasto</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>R$</InputGroup.Text>
                        <Form.Control type="number" name="value" placeholder="Digite o valor do gasto..." onChange={handleSpentData} />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Status do gasto</Form.Label>
                    <Form.Select name="status" onChange={handleSpentData}>
                        {['pendente', 'pago'].map((status: string) => {
                            return <option key={status} value={status}>{status}</option>
                        })}
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={toggleVisibility}>Cancelar</Button>
                <Button variant='success' onClick={() => saveSpent()}>Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RegisterSpentModal;