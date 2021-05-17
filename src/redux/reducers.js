import { DISHES, COMMENTS, PROMOTIONS, LEADERS } from '../shared/data';
import * as ActionTypes from './ActionTypes';


export const Dishes = (state = {
    isLoading: true,
    errorMessage: null,
    dishes: []
}, action) => {
    
    let { type, payload } = action;

    switch (type) {
        case ActionTypes.ADD_DISHES:
            return {
                ...state, 
                isLoading: false,
                errorMessage: null,
                dishes: payload
            }
        case ActionTypes.DISHES_LOADING:
            return {
                ...state, 
                isLoading: true,
                errorMessage: null,
                dishes: []
            }
        case ActionTypes.DISHES_FAILED:
            return {
                ...state, 
                isLoading: false,
                errorMessage: payload,
                dishes: []
            }
        default:
            return state;
    }
}

export const Comments = (state = COMMENTS, action) => {
    
    let { type, payload } = action;

    switch (type) {
        case ActionTypes.ADD_COMMENT:
            let { dishId, rating, author, comment } = payload;

            let formComment = {
                id: state.length,
                dishId,
                rating: parseInt(rating),
                comment,
                author,
                date: new Date().toISOString()
            }

            return [
                ...state,
                formComment
            ]
        default:
            return state;
    }
}

export const Promotions = (state = PROMOTIONS, action) => {
    
    let { type } = action;

    switch (type) {
        default:
            return state;
    }
}

export const Leaders = (state = LEADERS, action) => {
    
    let { type } = action;

    switch (type) {
        default:
            return state;
    }
}