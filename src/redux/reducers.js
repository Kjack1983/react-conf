import { DISHES, COMMENTS, PROMOTIONS, LEADERS } from '../shared/data';
import * as ActionTypes from './ActionTypes';


export const Dishes = (state = DISHES, action) => {
    
    let { type } = action;

    switch (type) {
        default:
            return state;
    }
}

export const Comments = (state = COMMENTS, action) => {
    
    let { type, payload } = action;

    switch (type) {
        case ActionTypes.ADD_COMMENT:


            console.log(payload);
            // Comment.
            let comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();

            return state.concat(comment);

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