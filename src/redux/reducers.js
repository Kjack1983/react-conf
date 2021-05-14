import { DISHES, COMMENTS, PROMOTIONS, LEADERS } from '../shared/data';

export const Dishes = (state = DISHES, action) => {
    
    let { type } = action;

    switch (type) {
        default:
            return state;
    }
}

export const Comments = (state = COMMENTS, action) => {
    
    let { type } = action;

    switch (type) {
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