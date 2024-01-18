import { useEffect, useState } from 'react';
import './style.scss';
import Header from '../../components/Header/header';
import {
    Card,
    Container,
    Row,
    Col,
    Badge,
    Button,
    ListGroup
} from 'react-bootstrap';
import { getUser } from '../../services/user';
import { getSpentByUserId } from '../../services/spent';
import Chart from 'react-google-charts';
import { IoIosInformationCircleOutline } from "react-icons/io";
import {FaTrash} from 'react-icons/fa';
import { MdOutlineEdit } from "react-icons/md";
import { User } from '../../interfaces/user.interface';
import Footer from '../../components/Footer/footer';

const Home = () => {
    const today: Date = new Date();

    const getCurrentMonth = () => {
        switch (today.getMonth()) {
            case 0:
                return 'janeiro';
            case 1:
                return 'fevereiro';
            case 2:
                return 'março';
            case 3:
                return 'abril';
            case 4:
                return 'maio';
            case 5:
                return 'junho';
            case 6:
                return 'julho';
            case 7:
                return 'agosto';
            case 8:
                return 'setembro';
            case 9:
                return 'outubro';
            case 10:
                return 'novembro';
            case 11:
                return 'dezembro';
        }
    }

    let totalSpents: number = 0;
    let totalPendingSpents: number = 0;
    let totalPaidSpents: number = 0;

    const [user, setUser] = useState<User | null>(null);
    const [spents, setSpents] = useState<any>(null);

    const spentsMock: any[] = [
        {
            id: 1,
            name: 'Spotify',
            paymentMonthDay: 5,
            value: 34.90,
            status: 'pendente'
        },
        {
            id: 2,
            name: 'Meli+',
            paymentMonthDay: 10,
            value: 17.99,
            status: 'pendente'
        },
        {
            id: 3,
            name: 'HBO',
            paymentMonthDay: 10,
            value: 35,
            status: 'pago'
        },
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");

        getUser(token).then((response: any) => {
            if (response.success) {
                return setUser(response.user);
            }
        }).then(() => {
            if (user?.id) {
                getSpentByUserId(user?.id).then((response: any) => {
                    if (response.success) {
                        return setSpents(response.spents);
                    }
                });
            }
        });
    }, []);

    const chartData: Array<any> = new Array(["Gasto", "Valor"]);

    spentsMock.forEach((spent: any) => {
        return chartData.push([spent.name, spent.value]);
    });

    spentsMock.forEach((spent: any) => {
        return totalSpents += spent.value;
    });

    spentsMock.forEach((spent: any) => {
        if (spent.status === 'pendente') {
            return totalPendingSpents += spent.value;
        }
    });

    spentsMock.forEach((spent: any) => {
        if (spent.status === 'pago') {
            return totalPaidSpents += spent.value;
        }
    });

    const chartOptions: any = {
        title: `Meus gastos de ${getCurrentMonth()}`,
    };

    const getSpentStatusAmount = (status: string) => {
        if (status === 'pendente') {
            return (
                <Badge bg='danger'>
                    {spentsMock?.filter((spent: any) => {
                        return spent.status && spent.status === status;
                    }).length}
                </Badge>
            );
        }
        if(status === 'pago') {
            return (
                <Badge bg='danger'>
                    {spentsMock?.filter((spent: any) => {
                        return spent.status && spent.status === status;
                    }).length}
                </Badge>
            );
        }
    }

    return (
        <>
            <Header />
            <Container className='container'>
                <Row>
                    <Chart
                        chartType='PieChart'
                        width="100%"
                        height="400px"
                        data={chartData}
                        options={chartOptions}
                    />
                </Row>
                <Row>
                    <Col md={4}>
                        <Card className='p-3 dashboard-card border border-info'>
                            <Card.Title>
                                <p>Total de gastos</p>
                            </Card.Title>
                            <Card.Body>
                                <Card.Text className='fs-3'>R$ {totalSpents.toFixed(2).toString().replace('.', ',')}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='p-3 border border-warning dashboard-card'>
                            <Card.Title className='d-flex align-items-center justify-content-between'>
                                <p>Gastos pendentes</p>
                                {getSpentStatusAmount('pendente')}
                            </Card.Title>
                            <Card.Body>
                                <Card.Text className='fs-3'> R$ {totalPendingSpents.toFixed(2).toString().replace('.', ',')}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='p-3 border border-success dashboard-card'>
                            <Card.Title className='d-flex align-items-center justify-content-between'>
                                <p>Gastos pagos</p>
                                {getSpentStatusAmount('pago')}
                            </Card.Title>
                            <Card.Body>
                                <Card.Text className='fs-3'>R$ {totalPaidSpents.toFixed(2).toString().replace('.', ',')}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className='mt-5'>
                    <div className='d-flex justify-content-between mb-3'>
                        <h2>Todos os meus gastos</h2>
                        <Button variant='success'>Registrar um gasto</Button>
                    </div>
                    <ListGroup className='border-0'>
                        {spentsMock.map((spent: any) => {
                            return (
                                <ListGroup.Item key={spent.id} className='border-0'>
                                    <Card className='p-3'>
                                        <Card.Title>{spent.name} <Badge bg={spent.status === 'pago' ? 'success' : 'warning'}>{spent.status}</Badge></Card.Title>
                                        <Card.Body className='d-flex align-items-center justify-content-between'>
                                            <h3>R$ {spent.value}</h3>
                                            <div>
                                                <Button variant='info' className='me-2'>
                                                    <IoIosInformationCircleOutline/>
                                                </Button>
                                                <Button variant='warning' className='me-2'>
                                                    <MdOutlineEdit/>
                                                </Button>
                                                <Button variant='danger'>
                                                    <FaTrash/>
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Row>
            </Container>
            <Footer />
        </>
    );
}

export default Home;