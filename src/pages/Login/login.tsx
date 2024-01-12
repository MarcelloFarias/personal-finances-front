import { useState } from 'react';
import { Container, Form, Button, Image } from "react-bootstrap";
import { BiUserCheck } from "react-icons/bi";
import { PiEye, PiEyeClosedDuotone } from "react-icons/pi";
import { login } from '../../services/user';
import { Link } from 'react-router-dom';
import './style.scss';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

const Login = () => {
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
                    return alert('hello');
                }
                return alert(response.message);
            });
        }
        return alert('Please fill all fields !');
    }

    return (
        <>
            <Header/>
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
            <Footer/>
        </>
    );
}

export default Login;