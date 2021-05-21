import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/data';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (dishId, rating, author, comment) => {
    return {
        type: ActionTypes.ADD_COMMENT,
        payload: {
            dishId,
            rating,
            author,
            comment
        }
    }
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    
    return fetch(`${baseUrl}dishes`)
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => console.log)
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
})

export const dishesFailed = (errorMessage) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errorMessage
}) 

export const promosFailed = (errorMessage) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errorMessage
})

export const addDishes = (dishes) => ({
    type:ActionTypes.ADD_DISHES,
    payload: dishes
})

export const addPromos = (promos) => ({
    type:ActionTypes.ADD_PROMOS,
    payload: promos
})


export const fetchComments = () => (dispatch) => {
    dispatch(dishesLoading(true));
    
    return fetch(`${baseUrl}comments`)
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => console.log)
}

export const addComments = (comments) => ({
    type:ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));
    
    return fetch(`${baseUrl}promotions`)
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => console.log)
}