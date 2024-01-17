import { useState } from 'react';
import { Container, Form, Button, Image } from "react-bootstrap";
import { BiUserCheck } from "react-icons/bi";
import { PiEye, PiEyeClosedDuotone } from "react-icons/pi";
import { login } from '../../services/user';
import { Link } from 'react-router-dom';
import './style.scss';
import Footer from '../../components/Footer/footer';
import { alertToastError, alertToastWarning } from '../../components/Toast/toast.';
import {ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
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

    async function authenticateUser() {
        if (loginData.email && loginData.password) {
            return await login(loginData).then((response: any) => {
                if (response.success) {
                    localStorage.setItem("token", response.token);
                    return navigate('/home');
                }
                return alertToastError("E-mail ou senha incorretos");
            });
        }
        return alertToastWarning('Por favor, preencha todos os campos');
    }

    return (
        <>
            <Container fluid className="container login-container">
                <div className='img-field img-login-field'>
                    <Image className='w-75 img-login' src='/assets/login.svg' />
                </div>
                <div className='form-field login-form-field'>
                    <Form className='form-container'>
                        <h2>Fazer Login <BiUserCheck /></h2>

                        <Form.Group className='mt-4'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='Digite o seu email...' name='email' onChange={handleLoginData} />
                        </Form.Group>

                        <Form.Group className='mt-4'>
                            <Form.Label>Senha</Form.Label>
                            <div className='d-flex'>
                                <Form.Control type={isPasswordVisible ? "text" : "password"} placeholder='Digite a sua senha...' name='password' onChange={handleLoginData} />
                                <Button variant='' onClick={handlePasswordVisibility}>
                                    {isPasswordVisible ? <PiEyeClosedDuotone /> : <PiEye />}
                                </Button>
                            </div>
                        </Form.Group>

                        <Button variant='success' className='mt-5 w-100' onClick={authenticateUser}>Login</Button>

                        <p className='mt-4'>Ainda não tem uma conta ? <Link to="/signup">Cadastre-se</Link></p>
                    </Form>
                </div>
            </Container>
            <ToastContainer />
            <Footer/>
        </>
    );
}

export default Login;