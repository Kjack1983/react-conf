
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
import { postComment, postFeedback, fetchDishes, fetchFeedback, fetchComments, fetchPromos, dishesLoading, fetchLeaders } from '../redux/ActionCreator';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions,
    }
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackFrom: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
    fetchFeedback: () => {dispatch(fetchFeedback())}
})

/**
 * Custom hook for previously setting our initial state.
 * @param {object} data 
 */
const useData = (data) => {
    const [value, setValue] = useState(data || null);
    return value;
}

const MainComponent = (props) => {

    let {
        dishes,
        comments,
        leaders,
        promotions,
        postComment,
        postFeedback,
        fetchDishes,
        fetchComments,
        fetchFeedback,
        fetchPromos,
        fetchLeaders,
        resetFeedbackFrom
    } = props

    useEffect(() => {
        fetchDishes();
        fetchComments();
        fetchPromos();
        fetchLeaders();
        fetchFeedback();
    }, []);

    const HomePage = () => {
        return (
            <Home 
                dish={dishes.dishes.filter(dish => dish.featured)[0]}
                dishesLoading={dishes.isLoading}
                dishErrorMessage= {dishes.errorMessage}
                promotion={promotions.promotions.filter(promotion => promotion.featured)[0]}
                promosLoading={promotions.isLoading}
                promosErrorMessage={promotions.errorMessage}
                leader={leaders.leaders.filter(leader => leader.featured)[0]}
                leadersLoading={leaders.isLoading}
                leadersErrorMessage={leaders.errorMessage}
            />
        )
    }

    const dishWithId = ({match}) => {
        return  (
        <DishdetailComponent 
            dish={dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
            isLoading={dishes.isLoading}
            errorMessage= {dishes.errorMessage}
            comments={comments.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
            commentsErrorMessage={comments.errorMessage}
            postComment={postComment}
        />)
    }

    console.log('leaders :>> ', leaders);

    return (
        <>
            <Header/>
                <TransitionGroup>
                    <CSSTransition key={props.location.key} classNames="page" timeout={300}>
                        <div className="container">
                            <Switch>
                                <Route path="/home" component={HomePage} />
                                <Route path="/aboutus" component={() => <AboutComponent 
                                    leaders={leaders}
                                />} />
                                <Route exact path="/menu" component={(dishId) => <MenuComponent 
                                    dishes={dishes} />} 
                                />}/>
                                <Route path="/menu/:dishId" component={dishWithId} />
                                <Route path="/contactus" component={() => <Contact resetFeedbackFrom={resetFeedbackFrom} postFeedback={postFeedback}/>} />
                                <Redirect to="/home" />
                            </Switch>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            <Footer />
        </>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));