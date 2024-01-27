import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface LogoutModalProps {
    isVisible: boolean,
    toggleVisibility: () => void
}

const LogoutModal = ({isVisible, toggleVisibility}: LogoutModalProps) => {
    const navigate = useNavigate();

    function logout() {
        localStorage.clear();
        return navigate('/');
    }

    return (
        <Modal show={isVisible} onHide={toggleVisibility}>
            <Modal.Header closeButton>
                <Modal.Title>Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Tem certeza que deseja sair ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={toggleVisibility}>Cancelar</Button>
                <Button variant="danger" onClick={() => logout()}>Sair</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LogoutModal;