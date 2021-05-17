
import React, {useState, useEffect} from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './footerComponent';
import Contact from './ContactComponent';
import MenuComponent from './MenuComponent';
import { DishdetailComponent } from './DishdetailComponent';
import AboutComponent from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes, dishesLoading } from '../redux/ActionCreator';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackFrom: () => {dispatch(actions.reset('feedback'))}
})

/**
 * Custom hook for previously setting our initial state.
 * @param {object} data 
 */
const useData = (data) => {
    const [value, setValue] = useState(data || null);
    return value;
}

const MainComponent = ({
    dishes,
    comments,
    leaders,
    promotions,
    addComment,
    fetchDishes,
    resetFeedbackFrom
}) => {

    useEffect(() => {
        fetchDishes();
    }, []);

    const HomePage = () => {
        return (
            <Home 
                dish={dishes.dishes.filter(dish => dish.featured)[0]}
                dishesLoading={dishes.isLoading}
                dishErrorMessage= {dishes.errorMessage}
                promotion={promotions.filter(promotion => promotion.featured)[0]}
                leader={leaders.filter(leader => leader.featured)[0]}
            />
        )
    }

    const dishWithId = ({match}) => {
        return  (
        <DishdetailComponent 
            dish={dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
            isLoading={dishes.isLoading}
            errorMessage= {dishes.errorMessage}
            comments={comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
            addComment={addComment}
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
                    <Route path="/contactus" component={() => <Contact resetFeedbackFrom={resetFeedbackFrom} />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
            <Footer />
        </>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));