import { useEffect, useState, useContext } from 'react';
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
import Footer from '../../components/Footer/footer';
import { Spent, SpentAmounts } from '../../interfaces/spent.interface';
import DeleteSpentModal from '../../components/DeleteSpentModal/deleteSpentModal';
import RegisterSpentModal from '../../components/RegisterSpentModal/registerSpentModal';
import UpdateSpentModal from '../../components/UpdateSpentModal/updateSpentModal';
import SpentDetailsModal from '../../components/SpentDetailsModal/spentDetailsModal';
import LogoutModal from '../../components/LogoutModal/logoutModal';
import PersonalDataModal from '../../components/PersonalDataModal/personalDataModal';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../contexts/themeContext';

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

    const [spents, setSpents] = useState<Spent[]>([]);
    const [dataAboutSpents, setDataAboutSpents] = useState<SpentAmounts>({
        totalPaid: '',
        totalPending: '',
        totalSpents: '',
        spentsAmount: 0,
        paidAmount: 0,
        pendingAmount: 0
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            getUser(token).then((response: any) => {
                if (response?.success) {
                    getSpentByUserId(response?.user.id).then((response: any) => {
                        if (response.success) {
                            setSpents(response?.spents);
                            setDataAboutSpents(response?.data);
                        }
                    });
                }
                else {
                    navigate('/notfound');
                }
            });
        }
        else {
            navigate('/notfound');
        }
    }, []);

    const chartData: Array<any> = new Array(["Gasto", "Valor"]);

    spents.forEach((spent: any) => {
        return chartData.push([spent.name, spent.value]);
    });

    const chartOptions: any = {
        title: `Gastos para ${getCurrentMonth()}`,
    };

    const [isDeleteSpentModalVisible, setIsDeleteSpentModalVisible] = useState<boolean>(false);

    const handleDeleteSpentModalVisibility = () => setIsDeleteSpentModalVisible(!isDeleteSpentModalVisible);

    const [spentIdToDelete, setSpentIdToDelete] = useState<number>(0);

    const handleSpentIdToDelete = (spentId: number) => {
        setSpentIdToDelete(spentId);
        handleDeleteSpentModalVisibility();
    }

    const [isRegisterSpentModalVisible, setIsRegisterSpentModalVisible] = useState<boolean>(false);

    const handleRegisterSpentModalVisibility = () => setIsRegisterSpentModalVisible(!isRegisterSpentModalVisible);

    const [isUpdateSpentModalVisible, setIsUpdateSpentModalVisible] = useState<boolean>(false);

    const handleUpdateSpentModalVisibility = () => setIsUpdateSpentModalVisible(!isUpdateSpentModalVisible);

    const [spentIdToUpdate, setSpentIdToUpdate] = useState<number>(0);

    const handleSpentIdToUpdate = (spentId: number) => {
        setSpentIdToUpdate(spentId);
        handleUpdateSpentModalVisibility();
    }

    const [isSpentDetailsModalVisible, setIsSpentDetailsModalVisible] = useState<boolean>(false);

    const handleSpentDetailsModalVisibility = () => setIsSpentDetailsModalVisible(!isSpentDetailsModalVisible);

    const [spentIdToDetails, setSpentIdToDetails] = useState<number>(0);

    const handleSpentIdToDetails = (spentId: number) => {
        setSpentIdToDetails(spentId);
        handleSpentDetailsModalVisibility();
    }

    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState<boolean>(false);

    const handleLogoutModalVisibility = () => setIsLogoutModalVisible(!isLogoutModalVisible);

    const [isPersonalDataModalVisible, setIsPersonalDataModalVisible] = useState<boolean>(false);

    const handlePersonalDataModalVisibility = () => setIsPersonalDataModalVisible(!isPersonalDataModalVisible);

    const [theme] = useContext(ThemeContext);

    return (
        <>
            <Header
                toggleLogoutModalVisibility={handleLogoutModalVisibility}
                togglePersonalDataModalVisibility={handlePersonalDataModalVisibility}
            />

            <Container className='container mb-5'>
                {spents?.length > 0 ? (
                    <Row className='mb-5'>
                        <Chart
                            chartType='PieChart'
                            width="100%"
                            height="400px"
                            data={chartData}
                            options={chartOptions}
                        />
                    </Row>
                ) : (
                    <div className='chart-row-info'>
                        <h2 className={`${theme === 'dark' && 'text-light'}`}>Cadastre seus gastos</h2>
                    </div>
                )}

                {spents?.length > 0 ? (
                    <Row>
                        <Col md={4}>
                            <Card className={`p-3 home-card ${theme === 'dark' && 'bg-dark text-light border border-light'}`}>
                                <div className='home-card-badge'>
                                    <Badge bg='info' className='fs-4'>
                                        {dataAboutSpents.spentsAmount}
                                    </Badge>
                                </div>
                                <Card.Title>Gastos Mensais</Card.Title>
                                <Card.Body>
                                    <h3>R$ {dataAboutSpents.totalSpents}</h3>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card className={`p-3 home-card ${theme === 'dark' && 'bg-dark text-light border border-light'}`}>
                                <div className='home-card-badge'>
                                    <Badge bg='warning' className='fs-4'>
                                        {dataAboutSpents.pendingAmount}
                                    </Badge>
                                </div>
                                <Card.Title>Pendentes</Card.Title>
                                <Card.Body>
                                    <h3>R$ {dataAboutSpents.totalPending}</h3>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card className={`p-3 home-card ${theme === 'dark' && 'bg-dark text-light border border-light'}`}>
                                <div className='home-card-badge'>
                                    <Badge bg='success' className='fs-4'>
                                        {dataAboutSpents.paidAmount}
                                    </Badge>
                                </div>
                                <Card.Title>Pagos</Card.Title>
                                <Card.Body>
                                    <h3>R$ {dataAboutSpents.totalPaid}</h3>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ) : null}

                <Row className='mt-5'>
                    <div className='spent-list-title d-flex justify-content-between mb-3'>
                        <h2 className={`${theme === 'dark' && 'text-light'}`}>Meus gastos</h2>
                        <Button variant='success' onClick={handleRegisterSpentModalVisibility}>Novo gasto</Button>
                    </div>
                    {spents?.length > 0 ? (
                        <ListGroup className={`border-0 ${theme === 'dark' && 'bg-dark'}`}>
                            {spents?.map((spent: any) => {
                                return (
                                    <ListGroup.Item key={spent.id} className={`border-0 ${theme === 'dark' && 'bg-dark'}`}>
                                        <Card className={`p-3 ${theme === 'dark' && 'bg-dark text-light border border-light'}`}>
                                            <Card.Title className='d-flex align-items-center justify-content-between'>
                                                <div className='d-flex align-items-center'>
                                                    {spent.name}
                                                    <Badge bg={spent.status === 'pago' ? 'success' : 'warning'} className='ms-2'>{spent.status}</Badge>
                                                </div>
                                                <Button variant='' className='text-info fs-4' onClick={() => handleSpentIdToDetails(spent?.id)}>
                                                    <IoIosInformationCircleOutline />
                                                </Button>
                                            </Card.Title>
                                            <Card.Body className='d-flex align-items-center justify-content-between'>
                                                <h3>R$ {spent.value.toString().replace('.', ',')}</h3>
                                                <div>
                                                    <Button variant='outline-warning' className='me-2' onClick={() => handleSpentIdToUpdate(spent?.id)}>
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
                        <p className={`text-center mt-5 ${theme === 'dark' && 'text-light'}`}>Você ainda não possui gastos registrados</p>
                    )}
                </Row>
            </Container>
            <Footer />

            <DeleteSpentModal
                isVisible={isDeleteSpentModalVisible}
                toggleVisibility={handleDeleteSpentModalVisibility}
                spentId={spentIdToDelete}
                setSpents={setSpents}
                setDataAboutSpents={setDataAboutSpents}
            />

            <RegisterSpentModal
                isVisible={isRegisterSpentModalVisible}
                toggleVisibility={handleRegisterSpentModalVisibility}
                setSpents={setSpents}
                setDataAboutSpents={setDataAboutSpents}
            />

            <UpdateSpentModal
                isVisible={isUpdateSpentModalVisible}
                toggleVisibility={handleUpdateSpentModalVisibility}
                spentId={spentIdToUpdate}
                setSpents={setSpents}
                setDataAboutSpents={setDataAboutSpents}
            />

            <SpentDetailsModal
                isVisible={isSpentDetailsModalVisible}
                toggleVisibility={handleSpentDetailsModalVisibility}
                spentId={spentIdToDetails}
            />

            <LogoutModal
                isVisible={isLogoutModalVisible}
                toggleVisibility={handleLogoutModalVisibility}
            />

            <PersonalDataModal
                isVisible={isPersonalDataModalVisible}
                toggleVisibility={handlePersonalDataModalVisibility}
            />
        </>
    );
}

export default Home;