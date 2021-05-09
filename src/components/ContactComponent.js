import React, { useState } from 'react'
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback} from 'reactstrap'
import {Link} from 'react-router-dom';

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

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        // Check if the user input values are created.
        if (typeof callback === 'function') {
            callback();
        }
    }

    /**
     * Handle input change.
     * @param {object} event
     * @return {void}
     */
    const handleInputChange = (event) => {
        event.persist();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name;
        setInputs(inputs => ({...inputs, [name]: value}));
    }

    const handleBlur = field => event => {
        setErrors({...errors, [field]: true})
    }

    const validate = (firstname, lastname, telnum, email) => {
        const validateErrors = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: ''
        }

        if(errors.firstname && firstname.length < 3)
            validateErrors.firstname = "Firstname should be >= 3 characters";
        else if (errors.firstname && firstname.length > 10)
            validateErrors.firstname = "Firstname should be <= 10 characters";

        if(errors.lastname && lastname.length < 3)
            validateErrors.lastname = "Lastname should be >= 3 characters";
        else if (errors.lastname && lastname.length > 10)
            validateErrors.lastname = "Lastname should be <= 10 characters";

        const pattern = /^\d+$/;

        if(errors.telnum && !pattern.test(telnum)) {
            validateErrors.telnum = "Tel. Number should contain only numbers";
            if(telnum.length < 6)
                validateErrors.telnum = "Tel. Number should contain at least 6 numbers";
        }
        
        if(errors.email && email.split('').filter(x => x === "@").length !== 1)
            validateErrors.email = "Please provide a valid email";

        return validateErrors;
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        errors,
        handleBlur,
        validate
    };
}


export default function ContactComponent (props) {

    /**
     * Alert fields.
     */
    const displayForm = () => {
        alert(`User Created!
               Name: ${inputs.firstname} ${inputs.lastname}
               Email: ${inputs.email}`);
      }

    let { inputs, errors, handleInputChange,  handleSubmit, handleBlur, validate } = useFormValue(displayForm);

    // @todo check other ways to provide the input field state with initial value. 
    const validationErrors = validate(inputs.firstname, inputs.lastname, inputs.telnum, inputs.email);

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
                    <Form onSubmit={handleSubmit}>
                        <FormGroup row>
                            <Label htmlFor="firstname" md={2}>First Name:</Label>
                            <Col md={9}>
                                <Input 
                                    type="text" 
                                    id="firstname" 
                                    name="firstname" 
                                    placeholder="First Name"
                                    value={inputs.firstname}
                                    valid={validationErrors.firstname === ''}
                                    invalid={validationErrors.firstname !== ''}
                                    onBlur={handleBlur('firstname')}
                                    onChange={handleInputChange}
                                />
                                <FormFeedback>{validationErrors.firstname}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="firstname" md={2}>Last Name:</Label>
                            <Col md={9}>
                                <Input 
                                    type="text" 
                                    id="lastname" 
                                    name="lastname" 
                                    placeholder="Last Name" 
                                    value={inputs.lastname}
                                    valid={validationErrors.lastname === ''}
                                    invalid={validationErrors.lastname !== ''}
                                    onBlur={handleBlur('lastname')}
                                    onChange={handleInputChange}
                                />
                                <FormFeedback>{validationErrors.lastname}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="telnum" md={2}>Tel. Number:</Label>
                            <Col md={9}>
                                <Input 
                                    type="tel" 
                                    id="telnum" 
                                    name="telnum" 
                                    placeholder="Tel. Number" 
                                    value={inputs.telnum}
                                    valid={validationErrors.telnum === ''}
                                    invalid={validationErrors.telnum !== ''}
                                    onBlur={handleBlur('telnum')}
                                    onChange={handleInputChange}/>
                                <FormFeedback>{validationErrors.telnum}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="email" md={2}>Email:</Label>
                            <Col md={9}>
                                <Input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="Email" 
                                    value={inputs.email}
                                    valid={validationErrors.email === ''}
                                    invalid={validationErrors.email !== ''}
                                    onBlur={handleBlur('email')}
                                    onChange={handleInputChange}
                                />
                                <FormFeedback>{validationErrors.email}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{ size: 6, offset: 2}}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="agree" checked={inputs.agree} onChange={handleInputChange} />
                                        {' '}
                                        <strong>May we contact you?</strong>
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col md={{ size: 2, offset: 1}}>
                                <Input type="select" name="contactType" value={inputs.contactType} onChange={handleInputChange}>
                                    <option>Tel.</option>
                                    <option>Email</option>
                                </Input>

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="feedback" md={2}>Your feedback:</Label>
                            <Col md={9}>
                                <Input type="textarea" id="message" name="message" rows="12" value={inputs.message} onChange={handleInputChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{ size:10, offset: 2 }}>
                                <Button type="submit" color="primary">
                                    Send feedback
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
    )
}
