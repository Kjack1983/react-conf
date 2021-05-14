import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody,  Label, Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

/**
 * Handle form custom hook.
 * 
 * @param {function} callback 
 */
const useFormHandle = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(setIsModalOpen => !setIsModalOpen);
    }

    const handleComment = (values, callback) => {
        setIsModalOpen(setIsModalOpen => !setIsModalOpen);
        if(typeof callback === 'function') {
            callback();
        }
    }

    const required = (val) => {
        return val && val.length;
    }
    const maxLength = (len) => (val) => {
        return !(val) || (val.length <= len)
    }
    const minLength = (len) => (val) => {
        val = typeof val !== 'undefined' ? val : 0
        return (val) || (val.length >= len)
    }

    return {
        required,
        maxLength,
        minLength,
        isModalOpen,
        toggleModal,
        handleComment
    }
}

/**
 * Taking advantage hooks and functional components.
 */
export default function CommentForm() {

    let { 
        required, 
        maxLength, 
        minLength, 
        isModalOpen, 
        toggleModal, 
        handleComment 
    } = useFormHandle();

    const displayAlert = values => {
        console.log('current state >>' + JSON.stringify(values));
        alert('current state is >>>' + JSON.stringify(values));
    }

    return (
        <div>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => handleComment(values, displayAlert(values))}>
                        <Row>
                            <Col>
                                <Label htmlFor="rating">Rating:</Label>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Control.select 
                                    model=".rating" 
                                    name="rating"
                                    className="form-control"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label htmlFor="name">Name</Label>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Control.text
                                    model=".name"
                                    className="form-control"
                                    name="name" 
                                    placeholder="Name"
                                    validators={{ 
                                        required, 
                                        minLength: minLength(3), 
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors 
                                    className="text-danger" 
                                    model=".name" 
                                    show="touched" 
                                    messages={{
                                        required: 'Required: ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters of less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label htmlFor="message">Comment</Label>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Control.textarea 
                                    model=".message" 
                                    name="message" 
                                    rows="12" 
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            <Button className="mb-3" outline onClick={ toggleModal }>
                <span className="fa fa-pencil fa-lg"></span> Submit Comment
            </Button>
        </div>
    )
}
