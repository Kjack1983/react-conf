import React from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    ListGroupItem,
    ListGroup
} from 'reactstrap';
import moment from 'moment';

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
        //return moment(date).format('LL');
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


export const DishdetailComponent = ({ dish }) => {

    let comments = dish ? dish.comments : [];

    return (
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ListGroup as="li" className="list-unstyled">
                    <RenderComments comments={comments} />
                </ListGroup>
            </div>
        </div>
    )
}
