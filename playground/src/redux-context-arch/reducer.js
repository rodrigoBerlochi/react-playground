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
        case 'SET_SURNAME':
            return {...state, ...{surname: action.value}}
        case 'SET_COMPANY':
            return {...state, ...{company: action.value}}
        default:
            return state;
    }
};

const defaultJobHistory = {
    previousJobs: []
}

const jobHistoryReducer = (state = defaultJobHistory, action) => {
    switch (action.type) {
        case 'ADD_JOB':
            return {...state, previousJobs: Array.prototype.concat(state.previousJobs, action.value)};
        default:
            return state;
    }
};

// combine reducers receives an OBJECT  whose props are the reducers (using ES6 shorthand notation here)
export const reducer = combineReducers({ profileReducer, jobHistoryReducer });