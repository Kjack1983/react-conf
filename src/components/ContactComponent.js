import React, { useState } from 'react'
import {Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap'
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors } from 'react-redux-form';

/**
 * Custom form hook to handle form values.
 * @param {function} callback,
 * @return {object} 
 */
const useFormValue = callback => {
    const [inputs, setInputs] = useState({
        firstname: '',
        lastname: '',
        telnum: '',
        email: '',
        agree: false,
        contactType: 'Tel.',
        message: ''
    });

    const [errors, setErrors] = useState({
        firstname: false,
        lastname: false,
        telnum: false,
        email: false
    })

    const handleSubmit = (values, callback = false) => {
        // Check if the user input values are created.
        
        console.log('current state >>' + JSON.stringify(values));
        alert('current state is:' + JSON.stringify(values));
        
        if (typeof callback === 'function') {
            callback();
        }
    }

    return {
        handleSubmit,
        errors,
    };
}


export default function ContactComponent (props) {

    /**
     * Alert fields.
     */
    const displayForm = () => {
        /* alert(`User Created!
               Name: ${inputs.firstname} ${inputs.lastname}
               Email: ${inputs.email}`); */
      }

    let { errors, handleSubmit } = useFormValue(displayForm);

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/home">
                            Home
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        Contact Us
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12 border-bottom">
                    <h3>Contact Us</h3>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Send us your feedback</h3>
                </div>
                <div className="col-12 col-md-9">
                    <LocalForm onSubmit={(values) => handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="firstname" md={2}>First Name:</Label>
                            <Col md={9}>
                                <Control.text
                                    model=".firstname"
                                    className="form-control"
                                    name="firstname" 
                                    placeholder="First Name"
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="firstname" md={2}>Last Name:</Label>
                            <Col md={9}>
                                <Control.text 
                                    model=".lastname"
                                    className="form-control"
                                    name="lastname" 
                                    placeholder="Last Name"
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="telnum" md={2}>Tel. Number:</Label>
                            <Col md={9}>
                                <Control.text
                                    model=".telnum"
                                    className="form-control"
                                    name="telnum" 
                                    placeholder="Tel. Number" 
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="email" md={2}>Email:</Label>
                            <Col md={9}>
                                <Control.text
                                    model=".email"
                                    name="email" 
                                    placeholder="Email"
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{ size: 6, offset: 2}}>
                                <div className="form-check">
                                    <Label check>
                                        <Control.checkbox 
                                            model=".agree"
                                            className="form-check-input"
                                            name="agree" 
                                        />
                                        {' '}
                                        <strong>May we contact you?</strong>
                                    </Label>
                                </div>
                            </Col>
                            <Col md={{ size: 2, offset: 1}}>
                                <Control.select 
                                    model=".contactType" 
                                    name="contactType"
                                    className="form-control"
                                >
                                    <option>Tel.</option>
                                    <option>Email</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="message" md={2}>Your feedback:</Label>
                            <Col md={9}>
                                <Control.textarea 
                                    model=".message" 
                                    name="message" 
                                    rows="12" 
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{ size:10, offset: 2 }}>
                                <Button type="submit" color="primary">
                                    Send feedback
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </div>
            </div>
        </div>
    )
}
