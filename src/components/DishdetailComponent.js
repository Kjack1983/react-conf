import React from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Media,
    ListGroupItem,
    ListGroup
} from 'reactstrap';
import moment from 'moment';

export const DishdetailComponent = ({ dish }) => {

    let comments = dish ? dish.comments : [];

    /**
     * Render dish.
     */
    const renderDish = () => {
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

    /**
     * Format date. 
     * @param {string} date 
     */
    const formatDate = (date) => {
        return moment(date).format('LL');
    }

    /**
     * 
     * @param {Array} comments 
     */
    const renderComments = (comments) => {
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

    return (
        <React.Fragment>
            <div className="col-12 col-md-5 m-1">
                {renderDish()}
            </div>
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ListGroup as="li" className="list-unstyled">
                    {renderComments(comments)}
                </ListGroup>
            </div>
        </React.Fragment>
    )
}
