import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { getUser } from "../../services/user";
import { User } from "../../interfaces/user.interface";
import { updateUserPersonalData, updateUserPassword } from "../../services/user";
import { alertToastError, alertToastSuccess, alertToastWarning } from "../Toast/toast";

interface PersonalDataModalProps {
    isVisible: boolean,
    toggleVisibility: () => void
}

const PersonalDataModal = ({isVisible, toggleVisibility}: PersonalDataModalProps) => {
    const [user, setUser] = useState<User>({
        name: '',
        id: 0,
        email: '',
        password: '',
        createdAt: '',
        updatedAt: ''
    });

    const handleUser = (e: any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            getUser(token).then((response) => {
                if(response?.success) {
                    setUser(response?.user);
                }
            });
        }
    }, []);

    function updateUser() {
        if(user.name && user.email) {
            return updateUserPersonalData(user.id, user).then((response) => {
                if(response?.success) {
                    toggleVisibility();
                    return alertToastSuccess('Usuário editado com sucesso !');
                }
                return alertToastError('E-mail já registrado, por favor, tente outro');
            });
        }
        return alertToastWarning('Por favor, preencha todos os campos...');
    }

    const [newPassword, setNewPassword] = useState<string>('');

    const handleNewPassword = (e: any) => {
        setNewPassword(e.target.value);
    }

    const [confirmationPassword, setConfirmationPassword] = useState<string>('');

    const handleConfirmationPassword = (e: any) => {
        setConfirmationPassword(e.target.value);
    }

    function updatePassword() {
        if(newPassword && confirmationPassword) {
            if(confirmationPassword !== user.password) {
                return alertToastError('Senha atual incorreta, por favor tente novamente...');
            }
            else {
                const newData = {
                    password: newPassword
                }

                return updateUserPassword(user.id, newData).then((response) => {
                    if(response?.success) {
                        toggleVisibility();
                        setNewPassword('');
                        setConfirmationPassword('');
                        return alertToastSuccess('Senha alterada com sucesso !');
                    }
                    return alertToastError(response?.message);
                });
            }

        }
        return alertToastWarning('Por favor, preencha todos os campos...');
    }

    return (
        <Modal show={isVisible} onHide={toggleVisibility}>
            <Modal.Header closeButton>
                <Modal.Title>Dados Pessoais</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" name="name" value={user.name} onChange={handleUser} />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={user.email} onChange={handleUser}/>
                    </Form.Group>

                    <Button variant="success" className="mt-3" onClick={() => updateUser()}>Editar informações</Button>
                </Form.Group>

                <Form.Group className="mt-5">
                    <h2 className="text-danger">Zona de perigo</h2>

                    <Form.Group className="mt-3">
                        <Form.Label>Nova senha</Form.Label>
                        <Form.Control type="password" name="password" value={newPassword} onChange={handleNewPassword} />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Confirme sua senha atual</Form.Label> 
                        <Form.Control type="password" name="password" value={confirmationPassword} onChange={handleConfirmationPassword} />
                    </Form.Group>

                    <Button className="mt-3" variant="danger" onClick={() => updatePassword()}>Alterar senha</Button>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={toggleVisibility}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PersonalDataModal;