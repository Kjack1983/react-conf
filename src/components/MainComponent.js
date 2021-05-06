
import React, {useState, useEffect} from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './footerComponent';
import Contact from './ContactComponent';
import MenuComponent from './MenuComponent';
import { DishdetailComponent } from './DishdetailComponent';
import AboutComponent from './AboutComponent';
import { DISHES, COMMENTS, LEADERS, PROMOTIONS} from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';


const useData = (data) => {
    const [value, setValue] = useState(data || null);
    return value;
}

const MainComponent = () => {
   
    let dishes = useData(DISHES);
    let comments = useData(COMMENTS);
    let leaders = useData(LEADERS);
    let promotions = useData(PROMOTIONS);

    useEffect(() => {
        console.log('render the useEffect hook');
    }, []);

    const HomePage = () => {
        return (
            <Home 
                dish={dishes.filter(dish => dish.featured)[0]} 
                promotion={promotions.filter(promotion => promotion.featured)[0]}
                leader={leaders.filter(leader => leader.featured)[0]}
            />
        )
    }

    const dishWithId = ({match}) => {
        return  (
        <DishdetailComponent 
            dish={dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]} 
            comments={comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
        />)
    }
    

    return (
        <>
            <Header/>
            <div className="container">
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/aboutus" component={() => <AboutComponent leaders={leaders}/>} />
                    <Route exact path="/menu" component={(dishId) => <MenuComponent 
                        dishes={dishes} />} 
                    />}/>
                    <Route path="/menu/:dishId" component={dishWithId} />
                    <Route path="/contactus" component={Contact} />
                    <Redirect to="/home" />
                </Switch>
            </div>
            <Footer />
        </>
    )
}

export default MainComponent;