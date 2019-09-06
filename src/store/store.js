import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import loggedUserReducer from './store-reducer';
import storageSession from 'redux-persist/lib/storage/session';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
const reducers = combineReducers({
    loggedUserReducer: loggedUserReducer,
});
const storageConfig = {
    key: 'root', // 必须有的
    storage: storageSession, // 缓存机制
    blacklist: [], // reducer 里不持久化的数据,除此外均为持久化数据
};
const loggerMiddleware = createLogger();
const myPersistReducer = persistReducer(storageConfig, reducers);
const store = createStore(myPersistReducer, applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
));
export const persistor = persistStore(store);
export default store;

