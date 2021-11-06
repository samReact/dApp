import { createStore, applyMiddleware } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import appReducer from './reducer'

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, appReducer)

let store = createStore(appReducer, composeWithDevTools(applyMiddleware(thunk)))
// let persistor = persistStore(store)

export { store }
