import {configureStore, combineReducers} from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, REGISTER, PURGE, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import products from '../features/products/productSlice';
import storage from 'redux-persist/lib/storage'
import {TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const persistConfig = {
  key: 'kondrat-netrivals',
  version: 1,
  storage,
}

const rootReducer = combineReducers({ products })
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

