import { useState, useEffect } from 'react';
import {Modal} from 'react-bootstrap';
import { getSpentById } from '../../services/spent';
import { Spent } from '../../interfaces/spent.interface';

interface SpentDetailsModalProps {
    isVisible: boolean,
    toggleVisibility: () => void,
    spentId: number
}

const SpentDetailsModal = ({isVisible, toggleVisibility, spentId}: SpentDetailsModalProps) => {
    const [spent, setSpent] = useState<Spent>({
        createdAt: '',
        updatedAt: '',
        id: 0,
        name: '',
        paymentMonthDay: 1,
        value: 0,
        idUser: 0,
        status: ''
    });

    useEffect(() => {
        if(spentId) {
            getSpentById(spentId).then((response) => {
                if(response?.success) {
                    setSpent(response?.spent);
                }
            });
        }   
    }, [spentId, spent]);

    function formatDate(date: any) {
        date.replace(':', '').replace('T', '');
        
        let newDate = [];

        for(let i = 0; i < 10; i++) {
            newDate.push(date[i]);
        }

        return newDate.join('').replace('-', '/').replace('-', '/');
    }

    return (
        <Modal show={isVisible} onHide={toggleVisibility}> 
            <Modal.Header closeButton>
                <Modal.Title>{spent.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Dia de pagamento: {spent.paymentMonthDay}</p>
                <p>Valor: R$ {spent.value.toString().replace('.', ',')}</p>
                <p>Status: <span className={spent.status === 'pago' ? 'text-success' : 'text-warning'}>{spent.status}</span></p>
                <p>Criado em {formatDate(spent.createdAt)}</p>
                <p>Atualizado em {formatDate(spent.updatedAt)}</p>
            </Modal.Body>
        </Modal>
    );
}

export default SpentDetailsModal;