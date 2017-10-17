/**
 * Created by zw9love on 2017/8/4.
 */
import { routerReducer } from 'react-router-redux'
import { createStore,combineReducers } from 'redux'


function swalReducer(state = null,action){
    const {type,value} = action;
    switch (type){
        case 'setSwal':
            state = value
            return state
        default:
            return state
    }
}

function loadingReducer(state = null,action){
    const {type,value} = action;
    switch (type){
        case 'setLoading':
            state = value
            return state
        case 'setLoadingActive':
            state.setState({loadingActive: value})
            return state
        default:
            return state
    }
}




const reducers = combineReducers({
    swalReducer,
    loadingReducer,
    routing: routerReducer
})

const store = createStore(reducers)

export default store