import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import purchaseSlice from '../slices/purchaseSlice';
import globalSlice from '../slices/globalSlice';

const combinedReducer = combineReducers({
  purchaseData: purchaseSlice.reducer,
  globalData: globalSlice.reducer,
});

const rootReducer = (state, action) => combinedReducer(state, action);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
