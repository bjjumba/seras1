import {configureStore} from '@reduxjs/toolkit'
import productReducer from './features/productSlice'
import {productsApi} from './features/productsApi'
import cartReducer,{getTotal} from './features/cartSlice'

/*Added a comment */
export const store =configureStore({
    reducer:{
       products:productReducer,
       cart:cartReducer,
       [productsApi.reducerPath]:productsApi.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(productsApi.middleware)
})

store.dispatch(getTotal())//dispatch the action when the app loads or reloads anytime


