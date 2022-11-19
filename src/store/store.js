import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// import logger from './middleware/logger';
import thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['user'],
  whitelist: ['cart']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const middleWares = [process.env.NODE_ENV === 'development' && 
  logger,
  thunk,
].filter(
  Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore( persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
