import {useEffect, useState} from 'react';
import {Modal, Button, Form, InputGroup} from 'react-bootstrap';
import { getSpentById, updateSpent, getSpentByUserId } from '../../services/spent';
import { alertToastError, alertToastSuccess, alertToastWarning } from '../Toast/toast';
import { getUser } from '../../services/user';

interface UpdateSpentModalProps {
    isVisible: boolean,
    toggleVisibility: () => void,
    spentId: number,
    setSpents: any
}

const UpdateSpentModal = ({isVisible, toggleVisibility, spentId, setSpents}: UpdateSpentModalProps) => {
    const monthDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    const [spent, setSpent] = useState<any>({
        id: 0,
        name: '',
        value: 0,
        paymentMonthDay: 1,
        status: 'pendente',
    });

    const handleSpent = (e: any) => {
        setSpent({
            ...spent,
            [e.target.name]: e.target.value.replace(',', '.')
        });
    }

    useEffect(() => {
        if(spentId) {
            getSpentById(spentId).then((response) => {
                if(response?.success) {
                    setSpent(response?.spent);
                }
            });
        }
    }, [spentId]);

    async function editSpent() {
        if(spent.name && spent.paymentMonthDay && spent.status && spent.value) {
            if(spent.value <= 0) {
                return alertToastError("Valor do gasto inválido");
            }
            if(spent.paymentMonthDay < 1 || spent.paymentMonthDay > 31) {
                return alertToastError('Dia de pagamento inválido');
            }

            return await updateSpent(spentId, spent).then((response) => {
                if(response.success) {
                    toggleVisibility();

                    const token = localStorage.getItem('token');

                    if(token) {
                        getUser(token).then((response) => {
                            if(response?.success) {
                                getSpentByUserId(response?.user.id).then((response) => {
                                    if(response?.success) {
                                        setSpents([...response?.spents]);
                                    }
                                });
                            }
                        });
                    }

                    return alertToastSuccess(response?.message);
                }
                return alertToastError(response?.message);
            });
        }
        return alertToastWarning('Por favor, preencha todos os campos...');
    }

    return (
        <Modal show={isVisible} onHide={toggleVisibility}>  
            <Modal.Header closeButton>
                <Modal.Title>Editar um gasto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Nome do gasto</Form.Label>
                    <Form.Control type='text' name='name' onChange={handleSpent} value={spent.name}/>
                </Form.Group>

                <Form.Group className='mt-3'>
                    <Form.Label>Dia de pagamento</Form.Label>
                    <Form.Select name='paymentMonthDay' onChange={handleSpent} value={spent.paymentMonthDay} >
                        {monthDays.map((day: number) => {
                            return <option key={day}>{day}</option>;
                        })}
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mt-3'>
                    <Form.Label>Valor do gasto</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>R$</InputGroup.Text>
                        <Form.Control name='value' onChange={handleSpent} value={spent.value} />
                    </InputGroup>
                </Form.Group>

                <Form.Group className='mt-3'>
                    <Form.Label>Status do gasto</Form.Label>
                    <Form.Select name='status' onChange={handleSpent} value={spent.status} >
                        {['pendente', 'pago'].map((status: string) => {
                            return <option key={status}>{status}</option>;
                        })}
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={toggleVisibility}>Cancelar</Button>
                <Button variant='success' onClick={() => editSpent()}>Editar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateSpentModal;