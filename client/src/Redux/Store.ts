import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './Auth/authSlice'
import {
    
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const reducers = combineReducers({
    auth:authSlice,
    
    
  });
  const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch