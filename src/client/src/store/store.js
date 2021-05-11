import ReduxThunk from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import { authReducer } from '../reducers/authReducer'
import { uiReducer } from '../reducers/uiReducer'
import { citasReducer } from '../reducers/citasReducer'
import { pacientesReducer } from '../reducers/pacientesReducer'
import { horariosReducer } from '../reducers/horariosReducer'
import { usersReducer } from '../reducers/usersReducer'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const combinedReducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    citas: citasReducer,
    pacientes: pacientesReducer,
    horarios: horariosReducer,
    usuarios: usersReducer
})

export const store = createStore(
    combinedReducers,
    composeEnhancers(
        applyMiddleware(ReduxThunk)
    ))