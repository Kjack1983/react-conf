import React, { useState } from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    ListGroupItem,
    ListGroup,
    Breadcrumb,
    BreadcrumbItem,
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody,  
    Label,  
    Col, 
    Row
} from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
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


/**
 * Similarly can be successfully be implemented with functional components.
 */
const RenderDish = ({dish}) => {
    return dish ? (
            <Card key={dish.key}>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
    ) : (
        <div>No dishes selected</div>
    );
}

const RenderComments = ({comments}) => {

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(date)));
    }

    return comments && comments.length ? 
        comments.map(dishComment => (
            <ListGroupItem className="borderless"
                key={dishComment.key}>
                    <p>{dishComment.comment}</p>
                    <p>-- {dishComment.author}, {formatDate(dishComment.date)}</p> 
            </ListGroupItem>
        )
        ) : (
            <div>No Comments</div>
        )
}


export const DishdetailComponent = ({ 
    dish, 
    comments 
}) => {

    return (
        <React.Fragment>
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/menu">
                            menu
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {dish ? dish.name : ''}
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12 border-bottom">
                    {dish ? 
                        <h3>{dish.name}</h3> : 
                        <h3>No Dish Name</h3>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ListGroup as="li" className="list-unstyled">
                        <RenderComments comments={comments} />
                    </ListGroup>
                    <CommentForm />
                </div>
            </div>
        </React.Fragment>
    )
}
