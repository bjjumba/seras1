import {configureStore} from '@reduxjs/toolkit'
import productReducer,{productsFetch} from './features/productSlice'
import {productsApi} from './features/productsApi'

export const store =configureStore({
    reducer:{
       products:productReducer,
       [productsApi.reducerPath]:productsApi.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(productsApi.middleware)
})



