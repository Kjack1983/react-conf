
import React, {useState, useEffect} from 'react';
import Header from './HeaderComponent';
import Footer from './footerComponent';
import MenuComponent from './MenuComponent';
import { DishdetailComponent } from './DishdetailComponent';
import { DISHES } from '../shared/dishes';

const useDishes = () => {
    const [value, setValue] = useState(DISHES || null);
    return value;
}

const useSelectedDish = (dishId) => {
    let [value, setValue] = useState(dishId || null);

    const onDishSelect = (dishId) => {
        setValue(dishId);
    }

    return {
        value,
        onClick: onDishSelect
    }
}

const MainComponent = () => {
   
    let dishes = useDishes();
    let selectedDish = useSelectedDish(null);

    useEffect(() => {
        console.log('render the useEffect hook');
    }, [])

    const fetchSelectedDish = () => (
        Array.isArray(dishes) && dishes.length && dishes.filter(dish => dish.id === selectedDish.value)[0]
    )

    return (
        <>
            <Header/>
            <div className="container">
                <MenuComponent 
                    dishes={dishes} 
                    onClick={(dishId) => selectedDish.onClick(dishId)}
                />
                <DishdetailComponent dish={fetchSelectedDish()}/>
                <Footer />
            </div>
        </>
    )
}

/**
 * Keep it as a reference.
 */
/* class MainComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            selectedDish: null
        }

        this.onDishSelect = this.onDishSelect.bind(this);
    }

    componentDidMount() {
        console.log('Menu componentDidMount is invoked'); 
    }

    componentWillUnmount() {
        console.log('Menu componentDidMount is invoked');
    }

    onDishSelect(dish) {
        this.setState({
            selectedDish: dish
        })
    }

    render() {
        return (
            <div className="container">
                <Navbar dark color="primary">
                    <div className="container">
                    <NavbarBrand href="/">
                        Ristorante Con Fusion
                    </NavbarBrand>
                    </div>
                </Navbar>
                <MenuComponent 
                    dishes={this.state.dishes} 
                    onClick={(dishId) => this.onDishSelect(dishId)}
                />
                <div className="row">
                    <DishdetailComponent dish={this.state.dishes.filter(dish => dish.id === this.state.selectedDish )[0]}/>
                </div>
            </div>
        );
    }
} */

export default MainComponent;