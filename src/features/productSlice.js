import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
const initialState={
    items:[],
    status:null,
    // error:null
}
//creating async thunk
export const productsFetch=createAsyncThunk(
    "products/productsFetch",
    //async function to carry out data fetching
    async()=>{
    // try{
        const response=await axios.get("https://sera1s.herokuapp.com/products")
        return response?.data//the question mark is to capyure incase of any errors
    //}
    // catch(error){
    //     return rejectWithValue("An error ocurres during consumption")
    // }
      
    }
)


const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{},
    //extraReducers
    extraReducers:{
        [productsFetch.pending]:(state,action)=>{state.status="pending"}, 
        [productsFetch.fulfilled]:(state,action)=>{
            state.status="success"
            state.items=action.payload
        }, 
        [productsFetch.rejected]:(state,action)=>{
            state.status="rejected"
            // state.error=action.payload
        },
    }
})

export const {totalNumber} =productSlice.actions
export default productSlice.reducer