import { DISHES, COMMENTS, LEADERS, PROMOTIONS} from '../shared/dishes';

export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    leaders: LEADERS,
    promotions: PROMOTIONS

}

export const Reducer = (state = initialState, action) => {

    //const {type, payload } = action;

    return state;

    /* switch (type) {
        case value:
            
            break;
    
        default:
            break;
    } */
}