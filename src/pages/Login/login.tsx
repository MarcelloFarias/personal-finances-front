import {useState} from 'react';
import { Container, Form, Button } from "react-bootstrap";
import './style.scss';

const Login = () => {
    const [cardActive, setCardActive] = useState<string>('login');

    const handleCardActive = (e: any) => {
        setCardActive(e.target.value);
    }

    return (
        <Container className="main-container login-container">
            <div className="buttons-row"> 
                <Button variant={cardActive === 'login' ? 'success' : 'outline-success'} className="btn" value='login' onClick={handleCardActive}>Login</Button>
                <Button variant={cardActive === 'signup' ? 'primary' : 'outline-primary'} className="btn" value='signup' onClick={handleCardActive}>Cadastre-se</Button>
            </div>
            <div className="login-card" style={{display: cardActive === 'login' ? 'block' : 'none'}}>
                <div className='card-title bg-success'>
                    <h3 className='text-light p-5'>Acessar conta</h3>
                </div>
                <div className='card-content'>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Digite o seu email..." />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Digite sua senha..." />
                    </Form.Group>

                    <Form.Group className="mt-5 d-flex align-items-center justify-content-center flex-column w-100">
                        <Button variant="success" className="btn-login">Entrar</Button>
                    </Form.Group>
                </div>
            </div>

            <div className="sign-up-card" style={{display: cardActive === 'signup' ? 'block' : 'none'}}>
                <div className='card-title bg-primary'>
                    <h3 className='text-light p-5'>Criar conta</h3>
                </div>
                <div className='card-content'>
                    <Form.Group className='mt-3'>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="email" placeholder="Digite o seu nome..." />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="password" placeholder="Digite o seu email..." />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Crie uma senha..." />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Confirmar senha</Form.Label>
                        <Form.Control type="password" placeholder="Agora confirme sua senha..." />
                    </Form.Group>

                    <Form.Group className="mt-4 d-flex align-items-center justify-content-center flex-column w-100">
                        <Button variant="primary" className="btn-sign-up">Salvar</Button>
                    </Form.Group>
                </div>
            </div>
        </Container>
    );
}

export default Login;