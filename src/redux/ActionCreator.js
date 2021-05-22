import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/data';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => {
    return {
        type: ActionTypes.ADD_COMMENT,
        payload: comment
    }
}

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    let newComment = {
        dishId,
        rating,
        author,
        comment
    }

    newComment = {
        ...newComment, 
        date: new Date().toISOString()
    }

    return fetch(`${baseUrl}comments`, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok) return response;
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    },
    // if no response from the server.
    error => {
        throw new Error(error.message);
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => console.log('Post Comments', error.message))
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    
    return fetch(`${baseUrl}dishes`)
        .then(response => {
            if(response.ok) return response;
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        },
        // if no response from the server.
        error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
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

export const commentsFailed = (errorMessage) => ({
    type: ActionTypes.COMMENTS_FAILED,
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
        .then(response => {
            if(response.ok) return response;
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
}

export const addComments = (comments) => ({
    type:ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));
    
    return fetch(`${baseUrl}promotions`)
        .then(response => {
            if(response.ok) return response;
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)))
}