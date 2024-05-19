import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './Reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;



// import reducer from './Reducer';
// import thunkMiddleware from 'redux-thunk' //para asincronía en redux
// import { createStore, applyMiddleware, compose } from 'redux';

// const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //para la dev Tool 

// const store = createStore(
// 	reducer,
// 	composeEnhacer(applyMiddleware(thunkMiddleware))
// );

// export default store

