import { LEADERS } from '../shared/data';
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

export const Comments = (state = {
    isLoading: true,
    errorMessage: null,
    comments: []
}, action) => {
    
    let { type, payload } = action;

    switch (type) {
        case ActionTypes.ADD_COMMENTS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                comments: payload
            }
        case ActionTypes.COMMENTS_FAILED:
            return {
                ...state, 
                isLoading: false,
                errorMessage: payload,
                comments: []
            }
        case ActionTypes.ADD_COMMENT:
            return {
                ...state,
                comments: state.comments.concat(payload)
            };
        default:
            return state;
    }
}

export const feedBack = (state = {}, action) => {
    let { type, payload } = action;

    switch (type) {
        case ActionTypes.ADD_FORM_FEEDBACK:
            return {
                ...state,
                feedback: state.feedback.concat(payload)
            };
        default:
            return state;
    }
}

export const Promotions = (state = {
    isLoading: true,
    errorMessage: null,
    promotions: []
}, action) => {
    
    let { type, payload } = action;

    switch (type) {
        case ActionTypes.ADD_PROMOS:
            return {
                ...state, 
                isLoading: false,
                errorMessage: null,
                promotions: payload
            }
        case ActionTypes.PROMOS_LOADING:
            return {
                ...state, 
                isLoading: true,
                errorMessage: null,
                promotions: []
            }
        case ActionTypes.PROMOS_FAILED:
            return {
                ...state, 
                isLoading: false,
                errorMessage: payload,
                promotions: []
            }
        default:
            return state;
    }
}

export const Leaders = (state = {
    isLoading: true,
    errorMessage: null,
    leaders: []
}, action) => {
    
    let { type, payload } = action;

    switch (type) {
        case ActionTypes.ADD_LEADERS:
            return {
                ...state, 
                isLoading: false,
                errorMessage: null,
                leaders: payload
            }
        case ActionTypes.LEADERS_LOADING:
            return {
                ...state, 
                isLoading: true,
                errorMessage: null,
                leaders: []
            }
        case ActionTypes.PROMOS_FAILED:
            return {
                ...state, 
                isLoading: false,
                errorMessage: payload,
                leaders: []
            }
        default:
            return state;
    }
}