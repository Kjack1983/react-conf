
import React, {useState, useEffect} from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './footerComponent';
import Contact from './ContactComponent';
import MenuComponent from './MenuComponent';
import { DishdetailComponent } from './DishdetailComponent';
import { DISHES, COMMENTS, LEADERS, PROMOTIONS} from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';

const useData = (data) => {
    const [value, setValue] = useState(data || null);
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
   
    let dishes = useData(DISHES);
    let comments = useData(COMMENTS);
    let leaders = useData(LEADERS);
    let promotions = useData(PROMOTIONS);
    let selectedDish = useSelectedDish(null);

    useEffect(() => {
        console.log('render the useEffect hook');
    }, [])

    const fetchSelectedDish = () => (
        Array.isArray(dishes) && dishes.length && dishes.filter(dish => dish.id === selectedDish.value)[0]
    )

    const HomePage = () => {
        return (
            <Home 
                dish={dishes.filter(dish => dish.featured)[0]} 
                promotion={promotions.filter(promotion => promotion.featured)[0]}
                leader={leaders.filter(leader => leader.featured)[0]}
            />
        )
    }

    return (
        <>
            <Header/>
            <div className="container">
                {/* <MenuComponent 
                    dishes={dishes} 
                    onClick={(dishId) => selectedDish.onClick(dishId)}
                />
                <DishdetailComponent dish={fetchSelectedDish()}/> */}
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={(dishId) => <MenuComponent 
                        dishes={dishes} />} 
                    />}/>
                    <Route path="/contactus" component={Contact} />
                    <Redirect to="/home" />
                </Switch>
            </div>
            <Footer />
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