import React from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    ListGroupItem,
    ListGroup,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import moment from 'moment';
import {Link} from 'react-router-dom';

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

    console.log('comments inside RenderComments :>> ', comments);

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


export const DishdetailComponent = ({ 
    dish, 
    comments 
}) => {

    console.log('comments :>> ', comments);

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
                </div>
            </div>
        </React.Fragment>
    )
}
