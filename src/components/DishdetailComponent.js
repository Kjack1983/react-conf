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
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

/**
 * Handle form custom hook.
 * 
 * @param {function} callback 
 */
const useFormHandle = (dishId, postComment) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ratingValue] = useState(1);

    const toggleModal = () => {
        setIsModalOpen(setIsModalOpen => !setIsModalOpen);
    }

    // @todo check why is not working.
    const handleComment = (values) => {
        let rating = typeof values.rating !== 'undefined' ? values.rating : ratingValue
        setIsModalOpen(setIsModalOpen => !setIsModalOpen);
        postComment(dishId, rating, values.author, values.comment)
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
export default function CommentForm({
    dishId,
    postComment
}) {

    let { 
        required, 
        maxLength, 
        minLength, 
        isModalOpen, 
        toggleModal, 
        handleComment 
    } = useFormHandle(dishId, postComment);

    return (
        <div>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => handleComment(values)}>
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
                                    placeholder="Rating"
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
                                <Label htmlFor="author">Name</Label>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Control.text
                                    model=".author"
                                    className="form-control"
                                    name="author" 
                                    placeholder="Author"
                                    validators={{ 
                                        required, 
                                        minLength: minLength(3), 
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors 
                                    className="text-danger" 
                                    model=".author" 
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
                                    model=".comment" 
                                    name="comment" 
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
        <FadeTransform in 
            transFromProps={{ 
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}
        >
            <Card key={dish.key}>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    ) : (
        <div>No dishes selected</div>
    );
}

const RenderComments = ({comments, postComment, dishId}) => {

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(date)));
    }

    return comments !== null  ? ( 
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ListGroup as="li" className="list-unstyled">
                <Stagger in>
                    {comments.map(dishComment => {
                        let {id, comment, author, date} = dishComment;
                        return (
                            <div>
                                <Fade in>
                                    <ListGroupItem className="borderless"
                                        key={id}>
                                        <p>{comment}</p>
                                        <p>-- {author}, {formatDate(date)}</p>
                                    </ListGroupItem>
                                </Fade>
                            </div>
                        );
                    })}
                </Stagger>
            </ListGroup>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
        ) : (
            <div>No Comments</div>
        )
}


export const DishdetailComponent = ({ 
    dish, 
    comments,
    postComment,
    isLoading,
    errorMessage
}) => {

    if (isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    } else if(errorMessage) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{errorMessage}</h4>
                </div>
            </div>
        )
    }
    else if (dish !== null) {
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
                        <RenderComments 
                            comments={comments} 
                            postComment={postComment}
                            dishId={dish.id}    
                        />
                </div>
            </React.Fragment>
        )
    }
}
