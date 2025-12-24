import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productsSlice";
import addressesReducer from "../features/addressSlice";
import     ordersReducer from "../features/orderSlice";
import brandReducer from "../features/brandSlice"
import categoriesReducer from '../features/categoriesSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    addresses: addressesReducer,
    orders:ordersReducer,
        brand:brandReducer,
            categories: categoriesReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
