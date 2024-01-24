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
import { FaTrash } from 'react-icons/fa';
import { MdOutlineEdit } from "react-icons/md";
import { User } from '../../interfaces/user.interface';
import Footer from '../../components/Footer/footer';
import { Link } from 'react-router-dom';
import { Spent } from '../../interfaces/spent.interface';
import DeleteSpentModal from '../../components/DeleteSpentModal/deleteSpentModal';

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
            default:
                return '';
        }
    }

    const [user, setUser] = useState<User | null>(null);
    const [spents, setSpents] = useState<Spent[]>([]);
    const [totalSpents, setTotalSpents] = useState<number>(0);
    const [totalPendingSpents, setTotalPendingSpents] = useState<number>(0);
    const [totalPaidSpents, setTotalPaidSpents] = useState<number>(0);

    useEffect(() => {
        const token = localStorage.getItem("token");

        getUser(token).then((response: any) => {
            if (response?.success) {
                getSpentByUserId(response?.user.id).then((response: any) => {
                    if (response.success) {
                        return setSpents(response?.spents);
                    }
                });
                return setUser(response?.user);
            }
        });
    }, []);

    const chartData: Array<any> = new Array(["Gasto", "Valor"]);

    spents.forEach((spent: any) => {
        return chartData.push([spent.name, spent.value]);
    });

    useEffect(() => {
        spents.forEach((spent: any) => {
            return setTotalSpents((prevValue) => prevValue += spent.value);
        });
    
        spents.forEach((spent: any) => {
            if (spent.status === 'pendente') {
                return setTotalPendingSpents((prevValue) => prevValue += spent.value);
            }
        });
    
        spents.forEach((spent: any) => {
            if (spent.status === 'pago') {
                return setTotalPaidSpents((prevValue) => prevValue += spent.value);
            }
        });
    }, [spents.length]);

    const chartOptions: any = {
        title: `Meus gastos de ${getCurrentMonth()}`,
    };

    const getSpentStatusAmount = (status: string) => {
        if (status === 'pendente') {
            return (
                <Badge bg='danger'>
                    {spents?.filter((spent: any) => {
                        return spent.status && spent.status === status;
                    }).length}
                </Badge>
            );
        }
        else if (status === 'pago') {
            return (
                <Badge bg='primary'>
                    {spents?.filter((spent: any) => {
                        return spent.status && spent.status === status;
                    }).length}
                </Badge>
            );
        }
        else {
            return;
        }
    }

    const [isDeleteSpentModalVisible, setIsDeleteSpentModalVisible] = useState<boolean>(false);

    const handleDeleteSpentModalVisibility = () => setIsDeleteSpentModalVisible(!isDeleteSpentModalVisible);

    const [spentIdToDelete, setSpentIdToDelete] = useState<number>(0);

    const handleSpentIdToDelete = (spentId: number) => {
        setSpentIdToDelete(spentId);
        handleDeleteSpentModalVisibility();
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
                        <Card className='p-3 dashboard-card'>
                            <Card.Title>
                                <p>Total de gastos</p>
                            </Card.Title>
                            <Card.Body>
                                <Card.Text className='fs-3'>R$ {totalSpents.toFixed(2).toString().replace('.', ',')}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='p-3 dashboard-card'>
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
                        <Card className='p-3 dashboard-card'>
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
                    <div className='spent-list-title d-flex justify-content-between mb-3'>
                        <h2>Todos os meus gastos</h2>
                        <Link to={`/spent/register/${user?.id}`}>
                            <Button variant='success'>Registrar um gasto</Button>
                        </Link>
                    </div>
                    {spents?.length > 0 ? (
                        <ListGroup className='border-0'>
                            {spents?.map((spent: any) => {
                                return (
                                    <ListGroup.Item key={spent.id} className='border-0'>
                                        <Card className='p-3'>
                                            <Card.Title className='d-flex align-items-center justify-content-between'>
                                                <div className='d-flex align-items-center'>
                                                    {spent.name}
                                                    <Badge bg={spent.status === 'pago' ? 'success' : 'warning'} className='ms-2'>{spent.status}</Badge>
                                                </div>
                                                <Button variant='' className='text-info fs-4'>
                                                    <IoIosInformationCircleOutline />
                                                </Button>
                                            </Card.Title>
                                            <Card.Body className='d-flex align-items-center justify-content-between'>
                                                <h3>R$ {spent.value.toString().replace('.', ',')}</h3>
                                                <div>
                                                    <Button variant='outline-warning' className='me-2'>
                                                        <MdOutlineEdit />
                                                    </Button>
                                                    <Button variant='danger' onClick={() => handleSpentIdToDelete(spent?.id)}>
                                                        <FaTrash />
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    ) : (
                        <p className='text-center mt-4'>Você ainda não possui gastos registrados</p>
                    )}
                </Row>
            </Container>
            <Footer />

            <DeleteSpentModal 
                isVisible={isDeleteSpentModalVisible} 
                toggleVisibility={handleDeleteSpentModalVisibility} 
                spentId={spentIdToDelete}
            />
        </>
    );
}

export default Home;