import {useState} from 'react';
import { Container, Form, Button } from "react-bootstrap";
import { BiUserPlus, BiUserCheck } from "react-icons/bi";
import { PiEye, PiEyeClosedDuotone } from "react-icons/pi";
import { login } from '../../services/user';
import './style.scss';

const LoginSignup = () => {
    const [cardActive, setCardActive] = useState<string>('login');

    const handleCardActive = (e: any) => {
        setCardActive(e.target.value);
    }

    const [isLoginPasswordVisible, setIsLoginPasswordVisible] = useState<boolean>(false);
    const [isRegisterPasswordVisible, setIsRegisterPasswordVisible] = useState<boolean>(false);
    const [isConfirmRegisterPasswordVisible, setIsConfirmRegisterPasswordVisible] = useState<boolean>(false);

    const renderShowHidePassword = (isVisible: boolean) => {
        return isVisible ? <PiEyeClosedDuotone /> : <PiEye />;
    }

    const verifyInputPasswordType = (isVisible: boolean) => {
        return isVisible ? 'text' : 'password';
    }

    const [loginData, setLoginData] = useState<any>({
        email: '',
        password: ''
    });

    const handleLoginData = (e: any) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    }

    const [userData, setUserData] = useState<any>({
        name: '',
        email: '',
        password: '',
    });

    const handleUserData = (e: any) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const [confirmPassword, setConfirmPassword] = useState<string>('');

    async function authenticateUser() {
        if(loginData.email && loginData.password) {
            return await login(loginData).then((response) => {
                if(response.success) {
                    return alert('hello')
                }
                return alert(response.message);
            });
        }
        return alert('Please fill all fields !');
    }

    return (
        <Container className="main-container login-container">
            <div className="buttons-row"> 
                <Button variant={cardActive === 'login' ? 'success' : 'outline-success'} className="btn" value='login' onClick={handleCardActive}>Entrar</Button>
                <Button variant={cardActive === 'signup' ? 'primary' : 'outline-primary'} className="btn" value='signup' onClick={handleCardActive}>Cadastre-se</Button>
            </div>
            <div className="login-card" style={{display: cardActive === 'login' ? 'block' : 'none'}}>
                <div className='card-title bg-success'>
                    <h3 className='text-light p-5'>Acessar conta <BiUserCheck/></h3>
                </div>
                <div className='card-content'>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Digite o seu email..." name='email'  onChange={handleLoginData} />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Senha</Form.Label>
                        <div className='d-flex'>
                            <Form.Control type={verifyInputPasswordType(isLoginPasswordVisible)} placeholder="Digite sua senha..." name='password' onChange={handleLoginData} />
                            <Button variant='' onClick={() => setIsLoginPasswordVisible(!isLoginPasswordVisible)}>
                                {renderShowHidePassword(isLoginPasswordVisible)}
                            </Button>
                        </div>
                    </Form.Group>

                    <Form.Group className="mt-5 d-flex align-items-center justify-content-center flex-column w-100">
                        <Button variant="success" className="btn-login" onClick={() => authenticateUser()}>Login</Button>
                    </Form.Group>
                </div>
            </div>

            <div className="sign-up-card" style={{display: cardActive === 'signup' ? 'block' : 'none'}}>
                <div className='card-title bg-primary'>
                    <h3 className='text-light p-5'><BiUserPlus /> Criar conta</h3>
                </div>
                <div className='card-content'>
                    <Form.Group className='mt-3'>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="email" placeholder="Digite o seu nome..." name='name' onChange={handleUserData} />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="password" placeholder="Digite o seu email..." name='email' onChange={handleUserData} />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Senha</Form.Label>
                        <div className='d-flex'>
                            <Form.Control type={verifyInputPasswordType(isRegisterPasswordVisible)} placeholder="Crie uma senha..." name='password' onChange={handleUserData} />
                            <Button variant='' onClick={() => setIsRegisterPasswordVisible(!isRegisterPasswordVisible)}>
                                {renderShowHidePassword(isRegisterPasswordVisible)}
                            </Button>
                        </div>
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Confirmar senha</Form.Label>
                        <div className='d-flex'>
                            <Form.Control type={verifyInputPasswordType(isConfirmRegisterPasswordVisible)} placeholder="Agora confirme sua senha..." value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value) } />
                            <Button variant='' onClick={() => setIsConfirmRegisterPasswordVisible(!isConfirmRegisterPasswordVisible)}>
                                {renderShowHidePassword(isConfirmRegisterPasswordVisible)}
                            </Button>
                        </div>
                    </Form.Group>

                    <Form.Group className="mt-4 d-flex align-items-center justify-content-center flex-column w-100">
                        <Button variant="primary" className="btn-sign-up">Salvar</Button>
                    </Form.Group>
                </div>
            </div>
        </Container>
    );
}

export default LoginSignup;