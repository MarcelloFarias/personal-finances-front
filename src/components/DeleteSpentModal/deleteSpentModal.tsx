import { Modal, Button } from "react-bootstrap";
import { deleteSpent } from "../../services/spent";
import { alertToastError, alertToastSuccess } from "../Toast/toast";
import { getUser } from "../../services/user";
import { getSpentByUserId } from "../../services/spent";

interface DeleteSpentModalProps {
    isVisible: boolean,
    toggleVisibility: () => void,
    spentId: number,
    setSpents: any,
}

const DeleteSpentModal = ({isVisible, toggleVisibility, spentId, setSpents}: DeleteSpentModalProps) => {

    async function removeSpent() {
        if(spentId) {
            return await deleteSpent(spentId).then((response) => {
                if(response?.success) {
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

                    return alertToastSuccess('Gasto excluído com sucesso !');

                }
                return alertToastError(response?.message);
            });
        }
    }

    return (
        <Modal show={isVisible} onHide={toggleVisibility}>
            <Modal.Header closeButton>
                <Modal.Title>Excluir um gasto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Tem certeza que deseja excluir esse gasto ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary"onClick={toggleVisibility}>Cancelar</Button>
                <Button variant="danger" onClick={() => removeSpent()}>Excluir</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteSpentModal;