import React, {useState} from 'react';
import { 
    Navbar, 
    Nav, 
    NavbarToggler, 
    Collapse, 
    NavItem, 
    NavbarBrand, 
    Jumbotron 
} from  'reactstrap';
import { NavLink } from 'react-router-dom';

export default function HeaderComponent() {

    const [isNavOpen, setIsNavOpen] = useState(false);
    
    const toggleNav = () => {
        let opposite = !isNavOpen; 
        setIsNavOpen(opposite);
    }

    return (
        <>
            <Navbar dark expand="md">
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
                            <NavLink className="nav-link" to="/contact">
                                <span className="fa fa-address-card fa-lg"></span> Contact us
                            </NavLink>
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
        </>
    )
}
