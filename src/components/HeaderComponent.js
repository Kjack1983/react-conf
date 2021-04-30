import React from 'react';
import { Navbar, NavbarBrand, Jumbotron } from  'reactstrap';

export default function HeaderComponent() {
    return (
        <>
            <Navbar dark>
                <div className="container">
                <NavbarBrand href="/">
                    Ristorante Con Fusion
                </NavbarBrand>
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
