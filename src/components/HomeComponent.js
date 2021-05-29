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
import { FadeTransform } from 'react-animation-components';

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
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'translateY(-100px)'
                }}
                fadeProps={{
                    enterOpacity: 1,
                }}
            >
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
            </FadeTransform>
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
    leader,
    leadersLoading,
    leadersErrorMessage
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
                    <RenderCard 
                        item={leader} 
                        isLoading={leadersLoading}
                        errorMessage={leadersErrorMessage}
                    />
                </div>
            </div>
        </div>
    )
}
