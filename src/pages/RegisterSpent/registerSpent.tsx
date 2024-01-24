import { useEffect, useState } from "react";
import { Container, Form, Image, InputGroup, Button } from "react-bootstrap";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import './style.scss';
import { ISpentRegistration } from "../../interfaces/spent.interface";
import { Link, useParams } from "react-router-dom";
import { registerSpent } from "../../services/spent";
import { alertToastError, alertToastSuccess, alertToastWarning } from "../../components/Toast/toast";

const RegisterSpent = () => {
    const {id} = useParams();

    const monthDays= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    const [spentData, setSpentData] = useState<ISpentRegistration>({
        name: '',
        paymentMonthDay: 1,
        value: 0,
        status: 'pendente',
        idUser: typeof(id) === 'string' ? parseInt(id) : id
    });

    const handleSpentData = (e: any) => {
        setSpentData({
            ...spentData,
            [e.target.name]:  e.target.value.replace(',', '.')
        });
    }

    useEffect(() => {
        console.log(spentData);
    },[spentData]);

    async function saveSpent() {
        if(spentData.name && spentData.paymentMonthDay && spentData.value && spentData.status && spentData.idUser) {
            if(spentData.paymentMonthDay < 0 || spentData.paymentMonthDay > 31) {
                return alertToastError('Dia de pagamento inválido ! Por Favor,  tente novamente...');
            }
            if(spentData.value <= 0) {
                return alertToastError('Valor do gasto inválido ! Por favor, tente novamente...');
            }

            return await registerSpent(spentData).then((response: any) => {
                if(response?.success) {
                    return alertToastSuccess(response?.message);
                }
                return alertToastError(response?.message);
            }).then(() => {
                setSpentData({
                    name: '',
                    paymentMonthDay: 1,
                    value: 0,
                    status: 'pendente',
                    idUser: typeof(id) === 'string' ? parseInt(id) : id
                });
            });
        }
        return alertToastWarning('Por favor, preencha todos os campos...');
    }

    return(
        <>
            <Header />
            <Container className='container register-spent-container'>
                <div className="form-field register-spent-form-field">
                    <Form className="form-container">
                        <Image className="w-75 img-spent-registration" src='/assets/registration.svg' />
                        
                        <h2 className="mt-3">Registrar um Gasto</h2>
                        
                        <Form.Group className="mt-5">
                            <Form.Label>Nome do gasto</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome do seu gasto..." name="name" onChange={handleSpentData}/>
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Dia de pagamento</Form.Label>
                            <Form.Select name="paymentMonthDay" onChange={handleSpentData}>
                                {monthDays.map((day: number) => {
                                    return <option key={day} value={day}>{day}</option>;
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Valor do gasto</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>R$</InputGroup.Text>
                                <Form.Control type="number" name="value" placeholder="Digite o valor do gasto..." onChange={handleSpentData}/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Status do gasto</Form.Label>
                            <Form.Select name="status" onChange={handleSpentData}>
                                {['pendente', 'pago'].map((status: string) => {
                                    return <option key={status} value={status}>{status}</option>
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Button variant='success' className="mt-3 w-100" onClick={() => saveSpent()}>Salvar</Button>

                        <div className="mt-4 text-center">
                            <Link to='/home'>Voltar ao dashboard</Link>
                        </div>
                    </Form>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default RegisterSpent;