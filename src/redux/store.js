import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import userReducer from './userDuck';
import charsReducer, {getCharactersAction} from './charDuck';
import thunk from 'redux-thunk';


let rootReducer = combineReducers({
    user: userReducer,
    characters: charsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    let store = createStore(rootReducer, 
        composeEnhancers( applyMiddleware(thunk)) );
    //get Characters first
    getCharactersAction()(store.dispatch, store.getSate);
    return store;
}