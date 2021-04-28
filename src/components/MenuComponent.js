import React, {useState} from 'react';
import {
    Card,
    CardImg,
    CardImgOverlay,
    CardTitle
} from 'reactstrap';
import { DishdetailComponent } from './DishdetailComponent';

const MenuComponent = ({
    dishes
}) => {

    let [selectedDish, setSelectedDish] = useState(null);

    const onDishSelect = (dish) => {
        setSelectedDish(dish);
    }

    const constructMenu = () => {
        return Array.isArray(dishes) && dishes.length ? 
            dishes.map(dish => (
                    <div className="col-12 col-md-5 m-1">
                        <Card key={dish.id} onClick={() => 
                            onDishSelect(dish)
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
        <div className = "container" >
            <div className = "row" >
                {constructMenu()}
            </div>
            <div className="row">
                <DishdetailComponent
                    dish={selectedDish}
                />
            </div>
        </div>
    )
}

/* class MenuComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null,
            width: window.innerWidth
        }

        this.onDishSelect = this.onDishSelect.bind(this);
        this.handleWidthChange = this.handleWidthChange.bind(this);
    }

    componentDidMount() {
        console.log('Menu componentDidMount is invoked'); 
        window.addEventListener('resize', this.handleWidthChange);
    }

    componentWillUnmount() {
        console.log('Menu componentDidMount is invoked');
        window.removeEventListener('resize', this.handleWidthChange);
    }

    onDishSelect(dish) {
        this.setState({ 
            selectedDish: dish
        });
    }

    handleWidthChange() {
        this.setState({
            width: window.innerWidth 
        })
    }

    renderDish(dish) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div  className="col-12 col-md-5 m-1">
                <Card key={dish.id}
                  onClick={() => this.onDishSelect(dish)}>
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
                <div className="row">
                    <DishdetailComponent renderSelectedDish={this.renderDish(this.state.selectedDish)}/>
                </div>
                <div className="row">
                    {this.state.width}
                </div>
            </div>
        );
    }
} */
 

export default MenuComponent;