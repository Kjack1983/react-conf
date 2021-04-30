import React, {useState} from 'react';
import {
    Card,
    CardImg,
    CardImgOverlay,
    CardTitle
} from 'reactstrap';

const MenuComponent = ({
    dishes,
    onClick
}) => {

    const constructMenu = () => {
        return Array.isArray(dishes) && dishes.length ? 
            dishes.map(dish => (
                    <div key={dish.id} className="col-12 col-md-5 m-1">
                        <Card onClick={() => 
                            onClick(dish.id)
                        }>
                            <CardImg width="100%" object src={dish.image} alt={dish.name} />
                            <CardImgOverlay>
                                <CardTitle>
                                    {dish.name}
                                </CardTitle>
                            </CardImgOverlay>
                        </Card>
                    </div>
                )
            ) : (
                <div></div>
            )
    }
    
    return ( 
        <div className="container">
            <div className="row">
                {constructMenu()}
            </div>
        </div>
    )
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