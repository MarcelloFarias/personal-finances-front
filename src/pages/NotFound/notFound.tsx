import { Button, Container, Image } from "react-bootstrap";
import Footer from "../../components/Footer/footer";
import { Link } from "react-router-dom";
import './style.scss';

const NotFound = () => {
    return (
        <>
            <Container className="container not-found-container">
                <Image style={{maxWidth: '90%'}} src="assets/page_not_found.svg"/>
                <h1 className="text-center">Ops, você precisa fazer login para continuar !</h1>
                <div className="flex-row d-flex justify-content-center w-100">
                    <Link to='/'>
                        <Button variant="outline-success">Faça Login</Button>
                    </Link>
                    <p className="mx-3 mt-2">ou</p>
                    <Link to='/signup'>
                        <Button variant="outline-primary">Registre-se</Button>
                    </Link>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default NotFound;