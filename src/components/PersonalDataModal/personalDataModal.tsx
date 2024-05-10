import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { getUser } from "../../services/user";
import { User } from "../../interfaces/user.interface";
import {
  updateUserPersonalData,
  updateUserPassword,
  deleteUser,
} from "../../services/user";
import {
  alertToastError,
  alertToastSuccess,
  alertToastWarning,
} from "../Toast/toast";
import { useNavigate } from "react-router-dom";

interface PersonalDataModalProps {
  isVisible: boolean;
  toggleVisibility: () => void;
}

const PersonalDataModal = ({
  isVisible,
  toggleVisibility,
}: PersonalDataModalProps) => {
  const [user, setUser] = useState<User>({
    name: "",
    id: 0,
    email: "",
    password: "",
    createdAt: "",
    updatedAt: "",
  });
  const [passwords, setPasswords] = useState<any>({
    newPassword: "",
    oldPassword: "",
  });

  const handlePasswords = (e: any) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleUser = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getUser(token).then((response) => {
        if (response?.success) {
          setUser(response?.user);
        }
      });
    }
  }, []);

  function updateUser() {
    if (user.name && user.email) {
      return updateUserPersonalData(user.id, user).then((response) => {
        if (response?.success) {
          toggleVisibility();
          return alertToastSuccess("Usuário editado com sucesso !");
        }
        return alertToastError("E-mail já registrado, por favor, tente outro");
      });
    }
    return alertToastWarning("Por favor, preencha todos os campos...");
  }

  const [confirmationPasswords, setConfirmationPasswords] = useState<any>({
    newPassword: "",
    deleteAccountPassword: "",
  });

  const handleConfirmationPasswords = (e: any) => {
    setConfirmationPasswords({
      ...confirmationPasswords,
      [e.target.name]: e.target.value,
    });
  };

  function updatePassword() {
    if (passwords.newPassword && passwords.oldPassword) {
      return updateUserPassword(user.id, passwords).then((response) => {
        if (response?.success) {
          toggleVisibility();
          setPasswords({
            newPassword: "",
            oldPassword: "",
          });
          return alertToastSuccess("Senha alterada com sucesso !");
        }
        return alertToastError(response?.message);
      });
    }
    return alertToastWarning("Por favor, preencha todos os campos...");
  }

  const navigate = useNavigate();

  function deleteAccount() {
    if (confirmationPasswords.deleteAccountPassword) {
      if (confirmationPasswords.deleteAccountPassword !== user.password) {
        return alertToastError("Senha incorreta, por favor tente novamente...");
      }

      return deleteUser(user.id).then((response) => {
        if (response?.success) {
          alertToastSuccess("Conta excluída com sucesso !");

          return setTimeout(() => {
            navigate("/");
          }, 3500);
        }
        return alertToastError(response?.message);
      });
    }
    return alertToastWarning(
      "Você precisa confirmar a senha para excluir sua conta..."
    );
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
            <Form.Control
              type="text"
              name="name"
              value={user.name}
              onChange={handleUser}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleUser}
            />
          </Form.Group>

          <Button
            variant="success"
            className="mt-3"
            onClick={() => updateUser()}
          >
            Editar informações
          </Button>
        </Form.Group>

        <h2 className="text-danger mt-5">Zona de perigo</h2>

        <Form.Group className="mt-5">
          <Form.Label className="text-danger">Alterar senha</Form.Label>
          <Form.Group className="mt-3">
            <Form.Label>Nova senha</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              onChange={handlePasswords}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Confirme sua senha atual</Form.Label>
            <Form.Control
              type="password"
              name="oldPassword"
              onChange={handlePasswords}
            />
          </Form.Group>

          <Button
            className="mt-3"
            variant="danger"
            onClick={() => updatePassword()}
          >
            Alterar senha
          </Button>
        </Form.Group>

        <Form.Group className="mt-5">
          <Form.Label className="text-danger">Excluir conta</Form.Label>

          <Form.Group className="mt-3">
            <Form.Label>Confirme sua senha para excluir a conta</Form.Label>
            <Form.Control
              type="password"
              name="deleteAccountPassword"
              onChange={handleConfirmationPasswords}
            />
          </Form.Group>

          <Button
            variant="danger"
            className="mt-3"
            onClick={() => deleteAccount()}
          >
            Excluir minha conta
          </Button>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={toggleVisibility}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PersonalDataModal;
