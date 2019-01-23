import {combineReducers} from 'redux';

const defaultStateProfile = {
    name: null,
    surname: null,
    company: null
};

const profileReducer = (state = defaultStateProfile, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {...state, ...{name: action.value}}
        default:
            return state;
    }
};

const jobHistoryReducer = (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

// combine reducers receives an OBJECT  whose props are the reducers (using ES6 shorthand notation here)
export const reducer = combineReducers({ profileReducer, jobHistoryReducer });