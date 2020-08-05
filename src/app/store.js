import { configureStore } from '@reduxjs/toolkit';
import facilitiesReducer from "../features/Sign_in/Sign_in_slice"
import productsReducer from "../features/ClientOffice/ProductsSlice.js"

export default configureStore({
  reducer: {
    facilities: facilitiesReducer,
    products: productsReducer,
  },
});
