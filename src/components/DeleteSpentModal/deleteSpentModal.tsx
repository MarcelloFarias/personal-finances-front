import { Modal, Button } from "react-bootstrap";
import { deleteSpent } from "../../services/spent";
import { alertToastError, alertToastSuccess } from "../Toast/toast";

interface DeleteSpentModalProps {
    isVisible: boolean,
    toggleVisibility: () => void,
    spentId: number
}

const DeleteSpentModal = ({isVisible, toggleVisibility, spentId}: DeleteSpentModalProps) => {

    async function removeSpent() {
        if(spentId) {
            return await deleteSpent(spentId).then((response) => {
                if(response?.success) {
                    alertToastSuccess('Gasto excluído com sucesso !');
                    toggleVisibility();
                    return setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
                return alertToastError(response?.message);
            });
        }
    }

    return (
        <Modal show={isVisible} onHide={toggleVisibility}>
            <Modal.Header>
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