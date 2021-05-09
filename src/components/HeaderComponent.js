import React, {useState} from 'react';
import { 
    Navbar, 
    Nav, 
    NavbarToggler, 
    Collapse, 
    NavItem, 
    NavbarBrand, 
    Jumbotron,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input
} from  'reactstrap';
import { NavLink } from 'react-router-dom';

export default function HeaderComponent() {

    let username;
    let password;
    let checkbox;

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const toggleNav = () => {
        let opposite = !isNavOpen; 
        setIsNavOpen(opposite);
    }

    const toggleModal = () => {
        setIsModalOpen(isModalOpen => (setIsModalOpen(!isModalOpen)))
    }

    const handleLogin = (event) => {
        toggleModal();
        console.log('%c%s', 'color: #00b300', 'handle login');
        alert("username" + username.value +" " + password.value + " " + checkbox.value);
        event.preventDefault();
    }

    return (
        <>
            <Navbar dark expand="md" fixed="top">
                <div className="container">
                <NavbarToggler onClick={toggleNav}></NavbarToggler>
                <NavbarBrand className="mr-auto" href="/">
                    <img 
                        src="assets/images/logo.png" 
                        height="30" 
                        width="41" 
                        alt="Ristorante Con Fusion"
                    />
                </NavbarBrand>
                <Collapse isOpen={isNavOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to="/home">
                                <span className="fa fa-home fa-lg"></span> Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/aboutus">
                                <span className="fa fa-info fa-lg"></span> About us
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/menu">
                                <span className="fa fa-list fa-lg"></span> Menu
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/contactus">
                                <span className="fa fa-address-card fa-lg"></span> Contact us
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button outline onClick={toggleModal}>
                                <span className="fa fa-sign-in fa-lg"></span> login
                            </Button>
                        </NavItem>
                    </Nav>
                </Collapse>
                </div>
            </Navbar>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Ristorante Con Fusion</h1>
                            <p>
                                we take inspiration from the worlds best cuisines, and create a unique fusion experience. 
                                Our lipmacking creations will tickle  your culinary senses
                            </p>

                        </div>
                    </div>
                </div>
            </Jumbotron>

            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username" innerRef={input => (username = input)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" innerRef={input => (password = input)}/>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="remember" innerRef={input => (checkbox = input)}/>
                                Remember me
                            </Label>
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}
