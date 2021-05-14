import { createStore, combineReducers } from 'redux';
import { Dishes, Comments, Promotions, Leaders } from '../redux/reducers';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        })
    );

    return store;
}