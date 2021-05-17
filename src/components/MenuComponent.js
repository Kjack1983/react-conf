import React, { useState } from 'react';
import {
    Card,
    CardImg,
    CardImgOverlay,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

const RenderItem = ({dish}) => {
    return (
        <Card>
            <Link to={`/menu/${dish.id}`}>
                <CardImg width="100%" object src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>
                        {dish.name}
                    </CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    )
}

const MenuComponent = ({
    dishes,
    onClick
}) => {
    const constructMenu = () => {
        return Array.isArray(dishes.dishes) && dishes.dishes.length ? 
            dishes.dishes.map(dish => (
                    <div key={dish.id} className="col-12 col-md-5 m-1">
                        <RenderItem dish={dish} onClick={onClick} />
                    </div>
                )
            ) : (
                <div></div>
            )
    }

    if (dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    } else if(dishes.errorMessage) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{dishes.errorMessage}</h4>
                </div>
            </div>
        )
    }
    else {
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
                            Menu
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12 border-bottom">
                        <h3>Menu</h3>
                    </div>
                </div>
                <div className="row">
                    {constructMenu()}
                </div>
            </div>
        )
    }
}

export default MenuComponent;

/* class MenuComponent extends React.Component {
    componentDidMount() {
        console.log('Menu componentDidMount is invoked'); 
    }

    componentWillUnmount() {
        console.log('Menu componentDidMount is invoked');
    }

    render() {

        console.log('Menu component render is invoked');

        const menu = this.props.dishes.map(dish => {
            return (
              <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card onClick={() => this.props.onClick(dish.id)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
}
*/