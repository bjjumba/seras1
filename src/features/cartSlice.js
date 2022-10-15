import {createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
const initialState={
   cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
   cartTotalQuantity: 0,
   cartTotalAmount: 0,
}


const cartSlice=createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart(state,action){
            //applying the logic
            const itemIndex=state.cartItems.findIndex((item)=>item.id===action.payload.id)
            if(itemIndex>=0){
                state.cartItems[itemIndex].cartQuantity+=1
                toast.info(`${state.cartItems[itemIndex].name} increased quanity`,{
                    position:"bottom-left"
                })
            }else{
            const tempProduct={...action.payload,cartQuantity:1}
            state.cartItems.push(tempProduct)
            toast.success(`${tempProduct.name} added to cart`,{
                position:"bottom-left"
            })
            }
            localStorage.setItem("cartItem",JSON.stringify(state.cartItems))
        },
        //implememnting removal of a product from cart,we filter a new array in which the item is not part then update the state to the new arrays
        removeCartItem(state,action){
            const nextCartItems=state.cartItems.filter(
                cartItem=>cartItem.id !== action.payload.id
            )

            state.cartItems=nextCartItems
            localStorage.setItem("cartItem",JSON.stringify(state.cartItems))
            
            toast.error(`${action.payload.name} removed from cart`,{
                position:"bottom-left"
            })
        },
        //decreasing item quantity
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
              (item) => item.id === action.payload.id
            );
      
            if (state.cartItems[itemIndex].cartQuantity > 1) {
              state.cartItems[itemIndex].cartQuantity -= 1;
      
              toast.info("Decreased product quantity", {
                position: "bottom-left",
              });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
              const nextCartItems = state.cartItems.filter(
                (item) => item.id !== action.payload.id
              );
      
              state.cartItems = nextCartItems;
      
              toast.error(`${action.payload.name} decreased`, {
                position: "bottom-left",
              });
            }
      
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
          },
          //clearing the cart
          clearCart(state,action) {
            state.cartItems =[]
            toast.error("Cart Emptied", {
                position: "bottom-left",
              });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
          },
          //making the total quantity of items in a cart item
          getTotal(state,action){
            //using the reduce array method
            let{total,quantity}=state.cartItems.reduce((cartTotal,cartItem)=>{
                const {price,cartQuantity} = cartItem
                //find total price
                const itemTotal = cartQuantity*price

                cartTotal.total += itemTotal
                cartTotal.quantity+=cartQuantity
               
                return cartTotal
            },{
                total:0,
                quantity:0
            })

           state.cartTotalAmount=total
           state.cartTotalQuantity=quantity
          }
    }
})

export const {addToCart,removeCartItem,decreaseCart,clearCart,getTotal}=cartSlice.actions
export default cartSlice.reducer