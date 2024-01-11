import {useState} from 'react';
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import { BiUserCheck } from "react-icons/bi";
import { PiEye, PiEyeClosedDuotone } from "react-icons/pi";
import { login } from '../../services/user';
import { Link } from 'react-router-dom';
import './style.scss';

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
        <Container fluid className="container login-container">
            <Row className='w-100'>
                <Col lg={8} className='img-field login-img-field'>
                    <Image className='w-75' src='../../public/assets/login.svg'/>
                </Col>
                <Col lg={4} className='form-field login-form-field'>
                    <Form className='form-container'>
                        <h2>Fazer Login <BiUserCheck/></h2>

                        <Form.Group className='mt-4'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='Digite o seu email...' name='email' onChange={handleLoginData} />
                        </Form.Group>

                        <Form.Group className='mt-4'>
                            <Form.Label>Senha</Form.Label>
                            <div className='d-flex'>
                                <Form.Control type={isPasswordVisible ? "text" : "password"} placeholder='Digite a sua senha...' name='password' onChange={handleLoginData} />
                                <Button variant='' onClick={handlePasswordVisibility}>
                                    {isPasswordVisible ? <PiEyeClosedDuotone/> : <PiEye/>}
                                </Button>
                            </div>
                        </Form.Group>

                        <Button variant='success' className='mt-5 w-100' onClick={authenticateUser}>Login</Button>

                        <p className='mt-4'>Ainda não tem uma conta ? <Link to="#">Cadastre-se</Link></p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;