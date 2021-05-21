import React from 'react'
import {
    Card, 
    CardImg, 
    CardText, 
    CardBody, 
    CardTitle, 
    CardSubtitle
} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const RenderCard = ({item, isLoading, errorMessage}) => {
    if(isLoading) {
        return (
            <Loading />
        )
    } else if(errorMessage) {
        return (
            <h4>{errorMessage}</h4>
        )
    } else {
        return (
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>
                        {item.name}
                    </CardTitle>
                    {item.designation ? 
                        <CardSubtitle>
                            {item.designation}
                        </CardSubtitle> : null
                    }
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        )
    }
}

export default function HomeComponent ({
    dish, 
    dishesLoading,
    dishErrorMessage,
    promosLoading,
    promosErrorMessage,
    promotion, 
    leader
}) {
    return (
        <div className="container">
            <div className="row align-item-start">
                <div className="col-12 col-md m-1">
                    <RenderCard 
                        item={dish} 
                        isLoading={dishesLoading} 
                        errorMessage={dishErrorMessage}
                    />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard 
                        item={promotion} 
                        isLoading={promosLoading} 
                        errorMessage={promosErrorMessage}
                    />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={leader} />
                </div>
            </div>
        </div>
    )
}
