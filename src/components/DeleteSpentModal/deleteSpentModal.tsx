import { Modal, Button } from "react-bootstrap";
import { deleteSpent } from "../../services/spent";
import { alertToastError, alertToastSuccess } from "../Toast/toast";
import { Spent } from "../../interfaces/spent.interface";

interface DeleteSpentModalProps {
    isVisible: boolean,
    toggleVisibility: () => void,
    spentId: number,
    setSpents: any,
    spents: Spent[]
}

const DeleteSpentModal = ({isVisible, toggleVisibility, spentId, setSpents, spents}: DeleteSpentModalProps) => {

    async function removeSpent() {
        if(spentId) {
            return await deleteSpent(spentId).then((response) => {
                if(response?.success) {
                    alertToastSuccess('Gasto excluído com sucesso !');

                    setSpents(spents.filter((spent: any) => {
                        return spent && spent.id !== spentId;
                    }));

                    return toggleVisibility();
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