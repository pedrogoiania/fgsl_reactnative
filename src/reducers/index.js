import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import InicioReducer from './InicioReducer';
import EventosReducer from './EventosReducer';

export default combineReducers({
    LoginReducer,
    InicioReducer,
    EventosReducer,
});