/**
 * The deepest state layer is made over Redux
 * and has the global big State of the App
 */

 import {createStore, applyMiddleware} from 'redux';
 import ReduxThunk from 'redux-thunk';
 import {reducer} from './reducer';
 
 export const appStore = createStore(reducer, applyMiddleware(ReduxThunk));

