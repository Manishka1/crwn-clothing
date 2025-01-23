import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

const store = configureStore({
  reducer: rootReducer, // Provide the root reducer here
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['user/setCurrentUser'], // Ignore these action types
        }
    }).concat(logger), // Add middleware here
});

export default store;
