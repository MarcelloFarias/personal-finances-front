import { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem, Offcanvas } from "react-bootstrap";
import { getUser } from "../../services/user";
import { User } from "../../interfaces/user.interface";
import { IoIosArrowForward } from "react-icons/io";

interface SideMenuProps {
    isVisible: boolean,
    toggleVisibility: () => void
}

const SideMenu = ({isVisible, toggleVisibility}: SideMenuProps) => {
    const [user, setUser] = useState<User>({
        createdAt: '',
        updatedAt: '',
        id: 0,
        name: '',
        email: '',
        password: ''
    });

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

    return (
        <Offcanvas show={isVisible} onHide={toggleVisibility} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Olá {user.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup>
                    <ListGroupItem>
                        <Button variant="" className="w-100 d-flex justify-content-between align-items-center">
                            Dados pessoais 
                            <IoIosArrowForward/>
                        </Button>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button variant="" className="w-100 d-flex justify-content-between align-items-center text-danger">
                            Sair 
                            <IoIosArrowForward/>
                        </Button>
                    </ListGroupItem>
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default SideMenu;